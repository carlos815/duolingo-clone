import { configureStore } from "@reduxjs/toolkit";
import matchWordsReducer from "../features/matchWords/matchWordsSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    matchWords: matchWordsReducer,
    game: gameReducer,
  },
});
