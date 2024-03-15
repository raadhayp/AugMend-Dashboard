// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuUlZVgbFgkNCZv6I0RbApvrUNRsw5M4Q",
    authDomain: "augmend-dashboard.firebaseapp.com",
    projectId: "augmend-dashboard",
    storageBucket: "augmend-dashboard.appspot.com",
    messagingSenderId: "203527965254",
    appId: "1:203527965254:web:9fa26052513fe4f0f8d847"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Get authentication instance
const provider = new GoogleAuthProvider(); // Google auth provider
const firestore = getFirestore(); // Firestore instance

// Get references to DOM elements
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");
const message = document.getElementById("message");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const buttonBox = document.getElementById("buttonBox");
const formButton = document.getElementById("formButton");

// Set initial display states
signOutButton.style.display = "none";
message.style.display = "none";

// Function to handle user sign-in
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

// Function to handle user sign-out
const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have signed out successfully!");
    }).catch((error) => {
        console.error("Sign out error", error);
    });
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is signed in
        signOutButton.style.display = "block"; // Show sign-out button
        signOutButton.classList.add("button"); // Add button class for styling
        message.style.display = "block"; // Show user info message
        buttonBox.style.display = "none"; // Hide sign-in button box
        userName.innerHTML = user.displayName; // Display user's name
        userEmail.innerHTML = user.email; // Display user's email
    } else {
        // If user is signed out
        signOutButton.style.display = "none"; // Hide sign-out button
        message.style.display = "none"; // Hide user info message
        buttonBox.style.display = "block"; // Show sign-in button box
    }
});

// Event listener for sign-in button click
signInButton.addEventListener('click', userSignIn);

// Event listener for sign-out button click
signOutButton.addEventListener('click', userSignOut);

// Event listener for form button click
formButton.addEventListener('click', () => {
    // Redirect to the form page
    window.location.href = "form.html";
});

// Function to save survey results to Firestore
const saveSurveyResults = async (userId, surveyData) => {
    try {
        // Add survey data to Firestore
        const docRef = await addDoc(collection(firestore, "surveys"), {
            userId,
            surveyData
        });
        console.log("Survey results saved with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding survey results: ", e);
    }
};

// Function to handle form submission
const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) { // Validate the form
        const user = auth.currentUser;
        if (user) {
            // If user is signed in
            const surveyData = {
                // Get form data
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                age: parseInt(document.getElementById("age").value),
                maritalStatus: document.getElementById("maritalStatus").value,
                otherMaritalStatus: document.getElementById("otherMaritalStatus").value,
                seenTherapist: document.querySelector('input[name="seenTherapist"]:checked').value,
                medications: document.querySelector('input[name="medications"]:checked').value,
            };
            await saveSurveyResults(user.uid, surveyData); // Save survey results to Firestore
        } else {
            console.error("User not signed in.");
        }
    } else {
        alert("Please fill out all required fields.");
    }
};

// Function to validate the form
const validateForm = () => {
    const inputs = document.querySelectorAll("input, select");
    for (const input of inputs) {
        if (input.required && !input.value) {
            return false;
        }
    }
    return true;
};

// Attach event listener to form submission
const surveyForm = document.getElementById("surveyForm");
surveyForm.addEventListener("submit", handleFormSubmit);
