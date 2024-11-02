const db = require("../db/queries");

async function getGames(req, res) {
  let games = await db.getGames();
  //   console.log(games);

  res.render("index", { games: games });
}

async function getNewGame(req, res) {
  res.render("new");
}

async function postNewGame(req, res) {
  await db.insertGame(req.body);
  res.redirect("/");
}

module.exports = {
  getGames,
  getNewGame,
  postNewGame,
};
