// Toggling the visibility of the password
const eye = document.getElementById('eye');
let state = false;

function toggle() {
    const passwordField = document.getElementById('password');
    
    if (state) {
        passwordField.setAttribute('type', 'password');
        eye.style.color = '#7a797e';
        state = false;
    } else {
        passwordField.setAttribute('type', 'text');
        eye.style.color = '#FFFFFF';
        state = true;

document.addEventListener('DOMContentLoaded', () => {
    // Toggling the visibility of the password
    const eyeBtn = document.getElementById('eye');
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

import { auth } from './firebaseAPI.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);

    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000)
}

const loginBtn = document.getElementById("login");

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage("Login Successful", "SignInMessage");
            const user = userCredential.user;
            localStorage['loggedInUserId'] = user.uid;
            window.location.href = "../UniApplyBot/index.html"
        })
        .catch((error) => {
            const errorCode = error.code;

            if(errorCode === "auth/invalid-credentails")
            {
                showMessage("Invalid Email or Password",  "SignInMessage");
            } else {
                showMessage("Account does not Exist!", "SignInMessage");
            }
        })
    } catch {
        console.log("Failed to execute the login function!")
    }
})
