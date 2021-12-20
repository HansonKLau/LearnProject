import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc, setDoc, increment
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
} from 'firebase/auth';

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
const auth = getAuth();

// collection reference
// const colRef = collection(db, 'accounts');

// // queries
// const q = query(colRef, orderBy('createdAt'));

// // real time collection data
// // function runs once initally, then runs each time the collection is modified
// // sends back a new snapshot of the collection
// // with time stamps, it will log twice since firestore takes a bit to add the timestamp
// // when firestore adds the timestamp, it is interpreted as a change, so a new snapshot is logged
// const unsubCol = onSnapshot(q, (snapshot) => {
//     let accounts = [];
//     snapshot.docs.forEach((doc) => {
//         // ... is the spread operator, it breaks doc.data() down into individual elements
//         accounts.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(accounts);
// })

// // adding a document
// const addUserForm = document.querySelector('.add');    // reference to the add form
// addUserForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     addDoc(colRef, {
//         clicks: addUserForm.clicks.value,
//         username: addUserForm.username.value,
//         createdAt: serverTimestamp()
//     })
//     .then(() => {   // clears the form after the add button is clicked
//         addUserForm.reset();
//     });
// });

// // deleting a document
// const deleteUserForm = document.querySelector('.delete');   // reference to the delete form
// deleteUserForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const docRef = doc(db, 'accounts', deleteUserForm.id.value);
//     deleteDoc(docRef)
//     .then(() => {
//         deleteUserForm.reset();
//     });
// });

// // get a singular document
// const docRef = doc(db, 'accounts', 'DvrU1KgIk9znMLkrvCLK');

// const unsubDoc = onSnapshot(docRef, (doc) => {
//     console.log(doc.data(), doc.id);
// });

// // updating a document
// const updateForm = document.querySelector('.update');

// updateForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const docRef = doc(db, 'accounts', updateForm.id.value);
//     updateDoc(docRef, {
//         username: 'new name',
//         clicks: '1'
//     })
//     .then(() => {
//         updateForm.reset();
//     });
// });

// // signing up a user
// const signUpForm = document.querySelector('.signup');

// signUpForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const email = signUpForm.email.value;
//     const password = signUpForm.password.value;
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((cred) => {
//             console.log('user created: ', cred.user);
//             signUpForm.reset();
//         })
//         .catch((err) => {
//             console.error(err.message);
//         });
// });

// // logging in
// const loginForm = document.querySelector('.login');
// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const email = loginForm.email.value;
//     const password = loginForm.password.value;
//     signInWithEmailAndPassword(auth, email, password)
//         .then((cred) => {
//             console.log('user logged in: ', cred.user);
//         })
//         .catch((err) => {
//             console.error(err.message);
//         })
// });

// // logging out
// const logoutBtn = document.querySelector('.logout');
// logoutBtn.addEventListener('click', () => {
//     signOut(auth)
//         .then(() => {
//             console.log('user signed out');
//         })
//         .catch((err) => {
//             console.error(err.message);
//         })

// });

// // subscribing to auth changes
// // const unsubAuth = onAuthStateChanged(auth, (user) => {
// //     console.log('user status changed:', user);
// // });

// // unsubscribing to db/auth changes
// const unsubBtn = document.querySelector('.unsub');
// unsubBtn.addEventListener('click', () => {
//     console.log('unsubscribing');
//     unsubCol();
//     unsubDoc();
//     unsubAuth();
// });


// Button clicker stuff

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
    const userDocRef = doc(db, 'indivCount', auth.currentUser.uid);
    updateDoc(userDocRef, { count: 0, reset: increment(1) });

    const globalDocRef = doc(db, 'globalCount', '2I1yItBId9kI9IjnOkxA');
    updateDoc(globalDocRef, { count: 0, reset: increment(1) });
});

// updates the user doc by increasing count and increase by 1
// updates the global doc by 1
const increaseBtn = document.querySelector('#increase');
increaseBtn.addEventListener('click', () => {
    const userDocRef = doc(db, 'indivCount', auth.currentUser.uid);
    updateDoc(userDocRef, { count: increment(1), increase: increment(1) });

    const globalDocRef = doc(db, 'globalCount', '2I1yItBId9kI9IjnOkxA');
    updateDoc(globalDocRef, { count: increment(1), increase: increment(1) });
});

// updates the user doc by decreasing count by 1 and increasing decrease by 1
// updates the global doc by -1
const decreaseBtn = document.querySelector('#decrease');
decreaseBtn.addEventListener('click', () => {
    const userDocRef = doc(db, 'indivCount', auth.currentUser.uid);
    updateDoc(userDocRef, { count: increment(-1), decrease: increment(1) });

    const globalDocRef = doc(db, 'globalCount', '2I1yItBId9kI9IjnOkxA');
    updateDoc(globalDocRef, { count: increment(-1), decrease: increment(1) });
});


// Putting it all together

// Displays the global count initially and whenever it is changed
const globalDocRef = doc(db, 'globalCount', '2I1yItBId9kI9IjnOkxA');
onSnapshot(globalDocRef, (doc) => {
    document.querySelector('#globalNum').innerHTML = doc.data().count;
});

// When the user logs in, their count will be displayed and will be updated whenever they click a button
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user logged in: ', cred.user);
            const userDocRef = doc(db, 'indivCount', cred.user.uid);    // get a reference of the user's doc
            setDoc(userDocRef, { lastUpdated: serverTimestamp() }, { merge: true });    // updates doc or creates it if it doesn't exist
            getDoc(userDocRef)
                .then((doc) => {
                    if (typeof doc.data().count === 'undefined') {
                        setDoc(userDocRef, { count: 0 }, { merge: true });
                    }
                });

            onSnapshot(userDocRef, (doc) => {
                document.querySelector('#indivNum').innerHTML = doc.data().count;
            });
        })
        .catch((err) => {
            console.error(err.message);
        });
});