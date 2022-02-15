import { createSlice } from "@reduxjs/toolkit";

export const gameStatusTypes = {
  playing: "playing",
  idle: "idle",
  win: "win",
  lose: "lose",
};
const initialState = {
  lives: 5,
  livesTotal: 5,
  gameStatus: gameStatusTypes.playing,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementLives: (state) => {
      state.lives += 1;
      state.gameStatus = gameStatusTypes.playing;
    },
    decrementLives: (state) => {
      state.lives -= 1;
      if (state.lives == 0) {
        state.gameStatus = gameStatusTypes.lose;
      }
    },
    setLives: (state, action) => {
      state.lives = action.payload;

      if (state.lives != 0) {
      }
    },
    userWonGame: (state) => {
      state.gameStatus = gameStatusTypes.win;
    },
    startGame: (state) => {
      state.gameStatus = gameStatusTypes.playing;
      state.lives = state.livesTotal;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  incrementLives,
  decrementLives,
  setLives,
  userWonGame,
  startGame,
} = gameSlice.actions;

export default gameSlice.reducer;
