const db = require("../db/queries");

async function getGames(req, res) {
  let games = await db.getGames();
  console.log(games);

  let newGames = [];

  for (let i = 0; i < games.length; i++) {
    let newGenre = await db.getGenreById(games[i].genre);
    let newObj = { ...games[i], genre: newGenre };
    let id = games[i].id;
    newGames.push(newObj);
  }
  console.log(newGames);
  res.render("index", { games: newGames });
}

module.exports = {
  getGames,
};
