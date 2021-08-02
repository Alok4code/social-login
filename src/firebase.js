import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBrYfLCsPnOgaiKjWzvWT4NlF1ULobre-E',
  authDomain: 'social-login-707ee.firebaseapp.com',
  projectId: 'social-login-707ee',
  storageBucket: 'social-login-707ee.appspot.com',
  messagingSenderId: '730621833592',
  appId: '1:730621833592:web:6ef053f4ba3faff410988d',
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
