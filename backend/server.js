const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import route handlers
const uploadRoute = require("./routes/upload");
const generateCvRoute = require("./routes/generateCv");

const app = express();
const port = 3001;

// Middleware to handle CORS and plain text bodies
app.use(cors());
app.use(express.text({ type: "text/html" }));

// Routes 
app.use("/api/upload", uploadRoute);         // Handle file uploads
app.use("/api/generate-cv", generateCvRoute); // Handle OpenAI resume generation


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
