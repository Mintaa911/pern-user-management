const { Pool } = require('pg');
require('dotenv').config();

async function initializeDatabase() {
    // First connect to postgres database to create our database if it doesn't exist
    const pool = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: 'postgres' // Connect to default postgres database
    });

    try {
        // Check if our database exists
        const dbResult = await pool.query(
            "SELECT 1 FROM pg_database WHERE datname = $1",
            [process.env.PG_DATABASE]
        );

        // If database doesn't exist, create it
        if (dbResult.rows.length === 0) {
            console.log(`Database ${process.env.PG_DATABASE} does not exist. Creating...`);
            await pool.query(`CREATE DATABASE ${process.env.PG_DATABASE}`);
            console.log(`Database ${process.env.PG_DATABASE} created successfully`);
        }

        // Close the connection to postgres database
        await pool.end();

        // Connect to our newly created database to create tables
        const appPool = new Pool({
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            database: process.env.PG_DATABASE
        });

        // Create tables if they don't exist
        await appPool.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(20) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Tables created successfully');
        await appPool.end();

    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}

module.exports = initializeDatabase;
