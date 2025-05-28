const express = require("express");
const openai = require("../services/openaiClient");

const router = express.Router();

// Receive job description and send prompt to OpenAI
router.post("/", async (req, res) => {
  const jobDescription = req.body;
  console.log("Job description received");

  try {
    // Prompt to generate resume with DOC output requested
    const prompt = `Write a professional resume based on the following job description: ${jobDescription}, and send it back in DOC format.`;

    // Call OpenAI API with user prompt
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    // Extract response
    const resultText = chatCompletion.choices[0].message.content;
    console.log("Generated Resume:", resultText);

    // Send response to frontend
    res.json({ resume: resultText });
  } catch (error) {
    console.error("GPT error:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
});

module.exports = router;
