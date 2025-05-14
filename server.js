const express = require("express");
const readline = require("readline");
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
  origin: "*", // Allow requests from any origin
  credentials: true // If you’re sending cookies or authorization headers
}));

app.use(express.text({ type: 'text/html' }));
app.post("/api/generate-cv", (req, res) => {
  console.log(req.get('accept'))
  console.log(req.body)
  res.json({ value: 'ok' });
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
    console.log("GET /api/input to see the value you entered.");
  });