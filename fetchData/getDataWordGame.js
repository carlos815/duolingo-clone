export const getDataWordGame = async () => {
  return {
    words: [
      "My name is Carlos",
      "I brush my teeth.",
      "This is the third phrase",
      "One more to go",
    ],
  };

  const wordsApi = "http://localhost:3000/api/words";

  const res = await fetch(`${wordsApi}`);
  if (res.status !== 200) {
    throw Error;
  }

  const wordsData = await res.json();
  return wordsData;
};
