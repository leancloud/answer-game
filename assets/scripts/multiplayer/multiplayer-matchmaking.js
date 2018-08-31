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
var playEvent = require('play-event');
var Constants = require('constants');

import {
    play,
    ReceiverGroup,
    Region,
    Event,
} from '../play';

cc.Class({
    extends: cc.Component,

    properties: {
        myNameLabel: {
            default: null,
            type: cc.Label,
        },

        vsLabel: {
            default: null,
            type: cc.Label,
        },

        rivalNameLabel: {
            default: null,
            type: cc.Label,
        },

        maxPlayerCount: 2,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // 显示自己的名字
        this.myNameLabel.string = AV.User.current().getUsername();

        play.joinRandomRoom();

        this.node.on(Event.ROOM_JOINED, (event) => {
            const props = {
                // 状态修改为准备
                ready: true,
                score: 0,
                currentOption: -1,
                nickname: AV.User.current().getUsername(),
            };
            play.player.setCustomProperties(props);
        }, this);

        this.node.on(Event.ROOM_JOIN_FAILED, () => {
            // 创建一个房间等待其他人加入
            const options = {
                playerTtl: 30,
                maxPlayerCount: this.maxPlayerCount,
            };
            play.createRoom({roomOptions: options});
        });

        this.node.on('playerReady', (event) => {
            if (play.player.isMaster() && event.detail.changedProps.ready !== null) {
                const readyCount = this.countReady();
                if (readyCount == this.maxPlayerCount) {
                    this.getQuestions();
                }
            };
        });
        
        this.node.on('questionsReady', (data) => {
            const props = play.room.getCustomProperties();
            if (props.questions != null) {
                this.showVSUI();
                if (play.player.isMaster()) {
                    play.sendEvent('startGame', {}, {receiverGroup: ReceiverGroup.All});
                }
            }

        });

        this.node.on('startGame', event => {
            setTimeout(() => {
                cc.director.loadScene('multiplayer-game-play');
            }, 1000);   
        });
    },

    start () {

    },

    getQuestions () {
        AV.Cloud.rpc('getSingleGameData').then((questions) => {
            // 设置房间关闭
            play.setRoomOpened(false);
            // 设置房间不可见
            play.setRoomVisible(false);
            // 设置房间的游戏数据
            // const question = [{"qid":3,"answerIndex":2,"title":"世界上被称为“教育王国”的国家是哪个？","options":["中国","美国","以色列","日本"]}];
            const roomProps = {
                questions: questions,
                roundTime: Constants.QUESTION_TIMER,
                currentQuestionIndex: 0,
            };
            play.room.setCustomProperties(roomProps);
        }).catch((error) => console.error(error));
    },

    countReady () {
        const players = play.room.playerList;
        // 计算状态为准备的总人数
        return players.reduce((total, player) => {
            if ( player.getCustomProperties().ready) {
                return total + 1;
            };
            return total + 0;
        }, 0)
    },

    showVSUI () {
        const roomPlayers = {};
        play.room.playerList.map((player) => {
            if (player != play.player) {
                roomPlayers.rivalName = player.getCustomProperties().nickname;
                return;
            }
            return;
        });
        this.vsLabel.string = 'VS';
        this.rivalNameLabel.string = roomPlayers.rivalName;
    },

});
