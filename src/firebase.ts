import firebase, { auth, firestore } from 'firebase';
import { config } from './firebase.config';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firebaseAuth = auth();

let dbService = firestore();

dbService
  .enablePersistence({ synchronizeTabs: true })
  .then(() => {
    dbService = firestore();
  })
  .catch(err => console.log(err));

export { firebaseAuth, uiConfig, dbService };
