var AV = require('leanengine');

/**
 * 获取实时对战数据
 */
AV.Cloud.define('getMultiplayerQuestions', function(request) {
  var qidQuery = new AV.Query('Question');
  // 取随机数的边界
  qidQuery.descending('qid');
  qidQuery.limit(1);
  return qidQuery.first().then((question) => {
    var qid = question.get('qid');
    var randomNumbers = getRandomNumbers(qid, 3);
    var questionQuery = new AV.Query('Question');
    questionQuery.containedIn('qid', randomNumbers);
    return questionQuery.find();
  });
});


/**
 * 获取随机数
 */
const getRandomNumbers = (max, count) => {
  var randomNumbers = [];
  while (randomNumbers.length < count) {
    var randomNumber = Math.floor(Math.random() * max + 1);
    console.log('randomNumber is ' + randomNumber);
    if ( randomNumbers.indexOf(randomNumber) == -1) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
};

/**
 * 获取单人闯关游戏数据
 */
AV.Cloud.define('getSingleGameData', function(request) {
  // 查询今日挑战次数
  // 单人模式的记录都在 ChallengeQuestion 表中
  var countQuery = new AV.Query('ChallengeQuestion');
  var today = new Date((new Date()).setHours(0, 0, 0, 0));
  countQuery.equalTo('creator', request.currentUser);
  countQuery.greaterThanOrEqualTo('createdAt', today);
  return countQuery.count().then(function(count) {
    console.log('count 是', count);
    if (count >= 3) {
      // 玩过 3 次就不让玩了
      throw new AV.Cloud.Error('Exceeded Limit', {code: 403});
    } else {
      var qidQuery = new AV.Query('Question');
      // 取随机数的边界
      qidQuery.descending('qid');
      qidQuery.limit(1);
      return qidQuery.first().then((question) => {
        var qid = question.get('qid');
        var randomNumbers = getRandomNumbers(qid, 3);
        console.log('随机取到的 qid 为'  + randomNumbers);
        var questionQuery = new AV.Query('Question');
        questionQuery.containedIn('qid', randomNumbers);
        return questionQuery.find();
      });
    }
  });
});

/**
 * 获取挑战游戏数据
 */
AV.Cloud.define('getChallengeGameData', function(request) {
  var cidQuery = new AV.Query('ChallengeScore');
  // 取随机数的边界
  cidQuery.descending('cid');
  cidQuery.limit(1);
  return cidQuery.first().then((challengeScore) => {
    var cid = challengeScore.get('cid');
    var randomNumbers = getRandomNumbers(cid, 1);
    cid = randomNumbers[0];
    console.log('随机取到的 1 个 cid 为 '  + cid);
    var challengeQuery = new AV.Query('ChallengeScore');
    challengeQuery.equalTo('cid', cid);
    challengeQuery.include(['user', 'challenge.questions']);
    challengeQuery.select(['user.username', 'challenge', 'userOptionScores', 'userOptions']);
    return challengeQuery.first();
  });
});

/**
 * 根据上一版的历史排行数据发奖品
 */
AV.Cloud.define('weeklyRewards', function(request) {
  var leaderboard = AV.Leaderboard.createWithoutData('world');
  // 查询当前排行榜的版本
  return leaderboard.fetch()
  .then((leaderboard) => {
    // 当前版本 -1 是最新的历史数据
    var lastHistoryVersion = leaderboard.version - 1;
    // 获得上一版排行榜中的前 10 名用户
    return leaderboard.getResults({
      limit: 10,
      version: lastHistoryVersion,
    })
  })
  .then((rankings) => {
    // 给每个用户增加 10 个金币。
    var users = rankings.map((ranking) => {
      var user = ranking.user;
      user.increment('gold', 10);
      return user;
    });
    return AV.User.saveAll(users);
  }).then(() => {
    console.log('排行榜奖品发完啦 ' + new Date().toLocaleString());
  }).catch(console.error);
});
