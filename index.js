const path = require("path");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const { default: helmet } = require("helmet");
const router = require("./router"); // Set router to organize routes

const app = express();
const port = 2100;

app.use(cors({ credentials: true })); // Allow CORS request
app.use(compression()); // Compress responses
app.use(express.json()); // Format requests and responses to JSON
app.use(helmet()); // Use helmet to prevent 3rd-party attack

// Serve static files in public directory
app.use(express.static(path.join(__dirname, "public")));

// Set the router from base url
app.use("/", router);

// Start the server using chosen port
app.listen(port, () => console.log(`server ${port} is online`));
