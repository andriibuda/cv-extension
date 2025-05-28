const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

//Store uploads in the /uploads folder
const upload = multer({ dest: path.join(__dirname, "../uploads") });

// Receive file upload and respond with confirmation
router.post("/", upload.single("resume"), (req, res) => {
  const uploadedPath = req.file.path;
  console.log("Uploaded resume path:", uploadedPath);

  // Respond with path 
  res.json({ message: "File upload received", path: uploadedPath });
});

module.exports = router;