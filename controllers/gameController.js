const db = require("../db/queries");

async function getGames(req, res, next) {
  // Ensure 'next' is included
  try {
    let games = await db.getGames(
      req.query.filter || "",
      req.query.search || ""
    );
    if (games.length === 0) {
      throw new Error("No games found");
    }
    res.render("index", { games });
  } catch (error) {
    console.log("Error fetching games", error);
    next(error); // Pass the error to the next middleware
  }
}

async function getNewGame(req, res) {
  res.render("new");
}

async function postNewGame(req, res) {
  try {
    await db.insertGame(req.body);
    res.redirect("/");
  } catch (error) {
    console.log("Error inserting game", error);
    res.status(500).send("Internal server error");
  }
}

async function deleteGame(req, res) {
  try {
    let id = req.params.id;
    await db.deleteGame(id);
  } catch (error) {
    console.log("Error deleting game", error);
    res.status(500).send("Internal server error");
  }
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
  game = { ...game, author_name: authorName };
  let genre_name = await db.getGenreById(game.genre);
  game = { ...game, genre_name };
  res.render("edit", { game: game });
}

async function PostEditGame(req, res) {
  let gameId = req.params.id;
  let game = await db.getGameById(gameId);
  let authorObj = await db.getAuthorById(game.author);
  let authorName = authorObj[0].name;
  let genreId = await db.getGenreId(req.body.genre);
  let authorId = authorObj[0].id;

  let authorGameCount = await db.getCountGamesAuthor(authorId);

  console.log(req.body.author);
  let newAuthorId = -1;

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
