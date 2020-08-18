const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');
const Round = require('../src/Round');

describe('Round', function() {
  let card1;
  let card2;
  let card3;
  let round;
  let deck;

  beforeEach(() => {
    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');
    const cards = [card1, card2, card3];
    deck = new Deck(cards)

    round = new Round(deck);
  });

  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    expect(round).to.be.an.instanceof(Round);
  }); 

  it('should have a method that returns the current card being played', function() {
    expect(round.returnCurrentCard()).to.equal(card1);
  });

  it('should start a round with no turns', function() {
    expect(round.turns).to.deep.equal([]);
  });

  describe('.takeTurn() method', function() {
    it('should update the turns counter', function() {
      round.takeTurn();
      expect(round.turns.length).to.equal(1);
    });
  
    it('should create a new instance of Turn', function() {
      round.takeTurn();
      expect(round.turns[0]).to.deep.equal({ guess: undefined, card: card1 });
    });

    it('should update the turns count if a guess is correct or incorrect', function() {
      round.takeTurn('thing');
      round.takeTurn('object');
      expect(round.turns.length).to.equal(2);
    });

    it('should update current card with next card in deck', function() {
      round.takeTurn('object');
      expect(round.deck[0]).to.equal(card2);
    });
  });

 
});