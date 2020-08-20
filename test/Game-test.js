const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');
const Round = require('../src/Round');
const Game = require('../src/Game');

describe('Game', () => {
  let card1;
  let card2;
  let card3;
  let cards;
  let round;
  let deck;
  let game;

  beforeEach(() => {
    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');
    cards = [card1, card2, card3];
    deck = new Deck(cards)
    round = new Round(deck);
    game = new Game(round);
  });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', () => {
    expect(game).to.be.an.instanceof(Game);
  }); 

  it('should keep track of the current round', () => {
    game.start(cards)
    expect(game.showRound()).to.deep.equal(round);
  });

  // describe('.start() method', () => {
  //   it('should create Cards for a Deck to be used in a Round', function() {
  //     expect(game.start()).to.deep.equal(round);
  //   });
  // });
});

//sad path - moreso when testing fetches/get/api calls