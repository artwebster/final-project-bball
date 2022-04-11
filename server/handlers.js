"use strict";

const fetch = require("node-fetch");

require("dotenv").config();
const { GNEWS, X_API_KEY, SDIO_KEY } = process.env;
const teams = require("./data/teams.json");
let { games, boxscores } = require("./data/games");

// -getting a list of the day's games and current boxscores
// -if the server has already made this request, then it instead returns the data from the "local storage" js files
// -not ideal, especially for box scores, but a temp solution to avoid burning through all the free calls to this api
const getGames = async (req, res) => {
  try {
    const date = req.params.date;

    if (games.length < 1) {
      const response = await fetch(
        `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${date}`,
        {
          headers: {
            method: "GET",
            "Ocp-Apim-Subscription-Key": SDIO_KEY,
          },
        }
      );
      const data = await response.json();
      games = [...data]
    }

    if (boxscores.length < 1) {
      const response = await fetch(
        `https://api.sportsdata.io/v3/nba/stats/json/BoxScores/${date}`,
        {
          headers: {
            method: "GET",
            "Ocp-Apim-Subscription-Key": SDIO_KEY,
          },
        }
      );
      const data = await response.json();
      boxscores = [...data];
    }

    res
      .status(200)
      .json({ status: 200, games, boxscores, message: "Request successful" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getNews = async (req, res) => {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?topic=sports&q=nba&lang=en&token=${GNEWS}`
    );
    const data = await response.json();

    res.status(200).json({ status: 200, data, message: "Request successful" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getOdds = async (req, res) => {
  try {
    const start = req.query.from;
    const end = req.query.to;

    const response = await fetch(
      `https://sports-api.cloudbet.com/pub/v2/odds/competitions/basketball-usa-nba?from=${start}&to=${end}&limit=50`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-Key": `${X_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    res.status(200).json({ status: 200, data, message: "Request successful" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getStandings = async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: 200, data: teams, message: "Request successful" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  getGames,
  getNews,
  getOdds,
  getStandings,
};
