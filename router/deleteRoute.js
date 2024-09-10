const db = require("../db");

module.exports = (router) => {
	router.delete("/api/delete", async (req, res) => {
		try {
			const { _uuid } = req.body;

			if (!_uuid) {
				console.error("UUID is empty!");
				throw new Error("UUID is empty!");
			}

			const query = "DELETE FROM human WHERE id = $1 RETURNING *;";
			const values = [_uuid];

			const data = await db.query(query, values);

			if (!data || data.rows.length === 0) {
				return res
					.status(500)
					.send({ statusCode: 500, message: "Failed delete data", data: {} });
			}

			return res.status(200).send({
				statusCode: 200,
				message: "Success delete data",
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
