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
    const newDeck = new Deck(cardCopy)
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

//when you start game - have cards class that has set of cards (array of cards)
// pull newDeck out into a new method
module.exports = Game;