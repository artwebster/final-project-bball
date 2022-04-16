"use strict";

const fetch = require("node-fetch");
const dayjs = require('dayjs')
const { db } = require("./config");
const gameList = require("./data/games.json")
const teams = require("./data/teams.json");

require("dotenv").config();
const { GNEWS, X_API_KEY, SDIO_KEY, TSDB_KEY } = process.env;

const getGames = async (req, res) => {
  try {
    const date = req.params.date;
    const response = gameList.filter((game) => game.date === date)
    
  res.status(200).json({ status: 200, data: response, message: "Request successful"})

  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error"})
  }
}

const getLiveScores = async (req, res) => {
  try {
    await fetch(`https://www.thesportsdb.com/api/v2/json/${TSDB_KEY}/livescore.php?l=4387`)
    .then(res => res.json())
    .then(data => {
      let liveGames = {};
      data.events.forEach((liveGame) => {
        liveGames[liveGame.idEvent] = {
          homeScore: liveGame.intHomeScore,
          awayScore: liveGame.intAwayScore,
          quarter: liveGame.strStatus,
          progress: liveGame.strProgress,
        }
      });
      res.status(200).json({ status: 200, data: liveGames, message: "Request successful"})
    });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
}

const getOdds = async (req, res) => {
    try {
      const gameId = req.params.id;
      console.log("gameId?", gameId);
      const newDate = dayjs(gameId.slice(0,10));
      
      const time = Math.floor(newDate.unix());
      const endTime = time + 86400;

      let gameOdds = (await db.collection("games").doc(gameId).collection("data").doc("odds").get()).data()

      if (gameOdds === undefined) {

        await fetch(
          `https://sports-api.cloudbet.com/pub/v2/odds/competitions/basketball-usa-nba?from=${time}&to=${endTime}&limit=50`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "X-API-Key": `${X_API_KEY}`,
            },
          }
        )
        .then( res => res.json())
        .then((data) => {
              const oddsData = data.events.find((oddsGroup) => {
              return (oddsGroup.home?.abbreviation === home)
            })
           
            if (oddsData) {

              let spreadAway = oddsData.markets[`basketball.handicap`].submarkets[`period=ot&period=ft`].selections[1].params.slice(9);
              let spreadHome = oddsData.markets["basketball.handicap"].submarkets["period=ot&period=ft"].selections[0].params.slice(9);
              let overUnder = oddsData.markets[`basketball.totals`].submarkets[`period=ot&period=ft`].selections[0].params.slice(6);
              spreadAway = spreadHome.slice(0, 1) === "-" ? spreadAway.slice(1) : "-" + spreadAway;
              
              const newObj = { spreadAway, spreadHome, overUnder } 
              gameOdds = {...newObj}
              
              db.collection("games").doc(`${gameId}`).collection("data").doc("odds").set(newObj);
            }
          })
          };
      
      res.status(200).json({ status: 200, odds: gameOdds || null, game: gameId, message: "Request successful"})
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message })
    }
}

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
  getLiveScores,
};
