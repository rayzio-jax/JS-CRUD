const express = require("express");
const router = express.Router();

const getRouter = require("./getRoute");
const postRouter = require("./postRoute");
const updateRouter = require("./updateRoute");
const deleteRouter = require("./deleteRoute");

router.get("/api", (req, res) => {
	try {
		res
			.status(200)
			.send({ status: 200, message: "JavaScript CRUD using Express" });
	} catch (error) {
		res.status(500).send({ status: 500, message: "Internal server error" });
	}
});

getRouter(router);
postRouter(router);
updateRouter(router);
deleteRouter(router);

module.exports = router;
