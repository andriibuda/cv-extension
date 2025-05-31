const express = require("express");
const openai = require("../services/openaiClient");
const multer = require("multer");
const path = require("path");
const generateDoc = require('../services/generateDoc');
const router = express.Router();



// Configure where and how to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads/');    // folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);    // Save file with original name
  }
});



// Create multer instance with the storage configuration
const upload = multer({ storage: storage });


// Template job description and skills
const templateJobDescription = `Experienced Full-Stack Developer with 8+ years of hands-on experience building responsive, 
                                scalable web applications using React, JavaScript (ES6+), Node.js, Express, MongoDB, SQL, and EJS. 
                                Proficient in developing RESTful APIs, integrating authentication and authorization (JWT, OAuth), and 
                                ensuring cross-browser and mobile compatibility. Experienced with Python and frameworks such as Flask 
                                and Django for building backend services. Skilled in performance optimization, database design, 
                                CI/CD deployment, and Agile team collaboration. Passionate about delivering clean, user-friendly interfaces,
                                 efficient backend logic, and solving real-world business challenges.
                                 `;
const templateSkills = `React.js, Node.js, Express.js, Django, Flask, EJS, Tailwind CSS, Styled Components,
                        JavaScript (ES6+), TypeScript, Python, SQL, MongoDB, MongoDB Atlas, Mongoose, PostgreSQL,
                        MySQL, RESTful APIs, JSON, JWT Authentication, OAuth 2.0, HTML5, CSS3, Figma, Web Accessibility (WCAG), 
                        Git, GitHub, VS Code, Postman, Netlify, Render, NPM, Yarn, Agile/Scrum, Debugging, Cross-Browser Compatibility, 
                        Performance Optimization, CI/CD Deployment
                        `;


// Route to handle resume generation
router.post("/", async (req, res) => {


  // Use multer to handle file upload
  upload.single("resume")


  // Extract job description from the request body
  const jobDescription = req.body;

  try {
    // prompt for OpenAI API
    const prompt =`Base on job ${jobDescription} update my templatedescription and  templateSkills.
                    Templatedescription: ${templateJobDescription}. TemplateSkills: ${templateSkills}.
                    Generate me respone in json format with two fields: "description" and "skills".
                    The response should be a stringified well-structured JSON object with the following format:
                    {
                      "description": "Updated job description based on the template",
                      "skills": "Updated skills based on the template"
                    }
                  `;



    // Call OpenAI API with user prompt
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });



    // Extract response
    // const data = new Date();
    // console.log("GPt begin",data.toLocaleTimeString());
    const resultText = chatCompletion.choices[0].message.content;
    console.log("Raw GPT response:", resultText);
    // console.log("GPt end",data.toLocaleTimeString());
    const dataSections = JSON.parse(resultText);
    console.log("GPT response:", dataSections);



    // Validate the response structure
    if (!dataSections || !dataSections.description || !dataSections.skills) {
      return res.status(400).json({ error: "Invalid response format from GPT" });
    }


    // Generate the DOCX file using the template and the data from GPT
    const replacements = {
      DESCRIPTION: dataSections.description,
      SKILLS: dataSections.skills,
    };


    // Define paths for the template and output files
    const templatePath = path.join(__dirname, '..', 'templates', 'resume_template.docx');
    const outputPath = path.join(__dirname, 'output', 'result.docx');

   
    // Generate the document with the provided template and replacements
    await generateDoc(templatePath, outputPath, replacements);


    // Send response to frontend
    res.download(outputPath);


  } catch (error) {
    console.error("GPT error:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
});

module.exports = router;
