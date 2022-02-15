import reducer, { add, phraseStatusTypes, remove } from "../matchWordsSlice";

const initialState = {
  initialPhrase: [],
  currentPhrase: [],
  phrasesArray: [],
  shuffledPhrase: [],
  userSubmission: [],
  phraseStatus: phraseStatusTypes.notCompleted,
  currentWordIndex: 0,
  currentPhraseIndex: 0,
};
describe("match words reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should add a word to the userSubmission array", () => {
    const previousState = initialState;
    (previousState.initialPhrase = ["I", "brush", "my", "teeth."]),
      expect(reducer(previousState, add("I"))).toEqual({
        initialPhrase: ["I", "brush", "my", "teeth."],
        currentPhrase: [],
        phrasesArray: [],
        shuffledPhrase: [],
        userSubmission: [],
        phraseStatus: phraseStatusTypes.notCompleted,
        currentWordIndex: 0,
        currentPhraseIndex: 0,
        userSubmission: ["I"],
      });
  });

  it("should remove a word from the userSubmition array", () => {
    const previousState = {
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: ["word", "this", "no", "yes"],
    };
    expect(reducer(previousState, remove("this"))).toEqual({
      initialPhrase: ["I", "brush", "my", "teeth."],
      userSubmission: ["word", "no", "yes"],
    });
  });

  
});
