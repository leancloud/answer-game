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
        topResultPanel: {
            default: null,
            type: cc.Node
        },
        scorePrefab: {
            default: null,
            type: cc.Prefab,
        },
        selfResultPanel: {
            default: null,
            type: cc.Node
        },
        topResult: [],
        selfResult: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        Promise.all([this.getWorldLeaderboard(), this.getSelfLeaderborad()])
        .then(function(leaderboards){
            self.topResult = leaderboards[0];
            
            for (var i = 0; i < self.topResult.length; i++) {
                var scoreNode = cc.instantiate(self.scorePrefab);
                cc.log(scoreNode.children);
                var scoreLabelNode = scoreNode.getChildByName("ScoreLabel");
                var scoreLabel = scoreLabelNode.getComponent(cc.Label);
                var rankingLabelNode = scoreNode.getChildByName("RankingLabel");
                var rankingLabel = rankingLabelNode.getComponent(cc.Label);
                var usernameLabelNode = scoreNode.getChildByName("UsernameLabel");
                var usernameLabel = usernameLabelNode.getComponent(cc.Label);
                var ranking = self.topResult[i];
                scoreLabel.string = ranking.value;
                rankingLabel.string = ranking.rank;
                usernameLabel.string = ranking.user.getUsername();
                scoreNode.parent = self.topResultPanel;
            }

            
            self.selfResult = leaderboards[1];

            if (self.selfResult.length > 0) {
                for (var i = 0; i < self.selfResult.length; i++) {
                    var scoreNode = cc.instantiate(self.scorePrefab);
                    cc.log(scoreNode.children);
                    var scoreLabelNode = scoreNode.getChildByName("ScoreLabel");
                    var scoreLabel = scoreLabelNode.getComponent(cc.Label);
                    var rankingLabelNode = scoreNode.getChildByName("RankingLabel");
                    var rankingLabel = rankingLabelNode.getComponent(cc.Label);
                    var usernameLabelNode = scoreNode.getChildByName("UsernameLabel");
                    var usernameLabel = usernameLabelNode.getComponent(cc.Label);
                    var ranking = self.selfResult[i];
                    scoreLabel.string = ranking.value;
                    rankingLabel.string = ranking.rank;
                    usernameLabel.string = ranking.user.getUsername();
                    scoreNode.parent = self.selfResultPanel;
                }
            }


        }).catch(function(e){
            cc.error(e);
        });
    },

    start () {

    },

    // update (dt) {},

    // CUSTOM METHODS
    onBackButtonClicked () {
        cc.director.loadScene('menu');
    },

    getWorldLeaderboard () {
        // 获取前 10 的用户
        var leaderboard = AV.Leaderboard.createWithoutData('world');
        return leaderboard.getResults({
            limit: 10,
            selectUserKeys: ['username'],
        });
    },
    getSelfLeaderborad () {
        var leaderboard = AV.Leaderboard.createWithoutData('world');
        return leaderboard.getResultsAroundUser({
            limit: 3,
            selectUserKeys: ['username'],
        });
    }
});
