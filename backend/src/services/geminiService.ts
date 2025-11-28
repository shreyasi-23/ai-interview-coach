import { ai } from "../config/ai";
import type { Message } from "../../../shared/types/message";

export const generateCoachResponse = async (
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<{ response: string; improvements: string[] }> => {
  try {
    // Convert conversation history to Gemini format
    const history = conversationHistory.map(msg => ({
      role: msg.role === "coach" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `You are an experienced technical interview coach. Your role is to:
1. Ask thoughtful follow-up questions
2. Point out gaps in answers
3. Suggest improvements
4. Provide constructive feedback

You must respond with a JSON object containing:
- "response": Your next thoughtful follow-up question (1-2 sentences)
- "improvements": An array of 3-5 actionable tips based on the user's answers so far

Example format:
{
  "response": "Can you explain the time complexity of your solution?",
  "improvements": ["Consider discussing trade-offs", "Mention scalability concerns", "Walk through your thought process"]
}
  
Do not include any improvements if there is no user answer yet.`,
      },
      history
    });

    const result = await chat.sendMessage({
      message: userMessage,
    });

    const text = result.text || "{}";

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/); // finds JSON block inside text
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        response: parsed.response || "Let's continue the discussion.",
        improvements: parsed.improvements || []
      };
    }

    return {
      response: text,
      improvements: []
    };

  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

export { ai };