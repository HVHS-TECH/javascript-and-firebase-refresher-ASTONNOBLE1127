
const firebaseConfig = {
  apiKey: "AIzaSyBXnJbWcqld7Wwg4bfc5CmLV9LDhxwVSAI",
  authDomain: "comp-2025-aston-noble.firebaseapp.com",
  databaseURL: "https://comp-2025-aston-noble-default-rtdb.firebaseio.com",
  projectId: "comp-2025-aston-noble",
  storageBucket: "comp-2025-aston-noble.firebasestorage.app",
  messagingSenderId: "936615098052",
  appId: "1:936615098052:web:35756cde6e8a4e9ac6fb91",
  measurementId: "G-K6HXDNE2S4"
};

import {
    getDatabase,
    ref,
    get,
    update,
    query,
    orderByChild,
    limitToFirst
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";


function chezz() {
    document.getElementById("welcomeMessage").innerHTML = document.getElementById("chex").value;
    console.log(document.getElementById("chex").value)
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    signInWithPopup(getAuth(), PROVIDER).then(async (result) => {
console.log(result)
var userDetails = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
        }
        const result1 = await  fb_read(userDetails.uid,"/users/")
        document.getElementById("welcomeMessage").innerHTML = JSON.stringify(result1)
        console.log(result1)
    }).catch((error) => {
        console.error("❌authentication error: " + error)
        alert("❌authentication error: " + error)
    });
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("welcomeMessage").innerHTML = "the JS do be connected gang"
    document.getElementById("chez").addEventListener("click", chezz)

    const FB_GAMEAPP = initializeApp(firebaseConfig);
    const FB_GAMEDB = getDatabase(FB_GAMEAPP);
    console.info(FB_GAMEDB);
    
})

async function  fb_read(what, where) {
    return await get(ref(getDatabase(), where + what)).then((snapshot) => {
        if (snapshot.val() == null) {
            console.warn("doesn't exist")
            return null
        } else {
            return snapshot.val();
        }
    }).catch((error) => {
        console.error("❌read error: " + error)
    });
}