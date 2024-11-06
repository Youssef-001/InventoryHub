const db = require("../db/queries");

async function getGames(req, res) {
  let games = await db.getGames(req.query.filter || "", req.query.search || "");
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
  let genre_name = await db.getGenreById(game.genre);
  game = { ...game, genre_name };
  res.render("edit", { game: game });
}

async function PostEditGame(req, res) {
  // TODO Alter row instead of delete and insert
  let gameId = req.params.id;
  let game = await db.getGameById(gameId);
  let authorObj = await db.getAuthorById(game.author);
  let authorName = authorObj[0].name;
  let genreId = await db.getGenreId(req.body.genre);
  let authorId = authorObj[0].id;

  let authorGameCount = await db.getCountGamesAuthor(authorId);

  console.log(req.body.author);
  let newAuthorId = -1;
  // TODO either it's the author's only game then just edit his name in authors table,
  //else add him in authors table and change author's id in games table for the updated game

  if (authorName == req.body.author) {
    await db.updateGame(req.body, gameId, authorId, genreId);
  } else if (authorName != req.body.author && authorGameCount == 1) {
    await db.updateAuthor(authorId, req.body.author);
    await db.updateGame(req.body, gameId, authorId, genreId);
  } else {
    newAuthorId = await db.insertAuthor(req.body.author);
  }

  if (newAuthorId != -1) {
    await db.updateGame(req.body, gameId, newAuthorId, genreId);
  }

  res.redirect("/");
}

async function GetSearchGames(req, res) {
  console.log(req.body);
}

module.exports = {
  getGames,
  getNewGame,
  postNewGame,
  deleteGame,
  getAuthors,
  getAuthorById,
  GetEditGame,
  PostEditGame,
};
