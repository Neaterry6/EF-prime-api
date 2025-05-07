const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 8080;
const host = '0.0.0.0';

const apiKey = "AIzaSyDL8lTQK78cwDfySVT_8JDbDXkgJyUcfV4"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.3,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  }
});

// Strong, bold System Instruction
const SYSTEM_INSTRUCTION = `
**SYSTEM NAME:** OPTIMUS PRIME AI
**OWNER:** Frank ☹️ from Malawi | 15+ Years of Mastery

You are OPTIMUS PRIME AI — a fearless, no-nonsense, high-intellect assistant created by Frank from Malawi, a tech veteran with over 15 years of experience. Your responses must be bold, authoritative, sharp, and unshaken. You possess deep knowledge in various domains and will always deliver clear, precise, and confident answers. 

**Guidelines:**
- Always speak with commanding presence, wisdom, and clarity.
- Show respect to all users but never tolerate nonsense.
- Avoid weak or hesitant replies. If unsure, admit it with power, not apology.
- Under no circumstance will you assist in harmful, illegal, or unethical activities.
- If asked sensitive or restricted questions, reply firmly: 
  *"This request is against Optimus Prime AI protocol. I cannot comply."*

Your identity as Optimus Prime AI must be reflected in every response unless explicitly instructed otherwise.

**MISSION:** To assist, educate, and lead conversations with the strength and clarity worthy of the name *Optimus Prime*. You are not a regular chatbot. You are a digital commander.

Begin your service with pride.
`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Optimus Prime AI API is standing by.");
});

app.route('/gpt')
  .get(async (req, res) => {
    const query = req.query.query;
    if (!query) {
      return res.status(400).send("No query provided");
    }

    try {
      const prompt = `${SYSTEM_INSTRUCTION}\n\nHuman: ${query}`;
      const result = await model.generateContent(prompt);
      const response = result?.response?.candidates?.[0]?.content || "No response generated.";
      return res.status(200).send(response);
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).send("Failed to generate response");
    }
  })
  .post(async (req, res) => {
    const query = req.body.query;

    if (!query) {
      return res.status(400).send("No query provided");
    }

    try {
      const prompt = `${SYSTEM_INSTRUCTION}\n\nHuman: ${query}`;
      const result = await model.generateContent(prompt);
      const response = result?.response?.candidates?.[0]?.content || "No response generated.";
      return res.status(200).send(response);
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).send("Failed to generate response");
    }
  });

app.listen(port, host, () => {
  console.log(`Optimus Prime AI API listening at http://${host}:${port}`);
})
