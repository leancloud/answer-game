# answer-game

## 效果预览
[点击此处在线感受游戏](http://answer-game.leanapp.cn/)

## 服务端
进行以下操作前需创建 [LeanCloud](https://leancloud.cn/) 应用

### 数据存储
1. 进入「控制台」->「存储」
2. 点击「创建 Class」，新建 `Question` 表，点击「添加列」，输入列名称 `qid` ，列类型选择 Number，勾选「自增」。
3. 下载[示例数据](http://lc-ta9jyfh8.cn-n1.lcfile.com/097143a1d8882d7680d0.json)，在控制台点击「数据导入」，将下载下来的文件导入进去。
3. 点击「创建 Class」，新建 `ChallengeScore` 表，点击「添加列」，输入列名称 `cid` ，列类型选择 Number，勾选「自增」。

### 云引擎
```
$ cd ./answer-game-cloud/
```
#### 下载依赖
```
$ npm install
```
#### 安装命令行工具
[点击此处查看安装教程](https://leancloud.cn/docs/leanengine_cli.html#hash1443149115)

#### 本地调试
```
$ lean login
$ lean switch
$ lean up
```

#### 部署
```
$ lean deploy
```


## 客户端
### 配置
1. `npm install` 安装依赖
2. 将 `login.js` 中的 AppID 和 AppKey 修改为自己在 LeanCloud 的应用数据。

### 运行
使用 CocosCreater 打开根目录运行即可。





