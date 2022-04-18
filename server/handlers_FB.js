"use strict";

const fetch = require("node-fetch");
const dayjs = require('dayjs')
const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db } = require("./firebase")

const loginAccount = async (req, res) => {
    try {
      const { email, password } = req.body
      
      const signIn = await signInWithEmailAndPassword(auth, email, password)
      const token = await signIn.user.getIdToken();
      console.log(signIn.user.uid);
      console.log(signIn);

      const userSearch = await db.collection("users").where("email", "==", email).get();
      userSearch.forEach(doc => {
        
        return res.status(200).json({ status: 200, data: doc.data(), token, message: "Sign in successful" });
      });
    } catch (err) {
      if (err.code === "auth/wrong-password" || "auth/user-not-found") {
        return res.status(400).json({ status: 400, message: "The email or password is incorrect"})
      } else {
        return res.status(500).json({ status: 500, message: err.message })
      }
    }
}

const createAccount = async (req, res) => {
  try {
    const { email, password, username } = req.body
  
    const userSearch = await db.collection("users").where("username", "==", username).get()
    if (!userSearch.empty) {
      return res.status(400).json({ status: 400, message: "Username already taken" })
    } 
    
    const newUser = await createUserWithEmailAndPassword(auth, email, password)
    const userId = newUser.user.uid;
    const token = await newUser.user.getIdToken();
     
    const userDetails = { username, email, userId }

    await db.collection("users").doc(userId).set(userDetails);
      
    return res.status(200).json({ status: 200, token, data: userDetails, message: "Account created! Please wait while we redirect you"})
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return res.status(400).json({ status: 400, message: "Email already in use"})
    } else {
      return res.status(500).json({ status: 500, message: "Server error" })
    }
  }
}

const checkEmail = async (req, res) => {
  try {
    const {email} = req.body;

    const emailSearch = await db.collection("users").where("email", "==", email).get()

    if (emailSearch.empty) {
      res.status(404).json({ status: 404, data: email, message: "Email account not found" })

    } else {
      res.status(200).json({ status: 200, data: email, message: "An email has been sent with instructions on how to reset your password." });
    }

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
}

const savePicks = async (req, res) => {
  try {
    const {picks, userName, date, user, gameIds } = req.body;

    gameIds.forEach((gameId) => {
      const update = db.collection("games").doc(gameId).collection("data").doc("picks").set({[userName]: [picks[`${gameId}spread`], picks[`${gameId}ou`]]}, {merge: true})
    })

    res.status(200).json({ status: 200, data: picks, message: "Picks updated"})
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
};

const getLeaderboard = async (req, res) => {
  try {
    let scoreBoard = {};
    
    // getting a list of all completed games from the database
    const gameResults = await db.collection("games").get();
    
    // converting those games into an array
    let gameFinalList = [];
    gameResults.forEach(async (game) => {
      gameFinalList.push(game.data());
    });
    
    // calculating the points for each user for each game
    const calcPoints = async (user, prediction, game) => {
      let tally = 0
      const team = prediction[0].slice(0, 13);
      const spread = prediction[0].slice(13);
      const ou = prediction[1].slice(0,1);
      const ouTarget = prediction[1].slice(1)
      const opp = team === "homeTeamScore" ? "awayTeamScore" : "homeTeamScore";
      if (game[team] + Number(spread) > game[opp]) tally += 1
      if (ou === "u") {
        if (Number(ouTarget) > (game.awayTeamScore + game.homeTeamScore)) tally += 1
      } else if (Number(ouTarget) < (game.awayTeamScore + game.homeTeamScore)) tally += 1
      scoreBoard[user] = await scoreBoard[user] + tally || tally;
    }

    // looping through all the games and sending the completed ones to the calcPoints function
    await Promise.all(gameFinalList.map( async (game)=>{
      if (game.status === "Final") {
        const picks = await db.collection("games").doc(game.id).collection("data").doc("picks").get()
        if (picks.exists) {
          for await (const [user, value] of Object.entries(picks.data())) {
            calcPoints(user, value, game)
          }
        } 
      }
    }))
   
    res.status(200).json({ status: 200, data: scoreBoard, message: "Request successful" })

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
}

const forceUpdate = async (req, res) => {
  try {
    const date = req.query.date || dayjs().format("YYYY-MM-DD");

  const gamesData = await fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
  const games = await gamesData.json();

    games.data.forEach((game) => {
      db.collection("games").doc(`${date}&${game.visitor_team.abbreviation}&${game.home_team.abbreviation}`).set({
        id: `${date}&${game.visitor_team.abbreviation}&${game.home_team.abbreviation}`,
        status: game.status,
        date: date,
        awayTeam_fullName: game.visitor_team.full_name,
        homeTeam_fullName: game.home_team.full_name,
        awayTeam: game.visitor_team.abbreviation,
        homeTeam: game.home_team.abbreviation,
        ...(game.status === "Final" && { awayTeamScore: game.visitor_team_score }),
        ...(game.status === "Final" && { homeTeamScore: game.home_team_score }),
      }, {merge: true});
    })
 
  // const dbGames = await db.collection("games").where("date", "==", date).get();
  // dbGames.forEach((game) => {
  //   console.log("game:", game.data());
  // })
  res.status(200).json({ status: 200, games, message: "good job"})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  
}

module.exports = { createAccount, loginAccount, checkEmail, savePicks, getLeaderboard, forceUpdate };
