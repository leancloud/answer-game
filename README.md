# answer-game

## 服务端
创建 [LeanCloud](https://leancloud.cn/) 应用

### 数据存储
1. 进入「控制台」->「存储」
2. 点击「创建 Class」，新建 `Question` 表，点击「添加列」，输入列名称 `qid` ，列类型选择 Number，勾选「自增」。
3. 点击「创建 Class」，新建 `ChallengeScore` 表，点击「添加列」，输入列名称 `cid` ，列类型选择 Number，勾选「自增」。

### 云引擎
1. 进入「控制台」->「云引擎」->「部署」，选择「在线编辑」
2. 创建函数
  * 选择 Global，将 `./cloud-code/cloud.js` 中的 `getRandomNumbers()` 方法复制粘贴进去，保存。
  * 选择 Function，将 `./cloud-code/cloud.js` 中的 `getSingleGameData()` 方法复制粘贴进去，保存。
  * 选择 Function，将 `./cloud-code/cloud.js` 中的 `getChallengeGameData()` 方法复制粘贴进去，保存。

3. 点击「部署」

## 客户端
### 配置
1. `npm install` 安装依赖
2. 将 `login.js` 中的 AppID 和 AppKey 修改为自己在 LeanCloud 的应用数据。

### 运行
使用 CocosCreater 打开根目录运行即可。





