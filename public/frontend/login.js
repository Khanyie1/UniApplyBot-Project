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
import { validateEmail } from '../frontend/validation/validation.js';

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

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email === ""){
        showMessage("Email is required*", "SignInMessage");
        return;
    }

    if(!validateEmail(email)) {
        showMessage("Please enter a valid email address", "SignInMessage");
        return;
    }

    // const emailExists = await checkEmailExists(email);
    // if(!emailExists) {
    //     showMessage("Email does not exist in our system!", "SignInMessage")
    // } else {
    //     showMessage("Email does exist already!", "SignInMessage");
    // }

    // const emailValue = email;
    // checkEmailExists(emailValue).then(result => {
    // if (result.exists) {
    //     console.log(result.message);
    // } else {
    //     console.log(result.message);
    // }
    // });

    if(password === ""){
        showMessage("Password is required*", "SignInMessage");
        return;
    }

    // if(password.length < 6){
    //     showMessage("Password must be at least 6 characters long", "SignInMessage");
    //     return;
    // }

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
            } 
            else {
                showMessage("Invalid Email or Password", "SignInMessage");
            }
        })
    } catch {
        console.log("Failed to execute the login function!")
    }
})
