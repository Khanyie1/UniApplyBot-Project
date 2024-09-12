export function validateEmail(email) {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEmail.test(email);
}

// Username validation (at least 3 characters)
export function validateUsername(username) {
    return username.length >= 4;
}