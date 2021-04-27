import firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAxdc1R1ufGsPQDaQGdIs5K62HU9deMF2U",
    authDomain: "golfbuddy-6ffcc.firebaseapp.com",
    databaseURL: "https://golfbuddy-6ffcc-default-rtdb.firebaseio.com",
    projectId: "golfbuddy-6ffcc",
    storageBucket: "golfbuddy-6ffcc.appspot.com",
    messagingSenderId: "234647605827",
    appId: "1:234647605827:web:d33aaf03c352f348bbbaf6",
    measurementId: "G-YWRYQGPJ9J"
  };

  //const app = 
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  //const db = firebase.firestore(app);
  //export const roundRef = db.collection('rounds');

  export default firebase;