import firebase from '../firebase';
import { googleProvider, facebookProvider } from './AuthMethods';

export const socialAuth1 = () => {
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      return res.user.displayName;
    })
    .catch((er) => {
      return er;
    });
};

export const socialAuth2 = () => {
  return firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((res) => {
      return res.user.displayName;
    })
    .catch((er) => {
      return er;
    });
};
