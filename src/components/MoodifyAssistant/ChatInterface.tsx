
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { useChatWithAI } from "@/hooks/useChatWithAI";

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "How do I choose a playlist?",
  "What moods are available?",
  "Can I switch languages?",
  "Who created Moodify?",
];

export const ChatInterface = ({ isOpen, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hey! I'm your Moodify Assistant. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const { sendMessage, isLoading } = useChatWithAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user" as const, content: input.trim() },
    ];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await sendMessage(input.trim(), messages);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-28 right-4 w-full max-w-[400px] rounded-lg shadow-xl bg-card border z-50 overflow-hidden md:right-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <h3 className="font-semibold">Moodify Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex flex-col space-y-4 p-4 h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 space-y-2">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setInput(question);
                      handleSendMessage();
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
