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
var Mock = require('mockjs')
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
        // product
        // var APP_ID = 'ta9jYFH8AbjSCRvgnObdu25B-gzGzoHsz';
        // var APP_KEY = 'haPSS6eGp7iQXpgwLaTVKKBe';
        // develop
        var APP_ID = 'CjlBAcUnEv0uDvyAHaxLCcLq-gzGzoHsz';
        var APP_KEY = 'OxUaOjxxncQFNbsuo1XU2Mp0';

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
        .then(function (currentUser) {
            // 将匿名用户的随机字符串用户名修改为可读的用户名
            var Random = Mock.Random;
            var username = Random.cname();
            currentUser.setUsername(username);
            return currentUser.save();
        })
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
