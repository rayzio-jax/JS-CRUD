const db = require("../db");

module.exports = (router) => {
	router.post("/api/post", async (req, res) => {
		try {
			const { _name, _age } = req.body;
			let { _gender } = req.body;

			if (!_name || !_gender || !_age) {
				console.error("Missing fields [name, gender, age]");
				throw new Error("Missing fields");
			}

			if (_gender !== "male" && _gender !== "female") {
				console.error("Invalid gender");
				throw new Error("Invalid gender");
			}

			_gender === "male"
				? (_gender = "M")
				: _gender === "female"
				? (_gender = "F")
				: (_gender = "?");

			// Query to update the column and return the result
			// Change the database query here with your own database structures
			// Numbers start with `$` is a placeholder of value that will be inserted
			const query =
				"INSERT INTO human (name, gender, age) VALUES ($1, $2, $3) RETURNING *;";

			// Values that will be inserted in the update
			// Put the desired value sequentially based on `$` in query
			// Ex. `$1` is value for _name
			const values = [_name, _gender, _age];

			// Execute the query with values
			const data = await db.query(query, values);

			// Return error response if there is no data posted
			if (!data || data.rows === 0)
				return res
					.status(401)
					.send({ statusCode: 401, message: "Failed insert data", data: {} });

			// Return success response
			return res.status(200).send({
				statusCode: 200,
				message: "Success insert data",
				data: {
					...(({ name, gender, age }) => ({ name, gender, age }))(data.rows[0]),
				},
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
