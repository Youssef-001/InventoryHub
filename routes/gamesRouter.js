const { Router } = require("express");
const gameController = require("../controllers/gameController");
const validateUser = require("../controllers/validationController");
const { body, validationResult } = require("express-validator");
const gameRouter = Router();

gameRouter.get("/", (req, res, next) => {
  gameController.getGames(req, res, next);
});

gameRouter.get("/new", (req, res, next) => {
  gameController.getNewGame(req, res, next);
});

gameRouter.post("/new", validateUser, (req, res, next) => {
  gameController.postNewGame(req, res, next);
});

gameRouter.get("/delete/:id", (req, res, next) => {
  gameController.deleteGame(req, res, next);
  res.redirect("/");
});

gameRouter.get("/edit/:id", (req, res, next) => {
  gameController.GetEditGame(req, res, next);
});

gameRouter.post("/edit/:id", validateUser, (req, res, next) => {
  gameController.PostEditGame(req, res, next);
});

module.exports = gameRouter;
