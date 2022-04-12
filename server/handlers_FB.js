"use strict";

const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const { db, users } = require("./config");

const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body
  
    const userSearch = await users.where("email", "==", email).where("password", "==", password).get();
    
    if (userSearch.empty) {
      res.status(404).json({ status: 400, data: req.body, message: "No user found with that email and/or password" })
      return;
    }
    
    userSearch.forEach(doc => {
      res.status(200).json({ status: 200, data: doc.data(), message: "Request successful" });
    });

  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message })
  }
}

const createAccount = async (req, res) => {
  try {
    let userInfo = req.body;
    userInfo["id"] = uuidv4();

    let checkStatus = null;
    
    let userSearch = await users.where("userName", "==", userInfo.username).get();
    if (!userSearch.empty) checkStatus = "Username already in use";
    
    userSearch = await users.where("email", "==", userInfo.email).get();
    if (!userSearch.empty) checkStatus = "Email address already in use";
    
    if (checkStatus) {
      res.status(400).json({ status: 400, data: userInfo, message: checkStatus });
    } else {
      await users.doc(userInfo.id).set(userInfo);
      res.status(200).json({ status: 200, data: userInfo, message: "Account created! Please wait while we redirect you" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const checkEmail = async (req, res) => {
  try {
    const {email} = req.body;

    const emailSearch = await users.where("email", "==", email).get()

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
    const {picks, user, gameid} = req.body;

    const update = await users.doc(user).collection('picks').doc(`${gameid}`).set(picks);

    res.status(200).json({ status: 200, data: picks, message: "Picks updated"})
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }

};

module.exports = { createAccount, loginAccount, checkEmail, savePicks };
