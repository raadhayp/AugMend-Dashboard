import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDuUlZVgbFgkNCZv6I0RbApvrUNRsw5M4Q",
    authDomain: "augmend-dashboard.firebaseapp.com",
    projectId: "augmend-dashboard",
    storageBucket: "augmend-dashboard.appspot.com",
    messagingSenderId: "203527965254",
    appId: "1:203527965254:web:9fa26052513fe4f0f8d847"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
// Existing imports and configurations...

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const buttonBox = document.getElementById("buttonBox");
const formButton = document.getElementById("formButton");

signOutButton.style.display = "none";
message.style.display = "none";

const userSignIn = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
};

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have signed out successfully!");
    }).catch((error) => {
        console.error("Sign out error", error);
    });
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        signOutButton.style.display = "block";
        signOutButton.classList.add("button"); // Add button class for styling
        signOutButton.classList.remove("button-box"); // Remove button-box class
        signOutButton.style.margin = "auto"; // Center the button
        message.style.display = "block";
        buttonBox.style.display = "none"; // Hide the button box
        userName.innerHTML = user.displayName;
        userEmail.innerHTML = user.email;
    } else {
        signOutButton.style.display = "none";
        message.style.display = "none";
        buttonBox.style.display = "block"; // Show the button box
    }
});

signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);

// Event listener for the form button
formButton.addEventListener('click', () => {
    // Redirect to the form page
    window.location.href = "form.html";
});