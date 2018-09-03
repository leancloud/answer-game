// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import {play} from '../play';

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            type: cc.Label,
            default: null,
        },
    },

    show(result, score) {
        this.scoreLabel.string = result + "\n" + score + " 分";
        this.node.active = true;
    },

    onBackButtonClicked() {
        if (play.room !== null){
            play.leaveRoom();
        }
        cc.director.loadScene("menu");
    },
});
