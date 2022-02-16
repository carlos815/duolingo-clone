import Head from "next/head";
import Image from "next/image";
import Lives from "../components/Lives";
import MatchWords from "../components/matchWords/MatchWords";
import { userWonGame, gameStatusTypes } from "../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WordGameController, {
  WordGameStatus,
} from "../features/wordGameController";
import { phraseStatusTypes } from "../features/matchWords/matchWordsSlice";
import { getDataWordGame } from "../fetchData/getDataWordGame";

export async function getStaticProps() {
  const wordsGameData = await getDataWordGame();
  return {
    props: {
      wordsGameData,
    },
    revalidate: 43200, //12 hours
  };
}

export default function Home({ wordsGameData }) {
  const dispatch = useDispatch();
  const initialPhrase = useSelector((state) => state.matchWords.initialPhrase);
  const gameStatus = useSelector((state) => state.game.gameStatus);
  const shuffledPhrase = useSelector(
    (state) => state.matchWords.shuffledPhrase
  );
  const phraseStatus = useSelector((state) => state.matchWords.phraseStatus);
  const phrasesArray = useSelector((state) => state.matchWords.phrasesArray);
  const currentPhraseIndex = useSelector(
    (state) => state.matchWords.currentPhraseIndex
  );
  const gameController = new WordGameController();

  useEffect(() => {
    gameController.startWordGame(wordsGameData, dispatch);
  }, [wordsGameData, dispatch]);

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
  }, [
    currentPhraseIndex,
    phraseStatus,
    gameController,
    initialPhrase.length,
    dispatch,
    phrasesArray,
  ]);

  const restartGame = () => {
    gameController.startWordGame(wordsGameData, dispatch);
  };

  const Title = ({ className }) => {
    return (
      <div className={className}>
        <h1 className="text-4xl font-medium mb-28  md:text-5xl ">
          Select the words in the correct order
        </h1>
      </div>
    );
  };

  const Header = ({ className }) => (
    <div className={`flex mb-11 justify-between ${className}  mb-20`}>
      <Lives />
      <div className="md:text-2xl text-lx">
        {currentPhraseIndex + 1} of {phrasesArray.length}
      </div>
    </div>
  );

  const gameScreen = (
    <div className="max-w-3xl w-full">
      <Header className="" />
      <Title className="" />
      <div className=" w-full  p-6 justify-items-stretch">
        <MatchWords
          className=""
          gameController={gameController}
          wordsArray={shuffledPhrase.slice().map((word, index) => {
            return { word: word, index: index };
          })}
        />
      </div>
    </div>
  );

  const RenderedScreen = () => {
    if (gameStatus == gameStatusTypes.win) {
      return <WinScreen onClickRestartButton={restartGame} />;
    } else if (gameStatus == gameStatusTypes.lose) {
      return <LoseScreen onClickRestartButton={restartGame} />;
    } else if (gameStatus == gameStatusTypes.playing) {
      return gameScreen;
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6 relative min-h-screen flex justify-center">
        <RenderedScreen />
      </main>

      <footer></footer>
    </>
  );
}

const LoseScreen = ({ onClickRestartButton }) => (
  <div className="flex flex-col justify-center items-center h-screen ">
    <h1 className="text-4xl mb-3 font-bold">OH NOES you lost!</h1>
    <TryAgainBtn onClick={onClickRestartButton} />
  </div>
);

const WinScreen = ({ onClickRestartButton }) => (
  <div className="flex flex-col justify-center items-center h-screen ">
    <h1 className="text-4xl mb-3 font-bold">Congrats!, you won!</h1>
    <TryAgainBtn onClick={onClickRestartButton} />
  </div>
);

const TryAgainBtn = ({ onClick }) => (
  <button
    className="bg-white rounded-lg text-base shadow-md p-4 font-bold"
    onClick={onClick}
  >
    TRY AGAIN?
  </button>
);
