import { auth } from './firebaseAPI.js';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);

    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000)
}

try {
    const resetPwdBtn = document.getElementById("reset");

    resetPwdBtn.addEventListener("click", (e) => {
        e.preventDefault();

        var email = document.getElementById("email").value;

        sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage("Password reset email sent!", "ForgotMessage");
            window.location.href = "./login.html"
        })
        .catch ((error) => {
            const errorCode = error.code;
            showMessage(errorCode, "ForgotMessage")
        })
    })
} catch {
    console.log("Failed to execute the reset code!")
}