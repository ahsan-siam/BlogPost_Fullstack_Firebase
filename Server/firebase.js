const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // download from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blogspot122025-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports = db;
