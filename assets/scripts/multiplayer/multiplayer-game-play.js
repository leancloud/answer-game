// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html



import {
    play,
    ReceiverGroup,
    Region,
    Event,
} from '../play';

var ResultPanel = require('result-panel');
var Constants = require('constants');

cc.Class({
    extends: cc.Component,

    properties: {
        backButton: {
            default: null,
            type: cc.Button,
        },
        questionIndexLabel: {
            default: null,
            type: cc.Label,
        },
        titleLabel: {
            default: null,
            type: cc.Label,
        },
        myScoreLabel: {
            default: null,
            type: cc.Label,
        },
        rivalScoreLabel: {
            default: null,
            type: cc.Label,
        },
        optionsPanel: {
            default: null,
            type: cc.Node,
        },
        optionPrefab: {
            default: null,
            type: cc.Prefab,
        },
        timeLabel: {
            default: null,
            type: cc.Label,
        },
        resultPanel: {
            type: ResultPanel,
            default: null,
        },

        selfPlayer: null,
        rivalPlayer: null,

        questions: null,
        currentQuestion: null,

        // 剩余答题时间
        remainTime: 10,
    },

    onLoad () {
        // 初始化数据
        this.questions = play.room.getCustomProperties().questions;

        // 明确自己及对手
        this.selfPlayer = play.player;
        this.rivalPlayer = play.room.playerList.find((player, index, array) => {
            return !player.isLocal();
        });

        // 设置问题
        this.newQuestion();

        // 双方开始倒计时
        this.setupTimer();        

        // MasterClient 中的事件触发
        this.node.on('answerOptionClicked', event => {
            if (play.player.isMaster()) {
                const optionIndex = event.detail.eventData.userOptionIndex;
                
                // 计算分数
                const score = this.calculateScore(this.currentQuestion.answerIndex, optionIndex);
                const actorPlayer = play.room.getPlayer(event.detail.senderId);
                const newScore = actorPlayer.getCustomProperties().score + score;
                
                const actorSelfOptionResult = {
                    score: newScore,
                    correctIndex: this.currentQuestion.answerIndex,
                    currentOption: optionIndex,
                }
                
                // 告诉事件发起者答案
                play.sendEvent('actorSelfOptionResult', actorSelfOptionResult, {targetActorIds: [event.detail.senderId]});
                
                // 存储事件发起者的答案
                const currentOption = optionIndex;
                actorPlayer.setCustomProperties({score: newScore, currentOption});
                
                // 告诉所有人事件发起者的分数
                const optionResult = {
                    score: newScore,
                    actorPlayerId: event.detail.senderId,
                }

                play.sendEvent('optionResult', optionResult, {receiverGroup: ReceiverGroup.All});
            }
        });

        this.node.on('ifRoundOver', event => {
            const answerPlayerCount = play.room.playerList.reduce((total, player) => {
                if (player.getCustomProperties().currentOption !== -1) {
                    return total + 1;
                };
                return total + 0;
            }, 0);
            if (answerPlayerCount === play.room.playerList.length) {
                const roundOverData = {};
                roundOverData.correctIndex = this.currentQuestion.answerIndex;
                play.sendEvent('showRoundOverUI', roundOverData, {receiverGroup: ReceiverGroup.All});
            }
        });

        // 普通玩家事件触发
        this.node.on('actorSelfOptionResult', event => {
            const data = event.detail.eventData;
            this.myScoreLabel.string = data.score;
            this.showButtonUI(data.currentOption, data.correctIndex);
        });
        
        this.node.on('optionResult', event => {
            const data = event.detail.eventData;
            const actorPlayerId = data.actorPlayerId
            if (actorPlayerId === this.rivalPlayer.actorId ) {
                this.rivalScoreLabel.string = data.score;
            }
        });

        this.node.on('showRoundOverUI', event => {
            this.stopTimer();
            const correctIndex = event.detail.eventData.correctIndex;
            const rivalOption = this.rivalPlayer.getCustomProperties().currentOption;
            this.showButtonUI(rivalOption, correctIndex);

            if (play.player.isMaster()) {
                this.roundOver();
            }
        });

        this.node.on('nextRound', event => {
            this.nextQuestion();
            this.unschedule(this.timerCallback);
            this.setupTimer();
        });

        this.node.on('gameOver', event => {
            this.gameOver();
        });
        
    },

    start () {

    },

    onBackButtonClicked () {
        cc.director.loadScene('menu');
    },

    // MasterClient 方法
    timeOver() {
        const correctIndex = this.currentQuestion.answerIndex;
        play.sendEvent('showRoundOverUI', {correctIndex}, {receiverGroup: ReceiverGroup.All});
    },

    roundOver() {
        setTimeout(() => {
            // 重置选项
            const currentOption = -1;
            this.selfPlayer.setCustomProperties({currentOption});
            this.rivalPlayer.setCustomProperties({currentOption});
            // 进入下一局
            if (play.room.getCustomProperties().currentQuestionIndex + 1 < this.questions.length) {
                let currentQuestionIndex = play.room.getCustomProperties().currentQuestionIndex;
                currentQuestionIndex ++;
                play.room.setCustomProperties({currentQuestionIndex});
            } else {
                play.sendEvent('gameOver', {}, {receiverGroup: ReceiverGroup.All});
            }
        }, 1000);  
    },

    calculateScore (answerIndex, optionIndex) {
        if (answerIndex === optionIndex) {
            return this.remainTime /  Constants.QUESTION_TIMER * Constants.QUESTION_SCORE;
        }
        return 0;
    },

    // 普通玩家方法
    newQuestion () {
        const currentQuestionIndex = play.room.getCustomProperties().currentQuestionIndex;
        this.questionIndexLabel.string = currentQuestionIndex;

        // 设置问题
        var question = this.questions[currentQuestionIndex];
        this.currentQuestion = question;
        // 设置 title
        var questionTitle = question.title;
        this.titleLabel.string = questionTitle;

        // 设置选项
        var options = question.options;
        this.optionsPanel.removeAllChildren();
        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var optionNode = cc.instantiate(this.optionPrefab);
            var optionNodeLabel = optionNode.getComponentInChildren(cc.Label);
            optionNodeLabel.string = option;
            optionNode.parent = this.optionsPanel;
            // 注册点击事件
            var optionClickHandler = new cc.Component.EventHandler();
            optionClickHandler.target = this.node;
            optionClickHandler.component = 'multiplayer-game-play';
            optionClickHandler.handler = 'onOptionButtonClicked';
            optionClickHandler.customEventData = i;
            var optionButton = optionNode.getComponent(cc.Button);
            optionButton.clickEvents.push(optionClickHandler);
        }
    },

    setupTimer () {
        this.remainTime = play.room.getCustomProperties().roundTime;
        this.timeLabel.string = this.remainTime + 's';
        this.timerCallback = function () {
            if (this.remainTime <= 0) {
                this.remainTime = 0;
                if (play.player.isMaster()) {
                    // 没答完题，强制游戏结束
                    this.timeOver();
                }
            } else {
                this.remainTime--;
                this.timeLabel.string = this.remainTime + 's';
            }
        };
        this.schedule(this.timerCallback, 1);
    },

    onOptionButtonClicked (event, customEventData) {
        // 发送时间给 master, master 根据自己的 remainTime 计算分数。
        play.sendEvent('answerOptionClicked', {userOptionIndex: customEventData}, {receiverGroup: ReceiverGroup.MasterClient});
    },

    nextQuestion() {
        let currentQuestionIndex = play.room.getCustomProperties().currentQuestionIndex;
        currentQuestionIndex ++;
        this.newQuestion();
    },

    showButtonUI (userOptionIndex, correctIndex) {
        var optionButtons = this.optionsPanel.getComponentsInChildren(cc.Button);
        for (var i = 0; i < optionButtons.length; i++) {
            var optionButton = optionButtons[i];
            if (i === correctIndex) {
                // 答案选项设置为「绿色」
                optionButton.disabledColor = new cc.Color(0, 255, 0);
            } else if (i === userOptionIndex) {
                // 用户选错选项设置为「红色」
                optionButton.disabledColor = new cc.Color(255, 0, 0);
            }
            // 所有选项按钮设置为「不可用」状态
            optionButton.interactable = false;
        }
    },
    
    stopTimer () {
        // 停止计时器
        if (this.timerCallback) {
            this.unschedule(this.timerCallback);
        }
    },

    gameOver () {
        const selfScore = this.selfPlayer.getCustomProperties().score;
        const rivalScore = this.rivalPlayer.getCustomProperties().score;

        if (selfScore > rivalScore) {
            var result = '你赢啦，今晚加个鸡腿';
        } else {
            var result = '你输啦，今晚吃素';
        }
        
        this.resultPanel.show(result, selfScore);
    },

});
