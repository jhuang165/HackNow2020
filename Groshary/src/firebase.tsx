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
export const db = firebase.firestore();
db.collection("groceryList").doc("01KoWPsmDHJkQV9TZYPu").collection("Breakfast").doc("hi").set({
    bread: 73,
    eggs: 2,
    BEEF: 1000
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
