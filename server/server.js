"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const { getGames, getNews, getOdds, getStandings, getLiveScores, getLiveScores2 } = require("./handlers");
const { createAccount, loginAccount, checkEmail, savePicks, getLeaderboard, forceUpdate } = require("./handlers_FB");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // endpoints
  .get("/api/get-news-articles", getNews)
  .get("/api/get-standings", getStandings)

  .get("/api/get-game-odds/:id", getOdds)
  .get("/api/get-games/:date", getGames)
  .get("/api/get-live-scores", getLiveScores2)
  
  .post("/api/login-account", loginAccount)
  .post("/api/create-account", createAccount)
  .post("/api/check-email", checkEmail)
  .patch("/api/save-picks", savePicks)

  .get("/api/get-leaderboard", getLeaderboard)
  .get("/api/force-update", forceUpdate)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
