const inquirer = require('inquirer');
const data = require('./data');
const Game = require('./Game');
const Deck = require('./Deck');
const Round = require('./Round');
const Card = require('./Card');
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

async function main(round) {

  const currentRound = await getRound(round);
  console.log('hiiiiiiiiii', {deck: currentRound.deck, turns: currentRound.turns, incorrect: currentRound.incorrectGuesses})
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

    if(!round.returnCurrentCard() && round.calculatePercentCorrect() >= 90) {
      round.endRound();
    } else if (!round.returnCurrentCard() && round.calculatePercentCorrect() < 90) {
      console.log('Repeat this game with same deck of cards')
      round.endRound()
      const cards = prototypeQuestions.map(question => {
        console.log(question)
        return new Card(question.id, question.question, question.answers, question.correctAnswer)
      })
      const deck = new Deck(cards)
      console.log(cards)
      console.log(deck)
      const newRound = new Round(deck)
      console.log(newRound)
      main(newRound) // this starts cycle again -- and newRound is basically round with 'new' cards
      // when % correct is under 90%
      // end current round
      // instantiate new Deck with prototypeData   
      // create new instance of Round with new Deck passed in as arg
      // invoke main(round)
    } else {
      main(round);
    }
}

module.exports.main = main;

// index.js starts a game
// game calls util.main in printQuestion

// start new round with same deck 
//