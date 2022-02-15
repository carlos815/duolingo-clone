import { startGame, decrementLives } from "./game/gameSlice";
import {
  add,
  setNewWordGame,
  nextPhrase,
  resetWord,
} from "./matchWords/matchWordsSlice";
import { useDispatch } from "react-redux";

export enum wordSubmitStatus {
  completed,
  failed
};
export enum wordGameStatus {
  completed,
  playing
};



export default class WordGameController {
  initialPhrase: string[]
  private static phrasesArray: string[][];

  constructor() {
    this.initialPhrase = [];
  }



  async startWordGame(wordsGameData: { words: string[] }, dispatch: Function) {
    WordGameController.phrasesArray = wordsGameData.words.map((phrase) => phrase.split(" "));
    dispatch(setNewWordGame(WordGameController.phrasesArray));
    dispatch(startGame());
  }

  tryNextPhrase(currentPhraseIndex: number, phrasesArray: string[], dispatch: Function): wordGameStatus {
    //const waitAnimationMs = 1000;
    if (phrasesArray[currentPhraseIndex + 1] == undefined) {
      return wordGameStatus.completed;
    } else {
      dispatch(nextPhrase());
      return wordGameStatus.playing;
    }
  }

  trySubmitWord(word: string, userSubmission: string, initialPhrase: string[], dispatch: Function): wordSubmitStatus {
    if (this.isRightWord(word, userSubmission, initialPhrase)) {
      dispatch(add(word));
      return wordSubmitStatus.completed;
    } else {
      dispatch(decrementLives());
      return wordSubmitStatus.failed;
    }
  }

  reset(dispatch: Function) {
    dispatch(startGame());
    dispatch(resetWord());
  }

  resetWord(dispatch: Function) {
    dispatch(resetWord());
  }

  private isRightWord(word: string, userSubmission: string, initialPhrase: string[]): boolean {
    const indexOfSubmittedWord = userSubmission.length;
    return (
      initialPhrase[indexOfSubmittedWord].toLowerCase() == word.toLowerCase()
    );
  }
}
