const { body, validationResult } = require("express-validator");

const genres = [
  "Action",
  "Adventure",
  "Role-playing",
  "Simulation",
  "Strategy",
];

const validateUser = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Title: must be between 2 and 40 characters")
    .notEmpty(),

  body("author")
    .trim()
    .isAlpha()
    .withMessage(`Name must contain only letters`)
    .isLength({ min: 3, max: 30 })
    .withMessage(`Length must be between 3 and 30 characters`)
    .notEmpty(),

  body("genre")
    .trim()
    .isAlpha()
    .notEmpty()
    .withMessage("Genre must be something else"),

  body("description")
    .trim()
    .notEmpty()
    .isLength({ min: 10, max: 150 })
    .withMessage("Length must be between 10 and 150 characters"),
];

module.exports = validateUser;
