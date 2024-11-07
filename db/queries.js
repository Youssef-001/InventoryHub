const pool = require("./pool");

async function getGames(filter, search) {
  let conditions = [];

  if (filter) {
    conditions.push(`genres.title ILIKE '%${filter}%'`);
  }

  if (search) {
    conditions.push(`games.title ILIKE '%${search}%'`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const { rows } = await pool.query(
    `SELECT games.id, games.description, games.title,games.cover, authors.name AS author_name, genres.title AS genre_name 
       FROM games 
       JOIN authors ON games.author = authors.id 
       JOIN genres ON games.genre = genres.id ${whereClause}`
  );

  return rows;
}

async function getGenreById(id) {
  const { rows } = await pool.query(
    `SELECT games.*, genres.title AS genre_title
       FROM games 
       JOIN genres ON games.genre = genres.id 
       WHERE genres.id = $1`,
    [id]
  );
  //   console.log(rows[0].genre_title);
  return rows[0].genre_title;
}
async function getAuthorById() {}

async function insertAuthor(author) {
  const obj = await pool.query(`INSERT INTO authors (name) VALUES ($1)`, [
    author,
  ]);

  let ct = await pool.query(`SELECT COUNT(authors) FROM authors`);
  return ct.rows[0].count;
}

async function insertGame(game) {
  let authorId = -1;
  const { rows } = await pool.query(`SELECT * FROM authors WHERE name = $1`, [
    game.author,
  ]);
  if (rows.length === 0) {
    authorId = await insertAuthor(game.author);
  } else {
    authorId = rows[0].id;
  }

  console.log(game);

  let genre = await pool.query(`SELECT * FROM genres WHERE title ILIKE $1`, [
    game.genre,
  ]);

  let genreId = genre.rows[0].id;

  await pool.query(
    `INSERT INTO games (title, author, description, genre, cover) VALUES ($1, $2, $3, $4, $5)`,
    [game.title, authorId, game.description, genreId, game.cover]
  );
  console.log(authorId);
}

async function deleteGame(id) {
  let { rows } = await pool.query("SELECT * FROM games WHERE id=$1", [id]);
  let author = rows[0].author;
  let authorCount = await pool.query(
    `SELECT COUNT(authors.name) FROM games JOIN authors ON games.author = authors.id WHERE authors.id=$1`,
    [author]
  );
  console.log(authorCount.rows[0].count);
  if (authorCount.rows[0].count <= 1) {
    await pool.query(`DELETE FROM authors WHERE id=$1`, [author]);
  }
  await pool.query(`DELETE FROM games WHERE id=$1`, [id]);
}

async function getAuthors() {
  let { rows } = await pool.query("SELECT * FROM authors");

  return rows;
}

async function getAuthorById(id) {
  let { rows } = await pool.query(`SELECT * FROM authors WHERE id=$1`, [id]);
  return rows;
}

async function getGamesByAuthor(id) {
  let { rows } = await pool.query(
    `SELECT games.title as game_name,games.cover, games.id, games.description,authors.name as author, genres.title as genre_title  FROM games JOIN authors ON games.author=authors.id JOIN genres ON games.genre = genres.id WHERE authors.id=$1`,
    [id]
  );
  return rows;
}

async function getGameById(id) {
  let { rows } = await pool.query(`SELECT * FROM games WHERE id=$1`, [id]);

  console.log(rows[0]);
  return rows[0];
}

async function updateGame(gameObj, gameId, authorId, genreId) {
  //TODO update author,genre,game
  console.log(gameObj);

  await pool.query(
    `UPDATE games SET title=$1, description=$2, author=$3, cover=$4, genre=$5 WHERE id=$6`,
    [
      gameObj.title,
      gameObj.description,
      authorId,
      gameObj.cover,
      genreId,
      gameId,
    ]
  );
}

async function updateAuthor(id, newName) {
  let { rows } = await pool.query(`UPDATE authors SET name = $1 WHERE id=$2`, [
    newName,
    id,
  ]);
  return rows[0];
}

async function getGenreId(genreName) {
  let { rows } = await pool.query(`SELECT * FROM genres WHERE title ILIKE $1`, [
    genreName,
  ]);
  console.log("here", genreName);
  console.log("here", rows);
  return rows[0].id;
}

async function getCountGamesAuthor(authorId) {
  let { rows } = await pool.query(
    `SELECT COUNT(authors.id) FROM authors JOIN games ON authors.id = games.author WHERE authors.id = $1`,
    [authorId]
  );
  return rows[0].count;
}

async function insertAuthor(authorName) {
  const { rows } = await pool.query(
    `INSERT INTO authors (name) VALUES ($1) RETURNING id`,
    [authorName]
  );

  return rows[0].id; // Return the new author's ID
}

module.exports = {
  getGames,
  getGenreById,
  insertGame,
  deleteGame,
  getAuthors,
  getAuthorById,
  getGamesByAuthor,
  getGameById,
  updateGame,
  updateAuthor,
  getGenreId,
  getCountGamesAuthor,
  insertAuthor,
};
