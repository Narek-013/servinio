const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const wordsData = require("./words.json").newObject; // Ensure the path and the key are correct

// CORS setup
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3002", "https://hy-ru-library.netlify.app"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

// Route to get words based on the day query
app.get("/", (req, res) => {
  try {
    const day = parseInt(req.query.day) || 0; // Get the 'day' query parameter
    console.log(`Fetching words for day: ${day}`);

    // Get the keys from wordsData object
    const wordKeys = Object.keys(wordsData);

    // Get the words for the current day (assuming 13 words per day)
    const wordsForDay = wordKeys.slice(day * 13, (day + 1) * 13).map((key) => ({
      word: key,
      value: wordsData[key], // Word data
    }));

    if (wordsForDay.length === 0) {
      return res.status(404).json({ message: "No words found for the specified day." });
    }

    res.json(wordsForDay); // Send back the JSON response
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://172.20.10.13:3001`); // Replace with ngrok or HTTPS server if necessary
});


