const pool = require("./pool");

async function getGames() {
  const { rows } = await pool.query(
    `SELECT games.id,games.description, games.title, authors.name AS author_name, genres.title AS genre_name 
       FROM games 
       JOIN authors ON games.author = authors.id 
       JOIN genres ON games.genre = genres.id`
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

module.exports = {
  getGames,
  getGenreById,
};
