import { screen, userEvent } from "@testing-library/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userWonGame } from "../../../features/game/gameSlice";
import {
  currentPhrasesArray,
  phraseStatusTypes,
} from "../../../features/matchWords/matchWordsSlice";
import WordGameController, {
  WordGameStatus,
} from "../../../features/wordGameController";
import { render } from "../../../test-utils";

import MatchWords from "../MatchWords";

const gameController = new WordGameController();

beforeAll(() => {});
const wordsGameData = {
  words: [
    "My name is Carlos",
    "I brush my teeth.",
    "This is the third phrase",
    "One more to go",
  ],
};
export const MatchWordsWrapper = ({ wordsGameData }) => {
  const initialPhrase = useSelector((state) => state.matchWords.initialPhrase);

  const phraseStatus = useSelector((state) => state.matchWords.phraseStatus);
  const phrasesArray = useSelector((state) => state.matchWords.phrasesArray);
  const currentPhraseIndex = currentPhrasesArray;
  const shuffledPhrase = useSelector(
    (state) => state.matchWords.shuffledPhrase
  );

  const dispatch = useDispatch();

  useEffect(() => {
    gameController.startWordGame(wordsGameData, dispatch);
  }, []);

  useEffect(() => {
    if (
      phraseStatus == phraseStatusTypes.completed &&
      initialPhrase.length != 0
    ) {
      const nextGameStatus = gameController.tryNextPhrase(
        currentPhraseIndex,
        phrasesArray,
        dispatch
      );

      if (nextGameStatus == WordGameStatus.completed) {
        dispatch(userWonGame());
      }
    }
  }, [phraseStatus]);

  return (
    <MatchWords
      wordsArray={shuffledPhrase.slice().map((word, index) => {
        return { word: word, index: index };
      })}
      gameController={gameController}
    />
  );
};

describe("Match Words test", () => {
  test("renders the match words component", async () => {
    render(<MatchWordsWrapper wordsGameData={wordsGameData} />);
    expect(screen.getByTestId("matchWords")).toBeInTheDocument;
  });

  test("renders all the clickable words buttons", async () => {
    render(<MatchWordsWrapper wordsGameData={wordsGameData} />);

    const firstButton = screen.getByText("Carlos");
    const secondButton = screen.getByText("is");
    const thirdButton = screen.getByText("My");
    const lastButton = screen.getByText("name");

    expect(firstButton).toBeInTheDocument;
    expect(secondButton).toBeInTheDocument;
    expect(thirdButton).toBeInTheDocument;
    expect(lastButton).toBeInTheDocument;
  });

  test("When the right words are pressed add them to the input field", async () => {
    render(<MatchWordsWrapper wordsGameData={wordsGameData} />);

    const firstButton = screen.getByText("Carlos");
    const secondButton = screen.getByText("is");
    const thirdButton = screen.getByText("My");
    const lastButton = screen.getByText("name");
    const inputField = screen.getByTestId("matchWordsInputField");

    thirdButton.click();
    lastButton.click();
    secondButton.click();
    firstButton.click();

    expect(inputField.textContent).toMatch("My name is Carlos");
  });

  test("When the wrong words are pressed DONT add them to the input field", async () => {
    render(<MatchWordsWrapper wordsGameData={wordsGameData} />);

    const firstButton = screen.getByText("Carlos");
    const secondButton = screen.getByText("is");
    const thirdButton = screen.getByText("My");
    const lastButton = screen.getByText("name");
    const inputField = screen.getByTestId("matchWordsInputField");

    firstButton.click();
    secondButton.click();
    lastButton.click();

    expect(inputField.textContent).toEqual(" ");
  });
});
