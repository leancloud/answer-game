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
        console.log('对战匹配 onload 被调用');
        play.joinRandomRoom();
        play.on(Event.ROOM_JOINED, () => {
            console.log('随机加入房间成功被触发');
            const props = {
                // 状态修改为准备
                ready: true,
                // 准备房间展示用的名字
                nickname: AV.User.current().getUsername(),
            };
            play.player.setCustomProperties(props);
            // 显示自己的名字
            this.myNameLabel.string = AV.User.current().getUsername();
        });

        play.on(Event.ROOM_JOIN_FAILED, () => {
            console.log('随机加入房间失败被触发');
            // 创建一个房间等待其他人加入
            const options = {
                playerTtl: 30,
                maxPlayerCount: this.maxPlayerCount,
            };
            play.createRoom({roomOptions: options});
        });

        // 创建房间成功
        play.on(Event.ROOM_CREATED, () => {
            console.log('创建房间成功被触发');

        });

        // 新玩家加入事件
        play.on(Event.PLAYER_ROOM_JOINED, (data) => {
            const { newPlayer } = data;
        });

        // 玩家自定义属性变化事件
        play.on(Event.PLAYER_CUSTOM_PROPERTIES_CHANGED, (data) => {
            // MasterClient 进行以下操作
            if (play.player.isMaster()) {
                const players = play.room.playerList;
                // 计算状态为准备的总人数
                const readycount = players.reduce((total, player) => {
                    if ( player.getCustomProperties().ready) {
                        return total + 1;
                    };
                    return total + 0;
                }, 0)
                console.log('ready count is' + readycount);
                if (readycount == this.maxPlayerCount) {
                    getGameData().then((questions) => {
                        // 设置房间关闭
                        play.setRoomOpened(false);
                        // 设置房间不可见
                        play.setRoomVisible(false);
                        // 设置房间的游戏数据
                        const question = {"qid":3,"answerIndex":2,"title":"世界上被称为“教育王国”的国家是哪个？","options":["中国","美国","以色列","日本"]};
                        const roomProps = {
                            questions: question
                        };
                        play.room.setCustomProperties(roomProps);
                    }).catch((error) => console.error(error));
                }
            }
            
        });
        
        // 房间属性变化事件
        play.on(Event.ROOM_CUSTOM_PROPERTIES_CHANGED, (data) => {
            const props = play.room.getCustomProperties();
            const { questions } = props;
            if (questions != null) {
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
                cc.log('都准备好了，大家开始游戏吧');
                if (play.player.isMaster()) {
                    play.sendEvent('startGame', {}, {receiverGroup: ReceiverGroup.All});
                }
            }

        });

        // 注册自定义事件
        play.on(Event.CUSTOM_EVENT, event => {
            cc.log('自定义事件被触发');
            const { eventId, eventData } = event;
            if (eventId === 'startGame') {
                setTimeout(() => {
                    cc.director.loadScene('multiplayer-game-play');
                }, 1000);   
            }
        });
    

        play.on(Event.DISCONNECTED, () => {
            // 重连并回到房间
            play.reconnectAndRejoin();
        });

        const getGameData = () => {
            return AV.Cloud.rpc('getSingleGameData');
        };
    },

    start () {

    },

    // update (dt) {},
});
