const db = require("../db/queries");

async function getGames(req, res) {
  let games = await db.getGames();
  console.log(games);

  res.render("index", { games: games });
}

async function getNewGame(req, res) {
  res.render("new");
}

async function postNewGame(req, res) {
  console.log(req.body);
  await db.insertGame();
}

module.exports = {
  getGames,
  getNewGame,
  postNewGame,
};
