// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// exports.updateScores = functions.https.onRequest(async (request, response) => {
//   const today = new Date();
//   const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//   const games = await fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`)
//   const dbGames = await db.collection("games").where("date", "==", date).get();
//   dbGames.forEach((game) => {
    
//   })
// })

