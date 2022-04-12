"use strict";

const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const { db, users } = require("./config");

const addUser = async (req, res) => {
  try {
    let userInfo = req.body;
    userInfo["id"] = uuidv4();

    let checkStatus = null;
    
    let userSearch = await users.where("userName", "==", userInfo.userName).get();
    if (!userSearch.empty) checkStatus = "User name has already been taken";
    
    userSearch = await users.where("email", "==", userInfo.email).get();
    if (!userSearch.empty) checkStatus = "Email address already in use";
    
    if (checkStatus) {
      res.status(400).json({ status: 400, data: userInfo, message: checkStatus });
    } else {
      await users.doc(userInfo.id).set(userInfo);
      res.status(200).json({ status: 200, data: userInfo, message: "User added successfully" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { addUser };
