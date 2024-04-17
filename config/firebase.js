const admin = require("firebase-admin")
const credentials = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: ""
});

const firebaseConfig = {
    apiKey: "AIzaSyAwMd2QtlJi9A8i-ay-szs7meUk6s-m08s",
    authDomain: "project-3-7b269.firebaseapp.com",
    projectId: "project-3-7b269",
    storageBucket: "project-3-7b269.appspot.com",
    messagingSenderId: "21869913357",
    appId: "1:21869913357:web:3808fb9892357efa897c44"
};

module.exports = admin;

