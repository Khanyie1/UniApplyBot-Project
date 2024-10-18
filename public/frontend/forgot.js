import { auth } from './firebaseAPI.js';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);

    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 4000)
}

try {
    const resetPwdBtn = document.getElementById("reset");

    resetPwdBtn.addEventListener("click", (e) => {
        e.preventDefault();

        var email = document.getElementById("email").value;

        sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage("Password reset email sent, check your emails.", "ForgotMessage");
            window.location.href = "./index.html"
        })
        .catch ((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            showMessage("Emails is required.", "ForgotMessage")
        })
    })
} catch {
    console.log("Failed to execute the reset code!")
}