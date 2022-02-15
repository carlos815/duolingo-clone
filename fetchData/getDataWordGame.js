export const getDataWordGame = async () => {
  const wordsApi = "http://localhost:3000/api/words";

  const res = await fetch(`${wordsApi}`);
  if (res.status !== 200) {
    throw Error;
  }

  const wordsData = await res.json();
  return wordsData;
};
