import firebase from 'firebase'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyD0j4f0abHUEbWDhRvqbftgzfA9H447mXE",
    authDomain: "crypto-market-17a50.firebaseapp.com",
    databaseURL: "https://crypto-market-17a50.firebaseio.com",
    projectId: "crypto-market-17a50",
    storageBucket: "",
    messagingSenderId: "1090385369629",
    appId: "1:1090385369629:web:0d5588f80783aec9"
  }
  
  firebase.initializeApp(config);
  
  const db = firebase.firestore();
  
  export default db;