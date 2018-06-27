// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
    },

    // CUSTOM METHODS
    onBackButtonClicked () {
        cc.director.loadScene('menu');
    },
    
});
