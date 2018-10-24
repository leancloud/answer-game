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

var Constants = require('constants');


cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        
        // Master Client 关心的事件
        play.on(Event.ROOM_JOIN_FAILED, () => {
            cc.find('MatchmakingCanvas').emit('createRoom', {});
        });

        play.on(Event.ROOM_JOINED, () => {
            cc.find('MatchmakingCanvas').emit('setupSelfData');
            if (play.player.isMaster()){
                cc.find('MatchmakingCanvas').emit('initPlayerScore', {player: play.player});
            }
        });

        play.on(Event.PLAYER_ROOM_JOINED, (data) => {
            const { newPlayer } = data;
            if (play.player.isMaster() && play.room.playerList.length === Constants.MAX_PLAYER_COUNT){
                cc.find('MatchmakingCanvas').emit('roomFull', {player: newPlayer});
            }
        });

        play.on(Event.ROOM_CUSTOM_PROPERTIES_CHANGED, (data) => {
            // 题目已备好，开始游戏吧
            if ('questions' in data.changedProps) {
                cc.find('MatchmakingCanvas').emit('questionsReady', data);
                return;
            }
            
            // 设置应当第 X 题了，显示下一轮
            if ('currentQuestionIndex' in data.changedProps) {
                play.sendEvent('nextRound', {}, {receiverGroup: ReceiverGroup.All});
                return;
            }
            
            if (play.player.isMaster() && 'playerData' in data.changedProps){
                
                cc.find('MultiplayerGamePlayCanvas').emit('ifRoundOver', data);
            };

        });


        // 注册自定义事件
        play.on(Event.CUSTOM_EVENT, event => {
            const eventId = event.eventId;

            if (eventId === 'startGame') {
                cc.find('MatchmakingCanvas').emit('startGame', event);
                return;
            }

            if (eventId === 'nextRound') {
                cc.find('MultiplayerGamePlayCanvas').emit('nextRound', event);
                return;
            }

            if (eventId === 'answerOptionClicked') {
                cc.find('MultiplayerGamePlayCanvas').emit('answerOptionClicked', event);
                return;
            }

            if (eventId === 'actorOptionResult') {
                cc.find('MultiplayerGamePlayCanvas').emit('actorOptionResult', event);
                return;
            }

            if (eventId === 'optionResult') {
                cc.find('MultiplayerGamePlayCanvas').emit('optionResult', event);
                return;
            }

            if (eventId === 'showRoundOverUI') {
                cc.find('MultiplayerGamePlayCanvas').emit('showRoundOverUI', event);
                return;
            }

            if (eventId === 'gameOver') {
                cc.find('MultiplayerGamePlayCanvas').emit('gameOver', event);
                return;           
            }
        });
    

        play.on(Event.DISCONNECTED, () => {
            // 重连并回到房间
            play.reconnectAndRejoin();
        });

    },

    start () {

    },

});
