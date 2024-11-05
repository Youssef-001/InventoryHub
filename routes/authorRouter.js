const Router = require("express");
const gameController = require("../controllers/gameController");

let authorRouter = Router();

authorRouter.get("/", (req, res) => {
  gameController.getAuthors(req, res);
});

authorRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  gameController.getAuthorById(req, res);
});

module.exports = authorRouter;
