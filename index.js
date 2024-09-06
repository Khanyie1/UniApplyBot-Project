// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Allows requests from frontend (adjust origin as needed)

const secretKey = 'your_secret_key'; // Replace with a strong secret key

// Simple in-memory user data (replace with a database in production)
const users = [
    { username: 'admin', password: 'password' }, // Example user
];

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password matches
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Generate a JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Logout Route (for demonstration, typically handled on the client-side by clearing the token)
app.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

// Test Route for Browser
app.get('/', (req, res) => {
    res.send('Server is running! Use POST requests to /login and /logout');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});