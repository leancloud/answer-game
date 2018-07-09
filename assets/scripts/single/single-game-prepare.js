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

cc.Class({
    extends: cc.Component,

    properties: {
        backButton: {
            default: null,
            type: cc.Button
        },
        infoLabel: {
            default: null,
            type: cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        var singleGameDataNode = cc.find('SingleGameData');
        var singleGameData = singleGameDataNode.getComponent(SingleGameData);
        singleGameData.getQuestions()
        .then(function() {
            cc.director.loadScene('single-game-play');
        }).catch(function (err) {
            console.log(err.error);
            if (err.code == 403) {
                self.infoLabel.string = '今天答题次数用完啦，明天再来吧~';
            } else {
                cc.error(err);
            }
        });
    },

    start () {

    },

    // CUSTOM METHODS
    onBackButtonClicked () {
        cc.director.loadScene('menu');
    },
});
