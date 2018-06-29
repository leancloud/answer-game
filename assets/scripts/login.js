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
        var uuid = this.randomUuid();

        User.loginWithAuthData({
            id: uuid
        }, 'anonymous')
        .then(function () {
            cc.director.loadScene('menu');
        })
        .catch(console.error);
    },

    randomUuid () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});
