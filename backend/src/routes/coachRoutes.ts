import { Router } from "express";
import { generateCoachResponse } from "../services/geminiService";

const router = Router();

// Generate coach response endpoint
router.post("/generate-response", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Pass message and conversation history to Gemini
    const result = await generateCoachResponse(message, history || []);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
