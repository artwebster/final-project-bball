const admin = require("firebase-admin");

const serviceAccount = require("./data/tipoff-firebase-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const users = db.collection("users");

module.exports = { users, db };
