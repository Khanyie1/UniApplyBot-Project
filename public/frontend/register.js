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
import { validateEmail, validateUsername } from '../frontend/validation/validation.js';

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);

    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000)
}

// const passwordInput = document.getElementById('password');
// const tooltip = document.getElementById('passwordTooltip');

// passwordInput.addEventListener('input', (e) => {
//     const password = e.target.value;
//     const { isStrong, criteria } = checkPasswordStrength(password);

//     let feedback = "Password must contain: <ul>";
//     if (!criteria.length) feedback += "<li>At least 8 characters</li>";
//     if (!criteria.upperCase) feedback += "<li>At least one uppercase letter</li>";
//     if (!criteria.lowerCase) feedback += "<li>At least one lowercase letter</li>";
//     if (!criteria.number) feedback += "<li>At least one number</li>";
//     if (!criteria.specialChar) feedback += "<li>At least one special character</li>";
//     feedback += "</ul>";

//     if (isStrong) {
//         feedback = "Your password is strong!";
//     }

//     if (tooltip) {
//         tooltip.innerHTML = feedback;
//     } else {
//         console.error("Tooltip element not found");
//     }
// });

const registerBtn = document.getElementById('register');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const password = passwordInput.value;

    if (!username) {
        showMessage("Username is required*", "RegMessage");
        return;
    }

    if(!validateUsername(username)) {
        showMessage("Username must be at least 4 characters long*", "RegMessage");
        return;
    }

    if(!email) {
        showMessage("Email is required*", "RegMessage");
        return;
    }

    if(!validateEmail(email)) {
        showMessage("Please enter a valid email address*", "RegMessage");
        return;
    }

    if (!password) {
        showMessage("Password is required*", "RegMessage");
        return;
    }

    if(password.length < 6){
        showMessage("Password must be at least 6 characters long", "RegMessage");
        return;
    }

    // const { isStrong } = checkPasswordStrength(password);
    // if(!isStrong){
    //     showMessage("Password is too weak. Please strengthen your password*", "RegMessage");
    //     return;
    // }

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
                console.error("Problem creating the account", error)
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