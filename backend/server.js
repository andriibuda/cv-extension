const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import route handlers
const generateCvRoute = require("./routes/controller");

const app = express();
const port = 3001;

// Middleware to handle CORS and plain text bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/api/generate-cv", generateCvRoute); // Handle OpenAI resume generation


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
