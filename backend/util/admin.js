const admin = require('firebase-admin');
const firebase = require("firebase");
const { storageBucket } = require('./config');
var {Storage} = require('@google-cloud/storage');

const config = {
  apiKey: "AIzaSyD4rD45U3xb6BhRJXwUz-8-19_HgItRGoo",
  authDomain: "score4-aa163.firebaseapp.com",
  projectId: "score4-aa163",
  storageBucket: "score4-aa163.appspot.com",
  messagingSenderId: "233357461686",
  appId: "1:233357461686:web:8a40c2680df8206991be17",
  measurementId: "G-2K6WRDM3TW"
}
//admin.initializeApp();
admin.initializeApp({
    credential: admin.credential.cert(require('../keyAdmin.json'))
});

const storage = new Storage({
  apiKey: "AIzaSyD4rD45U3xb6BhRJXwUz-8-19_HgItRGoo",
  authDomain: "score4-aa163.firebaseapp.com",
  projectId: "score4-aa163",
  storageBucket: "score4-aa163.appspot.com",
  messagingSenderId: "233357461686",
  appId: "1:233357461686:web:8a40c2680df8206991be17",
  measurementId: "G-2K6WRDM3TW",
  Accesstoken:"808c9f1a-d591-491f-a7f3-71a3fcdad13f"
});



const db= admin.firestore();


module.exports = {admin,db};  