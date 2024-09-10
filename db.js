require("dotenv").config();

// db.js
const { Pool } = require("pg");

// Set up your PostgreSQL client configuration
const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST, // or your database host
	database: process.env.DB_NAME,
	port: process.env.DB_PORT, // default PostgreSQL port
});

// Test connection to database
pool.connect((err, client, release) => {
	if (err) {
		return console.error("Error acquiring client", err.stack);
	}
	client.query("SELECT NOW()", (err, result) => {
		release();
		if (err) {
			return console.error("Error executing query", err.stack);
		}
		console.log("db online: ", result.rows[0].now);
	});
});

module.exports = pool;
