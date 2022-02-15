// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    words: [
      "My name is Carlos",
      "I brush my teeth.",
      "This is the third phrase",
      "One more to go",
    ],
  });
}
