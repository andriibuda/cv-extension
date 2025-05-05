const express = require("express");
const readline = require("readline");

const app = express();
const port = 3001;

let userInput = "";

async function askUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  userInput = await new Promise((resolve) => {
    rl.question("Please enter a value: ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

app.get("/api/input", (req, res) => {
  res.json({ value: userInput });
});

askUserInput().then(() => {
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
    console.log("GET /api/input to see the value you entered.");
  });
});
