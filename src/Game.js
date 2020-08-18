const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Round = require('./Round');
const Card = require('../src/Card');
const Deck = require('../src/Deck');

class Game {
  constructor() {
    this.currentRound = null
  }

  showRound(deck) {
    this.currentRound = new Round(deck)
  }

  start() {
    const cardA = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const cardB = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    const cardC = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');
    const cards = [cardA, cardB, cardC]
    const newDeck = new Deck(cards)
    const newRound = new Round(newDeck)
    this.printMessage(newDeck, newRound)
    this.printQuestion(newRound)
    return newRound
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