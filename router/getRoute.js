const db = require("../db");

module.exports = (router) => {
	router.get("/api/get", async (req, res) => {
		try {
			const { uuid } = req.query;

			let data;

			if (uuid) {
				const query = "SELECT * FROM human WHERE id = $1;";
				const values = [uuid];
				data = await db.query(query, values);
			} else {
				const query = "SELECT * FROM human;";
				data = await db.query(query);
			}

			if (!data || data.rows.length === 0) {
				return res.status(200).send({
					statusCode: 200,
					message: "Data returned empty!",
					data: {},
				});
			}

			return res.status(200).send({
				statusCode: 200,
				message: "Success getting all human data",
				data: data.rows,
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
