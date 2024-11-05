const { Router } = require("express");
const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", (req, res) => {
  gameController.getGames(req, res);
});

gameRouter.get("/new", (req, res) => {
  gameController.getNewGame(req, res);
});

gameRouter.post("/new", (req, res) => {
  gameController.postNewGame(req, res);
});

gameRouter.get("/delete/:id", (req, res) => {
  gameController.deleteGame(req, res);
  res.redirect("/");
});

gameRouter.get("/edit/:id", (req, res) => {
  gameController.GetEditGame(req, res);
});

module.exports = gameRouter;
