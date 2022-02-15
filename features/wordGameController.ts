import * as game from "./game/gameSlice";
import {
  add,
  setNewWordGame,
  nextPhrase,
  resetWord,
} from "./matchWords/matchWordsSlice";

export enum WordSubmitStatus {
  completed,
  failed
};

export enum WordGameStatus {
  completed,
  playing
};

export default class WordGameController {
  constructor() {
    // this.initialPhrase = [];
  }


  phrasesArray = [];

  startWordGame(wordsGameData: { words: string[] }, dispatch) {
    this.phrasesArray = wordsGameData.words.map((phrase) => phrase.split(" "));
    dispatch(setNewWordGame(this.phrasesArray));
    dispatch(game.startGame());
  }

  tryNextPhrase(currentPhraseIndex, phrasesArray, dispatch): WordGameStatus {
    //const waitAnimationMs = 1000;
    if (phrasesArray[currentPhraseIndex + 1] == undefined) {
      return WordGameStatus.completed;
    } else {
      dispatch(nextPhrase());
      return WordGameStatus.playing;
    }
  }

  trySubmitWord(word, userSubmission, initialPhrase, dispatch): WordSubmitStatus {
    if (this.isRightWord(word, userSubmission, initialPhrase)) {
      dispatch(add(word));
      return WordSubmitStatus.completed;
    } else {
      dispatch(game.decrementLives());
      return WordSubmitStatus.failed;
    }
  }

  reset(dispatch) {
    dispatch(game.startGame());
    dispatch(resetWord());
  }

  resetWord(dispatch) {
    dispatch(resetWord());
  }

  private isRightWord(word, userSubmission, initialPhrase): boolean {
    const indexOfSubmittedWord = userSubmission.length;
    return (
      initialPhrase[indexOfSubmittedWord].toLowerCase() == word.toLowerCase()
    );
  }
}
