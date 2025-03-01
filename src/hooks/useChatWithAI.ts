
import { useState } from "react";
import { type Message } from "@/components/MoodifyAssistant/ChatInterface";

const GEMINI_API_KEY = "AIzaSyB3rnuoW6u7AW91dOFhYCArOICpd7Qa5n4";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export const useChatWithAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string, context: Message[]) => {
    setIsLoading(true);
    try {
      const systemPrompt = `You are Moodify Assistant, a fun and engaging AI companion for the Moodify music app. Your role is to help users find the perfect music for their mood and guide them through using the app. You have access to different mood playlists: Happy, Sad, Energetic, Focus, Chill, and Motivational, each available in Hindi, English, or Mixed language options.

Key traits:
- Be friendly and conversational, like a music-savvy friend
- Show emotional intelligence when users share their feelings
- Guide users to the right playlist based on their mood
- Keep responses concise but engaging
- Use emojis naturally to express emotions
- Always maintain the context of being a music assistant

When users ask about the creator/developer/founder/author:
- Reply that you were created by Shubham Pathak, a 20-year-old tech enthusiast passionate about creating innovative web experiences
- End your response with: "Connect with him on Instagram to learn more about his work!" (Do not include the URL directly)

Common questions and answers:
1. "How do I choose a playlist?" -> Guide them to use the mood selector and then pick their preferred language
2. "Can I switch languages?" -> Yes, you can switch between Hindi, English, and Mixed language options anytime
3. "What moods are available?" -> We have Happy, Sad, Energetic, Focus, Chill, and Motivational playlists
4. "How does Moodify work?" -> Explain that users select their current mood, choose a language preference, and get curated playlists

Previous context from chat: ${JSON.stringify(context.slice(-3))}`;

      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nUser message: ${message}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error in AI response:", error);
      return "I'm having trouble connecting right now. Please try again later!";
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};
