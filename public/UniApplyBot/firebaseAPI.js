// Import the Firebase functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firabase API keys
const firebaseConfig = {
  apiKey: "AIzaSyA8AjtfiQaR8-g-2PYIhEvzS9ZUMNHISbw",
  authDomain: "uniapplybot.firebaseapp.com",
  projectId: "uniapplybot",
  storageBucket: "uniapplybot.appspot.com",
  messagingSenderId: "1000461141093",
  appId: "1:1000461141093:web:b6fe8c2871741be5d6328c",
  measurementId: "G-5LGTGTQG1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the Firebase instances
export { app, analytics, auth, db };