import { screen, userEvent } from "@testing-library/react";
import React, { useEffect } from "react";
import { render } from "../../../test-utils";
import ClickableWord from "../ClickableWord";
import { MatchWordsWrapper } from "./MatchWords.test";

const wordsGameData = {
  words: [
    "My name is Carlos",
    "I brush my teeth.",
    "This is the third phrase",
    "One more to go",
  ],
};

describe("Clickable words", () => {
  it("Renders a button given a word", () => {
    const word = "asdf";

    render(<ClickableWord word={word} key={word} />);

    const button = screen.getByRole("button");

    expect(button.textContent).toEqual(word);
  });

  it("When the correct button is pressed, button gets inactive class", () => {
    render(<MatchWordsWrapper wordsGameData={wordsGameData} />);

    const button = screen.getByText("My");
    expect(button.className).not.toContain("inactive");
    button.click();
    expect(button.className).toContain("inactive");
  });

  it("When the incorrect button is pressed, button turns gets error class", () => {
    render(<MatchWordsWrapper wordsGameData={wordsGameData} />);

    const button = screen.getByText("Carlos");
    expect(button.className).not.toContain("error");
    button.click();
    expect(button.className).toContain("error");
  });
});
