const { Router } = require("express");
const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", (req, res) => {
  gameController.getGames(req, res);
});

module.exports = gameRouter;
