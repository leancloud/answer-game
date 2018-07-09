var AV = require('leanengine');

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
    if (count >= 0) {
      // 玩过 3 次就不让玩了
      console.log('抛出错误');
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
 * 获取随机数
 */
const getRandomNumbers = (max, count) => {
  var randomNumbers = [];
  while (randomNumbers.length < count) {
    var randomNumber = Math.floor(Math.random() * max + 1);
    console.log('randomNumber is' + randomNumber);
    if ( randomNumbers.indexOf(randomNumber) == -1) {
      randomNumbers.push(randomNumber);
    }
  }
  return randomNumbers;
};
