"use strict";

const path = require("path");

module.exports = {
	entry: {
		renderer: "./src/renderer/renderer.js",
	},
	output: {
		path: path.join(__dirname, "build/"),
		filename: "[name].js",
	},
};
