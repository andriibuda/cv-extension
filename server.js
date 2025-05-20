const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const cors = require('cors');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });
const app = express();
const port = 3001;
app.use(express.text({ type: 'text/html' }));
app.use(cors());
// Recive post requset from ui and send it to gemini
app.post("/api/generate-cv", (req, res) => {
  const jobDescription = req.body;
  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: 'write resume with 8 years expirience base on this job description: ' + jobDescription,
    });
      res.json({ value: response.text });
  }
  main();
  console.log('jobDescription received')
});




app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
  console.log("GET /api/input to see the value you entered.");
});