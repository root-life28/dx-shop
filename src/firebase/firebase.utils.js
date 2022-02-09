import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config={
    apiKey: "AIzaSyCphZRweEaHDkb5NxjBpjcFDpvrAJQK1GU",
    authDomain: "dx-shop.firebaseapp.com",
    projectId: "dx-shop",
    storageBucket: "dx-shop.appspot.com",
    messagingSenderId: "915012356170",
    appId: "1:915012356170:web:ac2dbf45e5bb948045feb3"
  };

  firebase.initializeApp(config);
 
  export const auth=firebase.auth(); 
  export const firestore=firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;