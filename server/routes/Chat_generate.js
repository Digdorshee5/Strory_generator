const express = require("express");
// const fetch = require('node-fetch'); // Use node-fetch for API requests
const router = require("express").Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { Headers } = fetch;

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post("/", async (req, res) => {
  const prompt = req.body.prompt;
  console.log("hi");

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Fetch the story
    const result = await model.generateContent(prompt);

    // Send the story back to the frontend
    res.json({ story: result.response.text() });
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ error: "Failed to generate story" });
  }
});

module.exports = router;
