const db = require("../db");

module.exports = (router) => {
	router.delete("/api/delete", async (req, res) => {
		try {
			// Get the UUID
			const { _uuid } = req.body;

			// Check if UUID is exist from the request
			if (!_uuid) {
				console.error("UUID is empty!");
				throw new Error("UUID is empty!");
			}

			// Query to delete a user from the database
			const query = "DELETE FROM human WHERE id = $1 RETURNING *;";

			// Values that will be inserted in the update
			// Put the desired value sequentially based on `$` in query
			// Ex. `$1` is value for _uuid
			const values = [_uuid];

			// Execute the query with values
			const data = await db.query(query, values);

			// Return error response if there is no data that was deleted
			if (!data || data.rows.length === 0) {
				return res
					.status(500)
					.send({ statusCode: 500, message: "Failed delete data", data: {} });
			}

			// Return success response
			return res.status(200).send({
				statusCode: 200,
				message: "Success delete data",
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
