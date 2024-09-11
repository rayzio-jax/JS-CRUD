const db = require("../db");

module.exports = (router) => {
	router.get("/api/get", async (req, res) => {
		try {
			// Get the UUID
			const { uuid } = req.query;

			let data; // Data is declared as `let` so it can be modified based on statement for later

			/*
				Check if UUID exist.
				If yes, execute query with UUID value,
				otherwise just get all data
			*/
			if (uuid) {
				// Query to get user based on the id
				const query = "SELECT * FROM human WHERE id = $1;";

				// Template values for query
				const values = [uuid];

				// Execute the query with values
				data = await db.query(query, values);
			} else {
				// Query all user
				const query = "SELECT * FROM human;";

				// Execute the query and values
				data = await db.query(query);
			}

			// Return error response if data returned is empty
			if (!data || data.rows.length === 0) {
				return res.status(200).send({
					statusCode: 200,
					message: "Data returned empty!",
					data: {},
				});
			}

			// Return success response
			return res.status(200).send({
				statusCode: 200,
				message: "Success getting all human data",
				data: data.rows,
			});
		} catch (err) {
			// General error handler
			console.error(err);
			return res.status(500).send({
				statusCode: 500,
				message: err.message,
				data: {},
			});
		}
	});
};
