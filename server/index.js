const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');
const initializeDatabase = require('./initDb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database before starting the server
initializeDatabase().then(() => {
    console.log('Database initialized successfully');
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});

// Routes

// Create a user
app.post('/api/users', async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, phone, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [first_name, last_name, email, phone, hashedPassword]
        );
        
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await pool.query(
            "SELECT user_id, first_name, last_name, email, phone, created_at FROM users"
        );
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a user
app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query(
            "SELECT user_id, first_name, last_name, email, phone, created_at FROM users WHERE user_id = $1",
            [id]
        );
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone } = req.body;
        
        const updateUser = await pool.query(
            "UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4 WHERE user_id = $5 RETURNING *",
            [first_name, last_name, email, phone, id]
        );
        
        res.json(updateUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
        res.json("User was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
