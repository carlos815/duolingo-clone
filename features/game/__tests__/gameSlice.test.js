import reducer, {
  incrementLives,
  decrementLives,
  setLives,
  userWonGame,
  startGame,
  gameStatusTypes,
} from "../gameSlice";

const initialState = {
  lives: 5,
  livesTotal: 5,
  gameStatus: gameStatusTypes.playing,
};
describe("game reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should increase the lives by one", () => {
    const previousState = initialState;
    expect(reducer(previousState, incrementLives())).toEqual({
      lives: 6,
      livesTotal: 5,
      gameStatus: gameStatusTypes.playing,
    });
  });

  it("should decrease the lives by one", () => {
    const previousState = initialState;
    expect(reducer(previousState, decrementLives())).toEqual({
      lives: 4,
      livesTotal: 5,
      gameStatus: gameStatusTypes.playing,
    });
  });

  it("should set the lives to the given number", () => {
    const previousState = initialState;
    expect(reducer(previousState, setLives(123))).toEqual({
      lives: 123,
      livesTotal: 5,
      gameStatus: gameStatusTypes.playing,
    });
  });

  it("should set the game status to win", () => {
    const previousState = initialState;
    expect(reducer(previousState, userWonGame())).toEqual({
      lives: 5,
      livesTotal: 5,
      gameStatus: gameStatusTypes.win,
    });
  });

  it("should return the game to the initial state", () => {
    const previousState = initialState;
    previousState.lives = 0;
    previousState.gameStatus = gameStatusTypes.lose;
    expect(reducer(previousState, startGame())).toEqual({
      lives: 5,
      livesTotal: 5,
      gameStatus: gameStatusTypes.playing,
    });
  });
});
