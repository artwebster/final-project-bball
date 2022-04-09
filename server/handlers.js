"use strict";

const fetch = require("node-fetch");

require("dotenv").config();
const { GNEWS, X_API_KEY, SDIO_KEY } = process.env;
const teams = require("./data/teams.json")

const getNews = async (req, res) => {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?topic=sports&q=nba&lang=en&token=${GNEWS}`
    );
    const data = await response.json();

    res
      .status(200)
      .json({ status: 200, data, message: "Request successful" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getOdds = async (req, res) => {
    try {
        const start = req.query.from;
        const end = req.query.to;

        console.log("got this far....");
        const response = await fetch(`https://sports-api.cloudbet.com/pub/v2/odds/competitions/basketball-usa-nba?from=${start}&to=${end}&limit=50`, {
              method: "GET",
              headers: {
                accept: "application/json",
                "X-API-Key": `${X_API_KEY}`
              },
            }
          )
        const data = await response.json();
        console.log("data", data);
        res.status(200).json({ status: 200, data, message: "Request successful" })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })
    }
}

const getStandings = async (req, res) => {
  try {
    res.status(200).json({ status: 200, data: teams, message: "Request successful"})
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
}

module.exports = {
  getNews,
  getOdds,
  getStandings
};
