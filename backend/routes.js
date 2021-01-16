const express = require("express");
const Joi = require("@hapi/joi");
const { getQuestions } = require("./db");

const router = express.Router();

const itemSchema = Joi.object().keys({
  name: Joi.string(),
  quantity: Joi.number().integer().min(0),
});

router.get("/questions", (req, res) => {
  getQuestions()
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
