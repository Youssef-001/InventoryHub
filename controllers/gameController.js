const db = require("../db/queries");

async function getGames(req, res) {
  let games = await db.getGames();
  console.log(games);

  res.render("index", { games: games });
}

module.exports = {
  getGames,
};
