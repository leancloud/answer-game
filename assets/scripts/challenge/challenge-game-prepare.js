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

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        myNameLabel: {
            default: null,
            type: cc.Label,
        },

        rivalNameLabel: {
            default: null,
            type: cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var challengeGameDataNode = cc.find('ChallengeGameData');
        var challengeGameData = challengeGameDataNode.getComponent(ChallengeGameData);
        var self = this;
        challengeGameData.getChallenge().then((challenge) => {
            var myUsername = AV.User.current().getUsername();
            self.myNameLabel.string = myUsername;
            self.rivalNameLabel.string = challenge.get('user').getUsername();
            this.scheduleOnce(function() {
                cc.director.loadScene('challenge-game-play');    
            }, 2);
        }).catch((error) => {
            cc.error(error);
        })
    },

    start () {

    },

    // update (dt) {},
});
