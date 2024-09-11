// Toggling the visibility of the password
document.addEventListener('DOMContentLoaded', () => {
    const eyeBtn = document.getElementById('eye2');
    let state = false;

    function toggle() {
        const passwordField = document.getElementById('password');
        
        if (state) {
            passwordField.setAttribute('type', 'password');
            eyeBtn.style.color = '#7a797e';
            state = false;
        } else {
            passwordField.setAttribute('type', 'text');
            eyeBtn.style.color = '#d23e3e';
            state = true;
        }
    }

    eyeBtn.addEventListener('click', toggle);
});


import { auth, db } from './firebaseAPI.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);

    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000)
}

const registerBtn = document.getElementById('register');


registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            const user = userCredentail.user;

            const userData = {
                username: username,
                email: email,
                password: password
            }
            showMessage("Account created successfully", "RegMessage");

            const docRef = doc(db, "users", user.uid);

            setDoc(docRef, userData)
            .then(() => {
                window.location.href = "./login.html"
            })
            .catch((error) => {
                console.error("Have problem with creating the account", error)
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode == "auth/email-already-in-use"){
                showMessage("Email already exists, try another email.", "RegMessage")
            } else {
                showMessage("Unable to create the user", "RegMessage")
            }
        })
    } catch {
        console.log("Failed to execute the sign up function!")
    }
})