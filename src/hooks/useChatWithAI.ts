
import { useState } from "react";
import { type Message } from "@/components/MoodifyAssistant/ChatInterface";

const GEMINI_API_KEY = "AIzaSyB3rnuoW6u7AW91dOFhYCArOICpd7Qa5n4";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

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
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};
