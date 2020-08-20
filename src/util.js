const data = require('./data');
const prototypeQuestions = data.prototypeData;
const inquirer = require('inquirer');
const Game = require('./Game');
const Deck = require('./Deck');
const Round = require('./Round');
const Card = require('./Card');

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

async function main(round) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

  if(!round.returnCurrentCard() && round.calculatePercentCorrect() >= 80) {
    round.endRound();
    process.exit();
  } else if (!round.returnCurrentCard()) {
    round.endRound()
    const cards = data.prototypeData.map(({id, question, answers, correctAnswer}) => {
      return new Card(id, question, answers, correctAnswer)
    })
    const deck = new Deck(cards)
    round = new Round(deck)
  }
  main(round);
}

module.exports.main = main;
