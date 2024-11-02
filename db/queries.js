const pool = require("./pool");

async function getGames() {
  const { rows } = await pool.query(`SELECT * FROM games`);

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
