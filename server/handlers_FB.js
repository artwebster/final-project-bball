"use strict";

const fetch = require("node-fetch");
const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db } = require("./firebase")

const loginAccount = async (req, res) => {
    try {
      const { email, password } = req.body
      
      const signIn = await signInWithEmailAndPassword(auth, email, password)
      const token = await signIn.user.getIdToken();

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
    const {picks, userName, date, user } = req.body;

    const updateObj = { [userName]: picks}

    const update = await db.collection("users").doc(user).collection('picks').doc(date).set(picks, {merge: true});
    // const update2 = await db.collection("games").doc(gameId).collection("data").doc("picks").set(updateObj, {merge: true})

    res.status(200).json({ status: 200, data: picks, message: "Picks updated"})
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
};

module.exports = { createAccount, loginAccount, checkEmail, savePicks };
