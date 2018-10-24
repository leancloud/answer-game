// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        singleButton: {
            default: null,
            type: cc.Button
        },
        chanllengeButton: {
            default: null,
            type: cc.Button
        },
    },

    start () {
    },

    // Custom Methods
    onSingleButtonClicked () {
        cc.director.loadScene('single-game-prepare');
    },

    onChanllengeButtonClicked () {
        cc.director.loadScene('challenge-game-prepare');
    },

    onMultiplayerButtonClicked () {
        cc.director.loadScene('multiplayer-matchmaking');
    },

    onLeaderboardButtonClicked () {
        cc.director.loadScene('leaderboard');
    },
});
