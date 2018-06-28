// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var AV = require('leancloud-storage');

cc.Class({
    extends: cc.Component,

    properties: {
        questions: null,
        rivalOptions: null,
        rivalOptionScores: null,
        rivalUsername: null,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.log('challenge-game-data 被调用');
        cc.game.addPersistRootNode(this.node);
    },

    // CUSTOM METHODS
    getChallenge () {
        var self = this;
        return AV.Cloud.rpc('getChallengeGameData')
        .then(function(challenges) {
            // [AVObject, ...]
            var challenge = challenges[0];
            self.questions = challenge.get('questions');
            self.rivalOptions = challenge.get('userOptions');
            self.rivalOptionScores = challenge.get('userOptionScores');
            self.rivalUsername = challenge.get('user').get('username');
            return challenge;
        })
    }
});
