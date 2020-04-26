import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBITgZpZRbrz5RKFgP2SVmq0RZOHu30ikI",
    authDomain: "groshary-8b8ad.firebaseapp.com",
    databaseURL: "https://groshary-8b8ad.firebaseio.com",
    projectId: "groshary-8b8ad",
    storageBucket: "groshary-8b8ad.appspot.com",
    messagingSenderId: "160552962098",
    appId: "1:160552962098:web:7801c2ca868dc8c9aa142b",
    measurementId: "G-TJ6WB8T75F"
};
firebase.initializeApp(config);
export const db = firebase.database();
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider();
