const pool = require("./pool");

async function getGames(filter) {
  let q = "";

  if (filter != "") {
    q += `WHERE genres.title ILIKE '%${filter}%'`;
  }
  const { rows } = await pool.query(
    `SELECT games.id,games.description, games.title, authors.name AS author_name, genres.title AS genre_name 
       FROM games 
       JOIN authors ON games.author = authors.id 
       JOIN genres ON games.genre = genres.id ${q}`
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

  let genre = await pool.query(`SELECT * FROM genres WHERE title=$1`, [
    game.genre,
  ]);

  let genreId = genre.rows[0].id;

  await pool.query(
    `INSERT INTO games (title, author, description, genre, cover) VALUES ($1, $2, $3, $4, $5)`,
    [
      game.title,
      authorId,
      game.description,
      genreId,
      "https://example.com/animalcrossing.jpg ",
    ]
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
    `SELECT * FROM games JOIN authors ON games.author=authors.id JOIN genres ON games.genre = genres.id WHERE authors.id=$1`,
    [id]
  );
  return rows;
}

async function getGameById(id) {
  let { rows } = await pool.query(`SELECT * FROM games WHERE id=$1`, [id]);

  console.log(rows[0]);
  return rows[0];
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
};
