import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc
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

// adding a document
const addUserForm = document.querySelector('.add');    // reference to the add form
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    addDoc(colRef, {
        clicks: addUserForm.clicks.value,
        username: addUserForm.username.value,
    })
    .then(() => {   // clears the form after the add button is clicked
        addUserForm.reset();
    });
});

// deleting a document
const deleteUserForm = document.querySelector('.delete');   // reference to the delete form
deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'accounts', deleteUserForm.id.value);
    deleteDoc(docRef)
    .then(() => {
        deleteUserForm.reset();
    });
});