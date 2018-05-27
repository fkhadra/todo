import * as firebase from 'firebase';
// eslint-disable-next-line
import * as firestore from 'firebase/firestore';
import config from './firebase.config';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccess: () => false
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const authService = firebase.auth();
let dbService = firebase.firestore();
dbService.settings({
  timestampsInSnapshots: true
});

dbService.enablePersistence().then(() => {
  dbService = firebase.firestore();
 }).catch(err => console.log(err));

authService.uiConfig = uiConfig;

export { authService, dbService };

