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

import {
    play,
    Region,
    Event,
} from './play';

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
        var APP_ID = 'ta9jYFH8AbjSCRvgnObdu25B-gzGzoHsz';
        var APP_KEY = 'haPSS6eGp7iQXpgwLaTVKKBe';
        // develop
        // var APP_ID = 'CjlBAcUnEv0uDvyAHaxLCcLq-gzGzoHsz';
        // var APP_KEY = 'OxUaOjxxncQFNbsuo1XU2Mp0';

        AV.init({
            appId: APP_ID,
            appKey: APP_KEY
        });

        const opts = {
            appId: APP_ID,
            appKey: APP_KEY,
            region: Region.NorthChina,
          }
          play.init(opts);
    },

    start () {

    },

    onLoginButtonClicked () {
        var uuid = this.randomId();
        console.log(uuid);
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
            // 连接在线对战服务器
            play.userId = uuid;
            // play.userId = 'LeanCloud';
            play.connect();
            
        })
        .catch(console.error);


        // 注册连接成功事件
        play.on(Event.CONNECTED, () => {
            // TODO 可以做跳转场景等操作
            cc.director.loadScene('menu');
        });

        // 注册连接失败事件
        play.on(Event.CONNECT_FAILED, (error) => {
            console.error(error);
        });

    },

    randomId () {
        return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    
});
