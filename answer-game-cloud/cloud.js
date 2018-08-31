var AV = require('leanengine');

/**
 * 获取实时对战数据
 */
AV.Cloud.define('getQuestions', function(request) {
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
