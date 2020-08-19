const inquirer = require('inquirer');
const data = require('../src/data');
const prototypeQuestions = data.prototypeData;

const genList = (round) => {
  let card = round.returnCurrentCard();
  
  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = round.takeTurn(id);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round, deck) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

    if(!round.returnCurrentCard() && round.calculatePercentCorrect() >= 90) {
      round.endRound();
    } else if (!round.returnCurrentCard() && round.calculatePercentCorrect() < 90) {
      round.restartRound(deck);
      main(1) // if you restarted game, how do you get game started again? something needs to get executed to start questions again** 
    } else {
      main(round);
    }
}

module.exports.main = main;