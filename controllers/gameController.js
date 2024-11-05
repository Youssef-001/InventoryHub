const db = require("../db/queries");

async function getGames(req, res) {
  let games = await db.getGames(req.query.filter || "");
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

async function deleteGame(req, res) {
  let id = req.params.id;
  await db.deleteGame(id);
}

async function getAuthors(req, res) {
  let authors = await db.getAuthors();

  console.log(authors);
  res.render("authors", { authors: authors });
}

async function getAuthorById(req, res) {
  let id = req.params.id;

  let author = await db.getAuthorById(id);
  let games = await db.getGamesByAuthor(id);
  console.log(games);
  console.log(author);

  console.log(author[0]);
  res.render("author", { author: author[0], games: games });
}

async function GetEditGame(req, res) {
  let id = req.params.id;
  let game = await db.getGameById(id);
  let author = await db.getAuthorById(game.author);
  authorName = author[0].name;
  // console.log(game);
  game = { ...game, author_name: authorName };
  res.render("edit", { game: game });
}

async function PostEditGame(req, res) {
  //
}

module.exports = {
  getGames,
  getNewGame,
  postNewGame,
  deleteGame,
  getAuthors,
  getAuthorById,
  GetEditGame,
};
