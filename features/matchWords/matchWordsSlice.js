import { createSlice } from "@reduxjs/toolkit";

export const phraseStatusTypes = {
  completed: "completed",
  notCompleted: "notCompleted",
};

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

export const matchWordsSlice = createSlice({
  name: "matchWords",
  initialState,
  reducers: {
    add: (state, action) => {
      state.userSubmission.push(action.payload);
      state.currentWordIndex = state.currentWordIndex++;
      if (
        state.userSubmission.toString().toLowerCase() ==
        state.initialPhrase.toString().toLowerCase()
      )
        state.phraseStatus = phraseStatusTypes.completed;
    },
    remove: (state, action) => {
      const indexOfWord = state.userSubmission.indexOf(action.payload);
      if (indexOfWord !== -1) state.userSubmission.splice(indexOfWord, 1);
    },
    nextPhrase: (state) => {
      state.currentPhraseIndex++;
      if (state.phrasesArray[state.currentPhraseIndex] != undefined) {
        state.initialPhrase = state.phrasesArray[state.currentPhraseIndex];
        state.shuffledPhrase = state.phrasesArray[state.currentPhraseIndex]
          .slice()
          .sort(() => Math.random() - 0.5);
        state.userSubmission = [];
        state.phraseStatus = phraseStatusTypes.notCompleted;
      }
    },
    setNewWordGame: (state, action) => {
      state.phrasesArray = action.payload;

      state.initialPhrase = action.payload[0];
      state.shuffledPhrase = action.payload[0]
        .slice()
        .sort(() => Math.random() - 0.5);
      state.userSubmission = [];
      state.phraseStatus = phraseStatusTypes.notCompleted;
      state.currentPhraseIndex = 0;
      state.currentWordIndex = 0;
    },
    resetWord: (state) => {
      state.userSubmission = [];
      state.phraseStatus = phraseStatusTypes.notCompleted;
      state.currentWordIndex = 0;
    },

    setCompleted: (state) => {
      state.phraseStatus = phraseStatusTypes.completed;
    },
  },
});

export const {
  add,
  remove,
  resetWord,
  setCompleted,
  setNewWordGame,
  nextPhrase,
} = matchWordsSlice.actions;

export default matchWordsSlice.reducer;
