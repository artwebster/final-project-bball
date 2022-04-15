"use strict";

const fetch = require("node-fetch");
const dayjs = require('dayjs')
const { db, users } = require("./config");

require("dotenv").config();
const { GNEWS, X_API_KEY, SDIO_KEY } = process.env;
const teams = require("./data/teams.json");
// let { games, boxscores } = require("./data/games");
// const gameList = require("./data/2022-APR-12/sd_games_by_date_before.json");

// -getting a list of the day's games and current boxscores
// -if the server has already made this request, then it instead returns the data from the "local storage" js files
// -not ideal, especially for box scores, but a temp solution to avoid burning through all the free calls to this api

// const getGames = async (req, res) => {
//   try {
//     const date = req.params.date;

//     if (games.length < 1) {
//       const response = await fetch(
//         `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${date}`,
//         {
//           headers: {
//             method: "GET",
//             "Ocp-Apim-Subscription-Key": SDIO_KEY,
//           },
//         }
//       );
//       const data = await response.json();
//       games = [...data]
//     }

//     if (boxscores.length < 1) {
//       const response = await fetch(
//         `https://api.sportsdata.io/v3/nba/stats/json/BoxScores/${date}`,
//         {
//           headers: {
//             method: "GET",
//             "Ocp-Apim-Subscription-Key": SDIO_KEY,
//           },
//         }
//       );
//       const data = await response.json();
//       boxscores = [...data];
//     }

//     res
//       .status(200)
//       .json({ status: 200, games, boxscores, message: "Request successful" });
//   } catch (err) {
//     res.status(500).json({ status: 500, message: err.message });
//   }
// };

const getGames = async (req, res) => {
  try {
    const date = req.params.date;

    const gamesRef = db.collection("games");
    const snapshot = await gamesRef.where("date", "==", date).get();
    const response = [];

    if (snapshot.empty) {
      await fetch(
        `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${date}`,
        {
          headers: {
            method: "GET",
            "Ocp-Apim-Subscription-Key": SDIO_KEY,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((game) => {
            let awayTeamAbbr = game.AwayTeam === "NO" ? "NOP": game.AwayTeam;
            let homeTeamAbbr = game.HomeTeam === "GS" ? "GSW" : game.HomeTeam;
            let newGame = {
              homeTeam: homeTeamAbbr,
              awayTeam: awayTeamAbbr,
              status: game.DateTime,
              date: game.Day.slice(0, 10),
              id: `${game.Day.slice(0, 10)}&${
                awayTeamAbbr
              }&${homeTeamAbbr}`
            };
            db.collection("games")
              .doc(`${date}&${awayTeamAbbr}&${homeTeamAbbr}`)
              .set(newGame);
            response.push(newGame);
          });
        });
    } else {
      snapshot.forEach((doc) => {
        response.push(doc.data());
      });
    }

    res
      .status(200)
      .json({ status: 200, data: response, message: "Request successful" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getOddsNew = async (req, res) => {
    try {
      const { date, away, home } = req.query;
      const gameId = `${date}&${away}&${home}`;

      const newDate = dayjs(date);
      
      const time = Math.floor(newDate.unix());
      const endTime = time + 86400;

      let gameOdds = (await db.collection("games").doc(gameId).collection("data").doc("odds").get()).data()
      
      if (gameOdds === undefined) {
        console.log("fetching odds from Cloud Bet API");
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

const getOdds = async (req, res) => {
  try {
    const start = req.query.from;
    const end = req.query.to;
    const date = req.query.date;

    const snapshot1 = await db.collection("games").where("date", "==", date).get();
    let response = [];
    const games = [];

    snapshot1.forEach(doc => {
      // console.log("yayo");
      console.log(doc.id, '=>', doc.data().homeTeam);
      games.push(doc.id)
    });
    // console.log("games my god what's going on", games);
    games.map(async (game)=> {
      console.log("game is:", game);
      const snapshot2 = await db.collection("games").doc(game).collection("data").doc("odds").get();
      if (!snapshot2.exists) {
        console.log('No matching documents.');
      }  else {
        const resAdd = snapshot2.data();
        // response = [...response, resAdd]
        console.log("pushing:");
        response.push(resAdd)
        console.log("ressy", response);

      }

    })


    // if (!snapshot.exists) {
    //   console.log('No matching documents.');
    //   return;
    // }  else {

    //   console.log("exists!:", snapshot.data());
    // }
    // snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });

    // console.log("test1:", snapshot);

  //   db.collection("games").doc('uid')
  // .get().limit(1).then(
  // doc => {
  //   if (doc.exists) {
  //     this.db.collection('users').doc('uid').collection('friendsSubcollection').get().
  //       then(sub => {
  //         if (sub.docs.length > 0) {
  //           console.log('subcollection exists');
  //         }
  //       });
  //   }
  // });

    // const subFunc = async (away, home) => {
    //   let gameInfo = await db.collection("games").doc(`${date}&${away}&${home}`).collection("data").doc("odds").get();
    //   let gameInfoFormatted = gameInfo.data();
    //   return gameInfoFormatted
    // }
    console.log("wtf how low do I have to make this bar");
    
    // snapshot.map(async (doc) => {
    //   let docData = await doc.data()
    //   console.log("yeet", docData);
    //   let gameInfo = await db.collection("games").doc(`${date}&${docData.awayTeam}&${docData.homeTeam}`).collection("data").doc("odds").get();
    //   let gameInfoFormatted = gameInfo.data();
    //   // let gameInfo = subFunc(docData.awayTeam, docData.homeTeam);
    //   response.push(gameInfoFormatted);
    //   games.push(docData);
    // });

    // for (const doc of snapshot) {
    //   console.log("did we get here even???");
    //   const docData = await doc.data()
    //   const gameInfo = await db.collection("games").doc(`${date}&${away}&${home}`).collection("data").doc("odds").get();
    //   console.log("gameInfo inside:", gameInfo);
    //   console.log("docData inside:", docData);
    //   response.push(gameInfo.data());
    //   games.push(docData);
    // }

    console.log("response???", response);
    console.log("games????", games);

    if (response[0] === "uh huh") {
      console.log("undefined surely");
      await fetch(
          `https://sports-api.cloudbet.com/pub/v2/odds/competitions/basketball-usa-nba?from=${start}&to=${end}&limit=50`,
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
          console.log("looping the games");
          games.forEach((game) => {
            console.log("ok i'm pre-daring", data);
            console.log("game mhhhhhh", game.homeTeam);
            let homeTeamAbbr = (game.homeTeam === "NOP") ? "NO" : game.homeTeam;
            console.log("game mhhhhhh2", homeTeamAbbr);
            const oddsData = data.events.find((oddsGroup) => (oddsGroup.home !== null))
            console.log("do I dare...", oddsData);

            // data.events.forEach((section) => {
            //   console.log("in the ForEach 1:", section.home);
            //   console.log("in the ForEach 2:", section.home?.abbreviation);
            // });

            let spreadAway = oddsData.markets[`basketball.handicap`].submarkets[`period=ot&period=ft`].selections[1].params.slice(9);
            let spreadHome = oddsData.markets["basketball.handicap"].submarkets["period=ot&period=ft"].selections[0].params.slice(9);
            let overUnder = oddsData.markets[`basketball.totals`].submarkets[`period=ot&period=ft`].selections[0].params.slice(6);
            spreadAway = spreadHome.slice(0, 1) === "-" ? spreadAway.slice(1) : "-" + spreadAway;
            console.log("spreadAway baby", spreadAway);
            console.log("spreadAway baby", spreadHome);
            console.log("spreadAway baby", overUnder);
            const newObj = { spreadAway, spreadHome, overUnder } 
            console.log("whyyyyyy", newObj);
            // response.push(newObj.odds)
            // console.log("data here???????", response);

            // const newRes = {...game}
            // newRes["odds"] = newObj.odds;
            
            // response.push(newRes)
            // console.log("data here???????", response);

            db.collection("games").doc(`${date}&${game.awayTeam}&${game.homeTeam}`).collection("data").doc("odds").set(newObj);
          })

          });

    }


    // if (snapshot.empty) {
    // const response = await fetch(
    //   `https://sports-api.cloudbet.com/pub/v2/odds/competitions/basketball-usa-nba?from=${start}&to=${end}&limit=50`,
    //   {
    //     method: "GET",
    //     headers: {
    //       accept: "application/json",
    //       "X-API-Key": `${X_API_KEY}`,
    //     },
    //   }
    // );

    // data = await response.json();
    // }
      console.log("here 2");
    res.status(200).json({ status: 200, data: response, message: "Request successful" });
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
  getOddsNew,
  getStandings,
};
