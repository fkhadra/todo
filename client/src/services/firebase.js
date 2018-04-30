import * as firebase from 'firebase';
import * as firestore from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCWz7pZMsDdL1escinELZle8KG2YL-uhbI",
  authDomain: "toodo-efka.firebaseapp.com",
  databaseURL: "https://toodo-efka.firebaseio.com",
  projectId: "toodo-efka",
  storageBucket: "toodo-efka.appspot.com",
  messagingSenderId: "485359242953",
};

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccess: () => false
  }
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const authService = firebase.auth();
const dbService = firebase.firestore();
dbService.settings({
  timestampsInSnapshots: true
});


authService.uiConfig = uiConfig;

export {
  authService,
  dbService
};
