const express = require("express");
const path = require("path");

const gameRouter = require("./routes/gamesRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", gameRouter);

app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});
