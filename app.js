const express = require("express");
const path = require("path");

const authorRouter = require("./routes/authorRouter");

const gameRouter = require("./routes/gamesRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", gameRouter);
app.use("/authors", authorRouter);

app.use((req, res, next) => {
  if (!res.headersSent) {
    // Only if no response has been sent
    const error = new Error("Wrong route");
    error.status = 404;
    next(error); // Pass the error to the next middleware
  } else {
    next(); // If response is sent, skip to error handler
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.log(err.message);

  if (err.message == "Wrong route") res.render("404");
  else if (err.message == "No games found") res.render("no-result");
});

app.listen(3000, (req, res) => {
  console.log("Listening on port 3000");
});
