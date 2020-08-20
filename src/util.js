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

  if(!round.returnCurrentCard() && round.calculatePercentCorrect() >= 90) {
    round.endRound();
    process.exit();
  }
  
  if (!round.returnCurrentCard()) {
    round.endRound()
    console.log('Repeat this game with same deck of cards')
    console.log('XXXXXX', prototypeQuestions)
    // const cards = data.prototypeData.map(question => {
    //   console.log(question)
    //   return new Card(question.id, question.question, question.answers, question.correctAnswer)
    // })
    const cards = data.prototypeData.map(({id, question, answers, correctAnswer}) => {
      return new Card(id, question, answers, correctAnswer)
    })
    const deck = new Deck(cards)
    console.log(cards)
    console.log(deck)
    round = new Round(deck)
    // this starts cycle again -- and newRound is basically round with 'new' cards
    // when % correct is under 90%
    // end current round
    // instantiate new Deck with prototypeData   
    // create new instance of Round with new Deck passed in as arg
    // invoke main(round)
  }
  main(round);
  
}

module.exports.main = main;

// prototypequestions may be getting changed when you shift things out of array with round.takeTurn
// solution: make a copy of prototype questions