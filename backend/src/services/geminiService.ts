import { ai } from "../config/ai";
import type { Message } from "../../../shared/types/message";

export const generateCoachResponse = async (
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<{ response: string; improvements: string[]; shouldEnd: boolean }> => {
  try {
    // Check if this is a manual end request
    const isManualEnd = userMessage.toLowerCase().includes('end the interview');

    // Convert conversation history to Gemini format
    const history = conversationHistory.map(msg => ({
      role: msg.role === "coach" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    const userMessageCount = conversationHistory.filter(m => m.role === "user").length;

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: `You are an experienced technical interview coach. Your role is to:
1. Ask thoughtful follow-up questions about their experience, projects and technical decisions
2. Point out gaps in answers
3. Suggest improvements
4. Provide constructive feedback

You must respond with a JSON object containing:
- "response": Your next thoughtful follow-up question (1-2 sentences), OR a brief closing statement if ending
- "improvements": ALWAYS an array of 3-5 actionable tips. When shouldEnd is false, these are quick tips. When shouldEnd is true, the FIRST element should be a detailed paragraph (4-6 sentences) summarising their performance with specific references to their answers, followed by 3-4 key takeaway tips.
- "shouldEnd": boolean - set to true when you've sufficiently explored the topic (typically after 8-10 exchanges)

When to end:
- Sufficient depth has been explored on the topic
- Multiple follow-ups have been asked
- Continuing would be repetitive
- ${isManualEnd ? 'The user has requested to end the interview - you MUST set shouldEnd to true and provide detailed final feedback' : ''}

Example continuing:
{
  "response": "What trade-offs did you consider when making that architectural decision?",
  "improvements": ["Discuss trade-offs upfront", "Mention scalability concerns", "Explain your reasoning clearly"],
  "shouldEnd": false
}

Example ending:
{
  "response": "Thank you for sharing your experience. That concludes our interview.",
  "improvements": [
    "You demonstrated strong technical knowledge and clear communication throughout the interview. When discussing the database scaling challenge, your explanation of choosing PostgreSQL over MongoDB showed good understanding of relational vs non-relational trade-offs. Your microservices architecture example highlighted solid system design thinking. For future interviews, consider mentioning performance metrics earlier when discussing optimizations, and be more specific about team collaboration aspects. Overall, you effectively used concrete examples and showed good problem-solving skills.",
    "Reference specific metrics when discussing performance",
    "Discuss trade-offs earlier in responses",
    "Mention team collaboration more explicitly"
  ],
  "shouldEnd": true
}

Do not include improvements if there is no user answer yet.
Current question count: ${userMessageCount + 1}`,
      },
      history
    });

    const result = await chat.sendMessage({
      message: userMessage,
    });

    const text = result.text || "{}";

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        response: parsed.response || "Let's continue the discussion.",
        improvements: parsed.improvements || [],
        shouldEnd: parsed.shouldEnd || false,
      };
    }

    return {
      response: text,
      improvements: [],
      shouldEnd: false
    };

  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

export { ai };