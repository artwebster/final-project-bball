"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const { getGames, getNews, getOdds, getStandings } = require("./handlers");
const { addUser } = require("./handlers_FB");


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
  .get("/api/get-games/:date", getGames)
  .get("/api/get-news-articles", getNews)
  .get("/api/get-game-odds", getOdds)
  .get("/api/get-standings", getStandings)

  .post("/api/add-user", addUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
