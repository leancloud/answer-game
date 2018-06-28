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
var {User} = AV;

cc.Class({
    extends: cc.Component,

    properties: {
        loginButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var APP_ID = 'ta9jYFH8AbjSCRvgnObdu25B-gzGzoHsz';
        var APP_KEY = 'haPSS6eGp7iQXpgwLaTVKKBe';

        AV.init({
        appId: APP_ID,
        appKey: APP_KEY
        });
    },

    start () {

    },

    onLoginButtonClicked () {
       User.loginWithAuthData({
            // 微信（weixin）和 QQ（qq）用 openid
            "openid": "oPrJ7uM5Y5oeypd0fyqQcKCaRv3o",
            "access_token": "OezXcEiiBSKSxW0eoylIeNFI3H7HsmxM7dUj1dGRl2dXJOeIIwD4RTW7Iy2IfJePh6jj7OIs1GwzG1zPn7XY_xYdFYvISeusn4zfU06NiA1_yhzhjc408edspwRpuFSqtYk0rrfJAcZgGBWGRp7wmA",
            "expires_in": "2016-01-06T11:43:11.904Z"
        }, 'weixin')
        .then(function (currentUser) {
            if (!currentUser.getUsername()) {
                currentUser.setUsername('LiLei');
                return currentUser.save();
            }
            return;
        })
        .then(function () {
            cc.director.loadScene('menu');
        })
        .catch(console.error);
    }
});
