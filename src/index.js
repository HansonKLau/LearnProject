import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBqZhh7ipuEznMRgA5Sn-9Pk3nt4W6Z9s4",
    authDomain: "learnproject-ed665.firebaseapp.com",
    projectId: "learnproject-ed665",
    storageBucket: "learnproject-ed665.appspot.com",
    messagingSenderId: "310311127746",
    appId: "1:310311127746:web:84e2786c6c29d5bc75095b"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection reference
const colRef = collection(db, 'accounts');

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let accounts = [];
        snapshot.docs.forEach((doc) => {
            // ... is the spread operator, it breaks doc.data() down into individual elements
            accounts.push({ ...doc.data(), id: doc.id })
        })
        console.log(accounts);
    })
    .catch((e) => {
        console.error(e.message);
    })