import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAk-anFdV6RkBYlbJigdXZBBZm2Bbh7R6g",
  authDomain: "helpy-2b728.firebaseapp.com",
  databaseURL: "https://helpy-2b728.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;

export const db = firebase.database();
