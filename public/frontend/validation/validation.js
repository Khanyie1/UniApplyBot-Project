// import { auth } from "../firebaseAPI.js"
// import { fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

export function validateEmail(email) {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEmail.test(email);
}

// export async function checkEmailExists(email) {
//     try {
//         // Check if there are any sign-in methods associated with the email
//         const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    
//         if (signInMethods.length > 0) {
//           // Email exists, notify the user
//           return { exists: true, message: "Email is already in use." };
//         } else {
//           // Email does not exist, can proceed with registration
//           return { exists: false, message: "Email is available." };
//         }
//     } catch (error) {
//         // Handle potential errors (e.g., invalid email format)
//         return { exists: false, message: error.message };
//     }
// }

// Username validation (at least 3 characters)
export function validateUsername(username) {
    return username.length >= 4;
}

// Function to check password strength
// export function checkPasswordStrength(password) {
//     const criteria = {
//         length: password.length >= 8,
//         upperCase: /[A-Z]/.test(password),
//         lowerCase: /[a-z]/.test(password),
//         number: /\d/.test(password),
//         specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
//     };

//     const isStrong = Object.values(criteria).every(Boolean);
//     return { isStrong, criteria };
// }