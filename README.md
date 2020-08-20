# Flashcards

**Flashcards is a multiple choice quiz playable from your terminal's command line. This program is written in test-driven vanilla ES6 JavaScript using a starter repo.**

## Flashcards

### Gameplay:

![Flashcard Gameplay in Terminal](https://media.giphy.com/media/YOkHQCaorPzc1zGTnI/giphy.gif)

### Round Over with score under 90%:

![Round Over Screen](images/RoundOver.png)
## Installation & Setup

**To play a round of flashcards:**

Clone [this repo](git@github.com:hannakim91/flashcards.git) into your local machine.
```
git clone git@github.com:hannakim91/flashcards-starter.git
```
Go into your local repo's Flashcards directory. Install npm, then run the index file.

```
cd [directory]
npm install
node index.js
```
Type in the corresponding number to one of the answer choices and hit enter to log your guess. Once you run through all the questions, you will receive a score indicating what percent of questions you answered correctly. 

If you score 90% or more, the game ends. If not, the program asks you to play again and restarts the questions from the beginning.

## Wins & Challenges

* Figuring out bug with project extension ["More Practice"](https://frontend.turing.io/projects/flash-cards.html) - I didn't realize that creating a `Deck` by passing through an array of objects in a dataset, then using the `Round.takeTurn()` method would delete objects in the original dataset in the first round of gameplay. This isn't an issue if the user plays the game once and scores over 90%. However, if they do go onto a second (and third...etc) round, there is no deck of cards to play through, creating a bug in the whole program.
* Thinking for the future: originally, a `Deck` was created without passing through `Card` objects - I was using the dataset given in the starter repo since it used objects that looked very similar to a `Card`. I learned it was better practice to convert those `Card`-like objects to instances of a card class, in case for future extensions, I would want to add more properties to the card.


## Extra Links
* [Project Board](https://github.com/hannakim91/flashcards/projects/1)
* [Project Specs](https://frontend.turing.io/projects/flash-cards.html)
