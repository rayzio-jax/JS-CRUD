const db = require("../db");

module.exports = (router) => {
	router.patch("/api/update", async (req, res) => {
		try {
			const { _uuid, _name, _gender, _age } = req.body;

			const query =
				"UPDATE human SET name = $1, gender = $2, age = $3 WHERE id = $4 RETURNING *;";
			const values = [_name, _gender, _age, _uuid];

			const data = await db.query(query, values);

			if (!data || data.rows.length === 0) {
				return res
					.status(500)
					.send({ statusCode: 500, message: "Failed update data", data: {} });
			}

			return res.status(200).send({
				statusCode: 200,
				message: "Success update data",
				data: data.rows[0],
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
