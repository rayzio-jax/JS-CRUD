const path = require("path");

module.exports = {
	mode: "production",
	entry: "./index.js",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "production.js",
	},
	target: "node",
};
