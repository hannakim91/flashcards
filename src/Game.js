const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Round = require('./Round');
const Card = require('./Card');
const Deck = require('./Deck');

class Game {
  constructor() {
    this.currentRound = null
  }

  showRound() {
    return this.currentRound
  }

  start(cardData) {
    const cardCopy = [...cardData]
    const cards = cardCopy.map(({id, question, answers, correctAnswer}) => new Card(id, question, answers, correctAnswer))
    const newDeck = new Deck(cards)
    this.currentRound = new Round(newDeck)
    this.printMessage(newDeck, this.currentRound)
    this.printQuestion(this.currentRound)
  }

  printMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
    util.main(round);
  }
}

module.exports = Game;