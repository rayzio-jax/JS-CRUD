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

			const query =
				"INSERT INTO human (name, gender, age) VALUES ($1, $2, $3) RETURNING *;";
			const values = [_name, _gender, _age];

			const data = await db.query(query, values);

			if (!data || data.rows === 0)
				return res
					.status(401)
					.send({ statusCode: 401, message: "Failed insert data", data: {} });

			console.log(data.rows);

			return res.status(200).send({
				statusCode: 200,
				message: "Success insert data",
				data: {
					...(({ name, gender, age }) => ({ name, gender, age }))(data.rows[0]),
				},
			});
		} catch (err) {
			console.error(err);
			return res.status(500).send({
				statusCode: 500,
				message: err.message,
				data: {},
			});
		}
	});
};
