// The Cloud Functions for Firebase SDK to create Cloud Functions/triggers
import functions from "firebase-functions";
import fetch from "node-fetch";

// The Firebase Admin SDK to access Firestore.
import admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

export const forceUpdate = functions.pubsub
    .topic("update-database")
    .onPublish(async () => {
      const today = new Date();

      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const date = yyyy + "-" + mm + "-" + dd;

      const gamesData = await fetch(
          `https://www.balldontlie.io/api/v1/games?dates[]=${date}`,
      );
      const games = await gamesData.json();
      
      games.data.forEach((game) => {
        db.collection("games")
            .doc(
                `${date}&${game.visitor_team.abbreviation}&${game.home_team.abbreviation}`,
            )
            .set(
                {
                  id: `${date}&${game.visitor_team.abbreviation}&${game.home_team.abbreviation}`,
                  status: game.status,
                  date: date,
                  awayTeam_fullName: game.visitor_team.full_name,
                  homeTeam_fullName: game.home_team.full_name,
                  awayTeam: game.visitor_team.abbreviation,
                  homeTeam: game.home_team.abbreviation,
                  ...(game.status === "Final" && {
                    awayTeamScore: game.visitor_team_score,
                  }),
                  ...(game.status === "Final" && {
                    homeTeamScore: game.home_team_score,
                  }),
                },
                {merge: true},
            );
      });
    });
