// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var SingleGameData = require('single-game-data');
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
        
        // 剩余答题时间
        remainTime: 10,

        // 用户选择的答案
        userOptions: [],
        // 用户每个答案多少分
        userOptionScores: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Get questions
        var singleGameDataNode = cc.find('SingleGameData');
        var singleGameData = singleGameDataNode.getComponent(SingleGameData);
        this.questions = singleGameData.questions;
        // 设置问题
        this.newQuestion();
    },

    // CUSTOM METHODS
    onBackButtonClicked () {
        cc.director.loadScene('menu');
    },

    // 设置问题
    newQuestion () {
        cc.log('newQuestion被调用');
        if (this.currentQuestionIndex == this.questions.length) {
            // 答题结束
            // 保存分数供他人挑战
            var self = this;
            this.saveResult().then(function() {
                // 展示结果
                var result = '得分';
                self.resultPanel.show(result, self.myScore);
                self.userOptions = [];
                self.userOptionScores = [];
            }).catch(function(e){
                cc.error(e);
            });
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
            optionClickHandler.component = 'single-game-play';
            optionClickHandler.handler = 'onOptionButtonClicked';
            optionClickHandler.customEventData = i;
            var optionButton = optionNode.getComponent(cc.Button);
            optionButton.clickEvents.push(optionClickHandler);
        }
        
        // 为下一题做准备
        this.currentQuestionIndex ++;

        // 开始倒计时
        this.setupTimer();
    },

    onOptionButtonClicked (event, customEventData) {
        this.userOptions.push(customEventData);
        var answerIndex = this.currentQuestion.get('answerIndex');
        var optionButtons = this.optionsPanel.getComponentsInChildren(cc.Button);

        for (var i = 0; i < optionButtons.length; i++) {
            var optionButton = optionButtons[i];
            if (i === answerIndex) {
                // 答案选项设置为「绿色」
                optionButton.disabledColor = new cc.Color(0, 255, 0);
            } else {
                if (i === customEventData) {
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
        if (answerIndex === customEventData) {
            this.calculateScore();
        } else {
            this.userOptionScores.push(0);
        }

        // 下一题
        var self = this;
        this.scheduleOnce(function() {
            self.remainTime = Constants.QUESTION_TIMER;
            self.newQuestion();
        }, 1);
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
                // 分数为 0
                this.userOptionScores.push(0);
                this.userOptions.push(-1);
                // 下一题
                this.remainTime = Constants.QUESTION_TIMER;
                // 如果不是最后一题的倒计时则进入下一题
                if (this.currentQuestionIndex < this.questions.length) {
                    this.newQuestion();
                }
            } else {
                this.remainTime--;
                this.timeLabel.string = this.remainTime + 's';
            }
        };
        this.schedule(this.timerCallback, 1);
    },

    calculateScore () {
        var score = this.remainTime / Constants.QUESTION_TIMER * Constants.QUESTION_SCORE;
        this.userOptionScores.push(score);
        this.myScore += score;
        // this.myScore += 30;
        this.myScoreLabel.string = this.myScore;
    },

    saveResult () {
        // 存储挑战题库
        var ChallengeQuestion = AV.Object.extend('ChallengeQuestion');
        var challengeQuestion = new ChallengeQuestion();
        challengeQuestion.set('questions', this.questions);
        return challengeQuestion.save().then((challengeQuestion) => {
            // 存储当前用户得分
            var ChallengeScore = AV.Object.extend('ChallengeScore');
            var challengeScore = new ChallengeScore(); 
            // 存储题目
            challengeScore.set('challenge', challengeQuestion);
            // 是谁答题
            var currentUser = AV.User.current();
            challengeScore.set('user', currentUser);
            // 选了哪些答案
            challengeScore.set('userOptions', this.userOptions);
            // 每个答案多少分
            challengeScore.set('userOptionScores', this.userOptionScores);
            // 保存
            return challengeScore.save();
        });
    },
    
});
