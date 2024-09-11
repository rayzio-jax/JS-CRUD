const db = require("../db");

module.exports = (router) => {
	router.patch("/api/update", async (req, res) => {
		try {
			// Get the uuid, name, gender, and age value from body
			const { _uuid, _name, _gender, _age } = req.body;

			// Query to update the column and return the result
			// Change the database query here with your own database structures
			// Numbers start with `$` is a placeholder of value that will be inserted
			const query =
				"UPDATE human SET name = $1, gender = $2, age = $3 WHERE id = $4 RETURNING *;";

			// Values that will be inserted in the update
			// Put the desired value sequentially based on `$` in query
			// Ex. `$1` is value for _name
			const values = [_name, _gender, _age, _uuid];

			// Execute the query with values
			const data = await db.query(query, values);

			// Return error response if there is no data that was updated
			if (!data || data.rows.length === 0) {
				return res
					.status(500)
					.send({ statusCode: 500, message: "Failed update data", data: {} });
			}

			// Return success response
			return res.status(200).send({
				statusCode: 200,
				message: "Success update data",
				data: data.rows[0],
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
