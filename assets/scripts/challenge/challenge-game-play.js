// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var ChallengeGameData = require('challenge-game-data');
var AV = require('leancloud-storage');
var Constants = require('constants');
var ResultPanel = require('result-panel');

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

        questions: null,
        currentQuestion: null,
        currentQuestionIndex: 0,
        myScore: 0,
        rivalScore: 0,

        // 剩余答题时间
        remainTime: 10,

        // 用户选择的答案
        myOptions: [],
        rivalOptions: [],

        // 用户每个答案多少分
        myOptionScores: [],
        rivalOptionScores: [],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // Get questions
        var challengeGameDataNode = cc.find('ChallengeGameData');
        var challengeGameData = challengeGameDataNode.getComponent(ChallengeGameData);
        this.questions = challengeGameData.questions;
        this.rivalOptions = challengeGameData.rivalOptions;
        this.rivalOptionScores = challengeGameData.rivalOptionScores;
        // 设置问题
        this.newQuestion();
    },

    start () {

    },

    // CUSTOM METHODS
    onBackButtonClicked () {
        cc.director.loadScene('menu');
    },

    // 设置问题
    newQuestion () {
        if (this.currentQuestionIndex == this.questions.length) {
            // 答题结束
            // 停止计时器
            if (this.timerCallback) {
                this.unschedule(this.timerCallback);
            }
            // 展示结果
            if (this.myScore > this.rivalScore) {
                var result = '你赢啦，今晚加个鸡腿';
            } else {
                var result = '你输啦，今晚吃素';
            }
            this.resultPanel.show(result, this.myScore);
            return;
        }
        
        this.questionIndexLabel.string = this.currentQuestionIndex;

        // 设置问题
        var question = this.questions[this.currentQuestionIndex];
        this.currentQuestion = question;
        // 设置 title
        var questionTitle = question.get('title');
        this.titleLabel.string = questionTitle;

        // 设置选项
        var options = question.get('options');
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
            optionClickHandler.component = 'challenge-game-play';
            optionClickHandler.handler = 'onOptionButtonClicked';
            optionClickHandler.customEventData = i;
            var optionButton = optionNode.getComponent(cc.Button);
            optionButton.clickEvents.push(optionClickHandler);
        }

        // 开始倒计时
        this.setupTimer();
    },

    onOptionButtonClicked (event, customEventData) {
        // 设置按钮颜色
        var optionIndex = customEventData;
        var answerIndex = this.currentQuestion.get('answerIndex');
        var optionButtons = this.optionsPanel.getComponentsInChildren(cc.Button);
        for (var i = 0; i < optionButtons.length; i++) {
            var optionButton = optionButtons[i];
            if (i === answerIndex) {
                // 答案选项设置为「绿色」
                optionButton.disabledColor = new cc.Color(0, 255, 0);
            } else {
                if (i === optionIndex) {
                    // 用户选错选项设置为「红色」
                    optionButton.disabledColor = new cc.Color(255, 0, 0);
                } else {
                    optionButton.disabledColor = new cc.Color(225, 225, 225);
                }
            }
            // 所有选项按钮设置为「不可用」状态
            optionButton.interactable = false;
        }
        // 计算分数
        this.calculateScore(answerIndex, optionIndex);
        
        // 下一题
        var self = this;
        this.currentQuestionIndex ++;
        this.scheduleOnce(function() {
            self.remainTime = Constants.QUESTION_TIMER;
            self.newQuestion();
        }, 1);
    },

    calculateScore (answerIndex, optionIndex) {
        // 我的分数
        if (answerIndex === optionIndex) {
            // this.myScore += 30;
            var score = this.remainTime /  Constants.QUESTION_TIMER * Constants.QUESTION_SCORE;
            this.myScore += score;
            this.myScoreLabel.string = this.myScore;
        }
        // 对方的分数
        var rivalScore = this.rivalOptionScores[this.currentQuestionIndex];
        this.rivalScore += rivalScore;
        this.rivalScoreLabel.string = this.rivalScore;
    },

    setupTimer () {
        this.timeLabel.string = this.remainTime + 's';

        if (this.timerCallback) {
            this.unschedule(this.timerCallback);
        }
        this.timerCallback = function () {
            if (this.remainTime <= 0) {
                // 停止计时
                this.unschedule(this.timerCallback);
                // 下一题
                this.currentQuestionIndex ++;
                this.remainTime = Constants.QUESTION_TIMER;
                this.newQuestion();
            } else {
                this.remainTime--;
                this.timeLabel.string = this.remainTime + 's';
            }
        };
        this.schedule(this.timerCallback, 1);
    },
    
});
