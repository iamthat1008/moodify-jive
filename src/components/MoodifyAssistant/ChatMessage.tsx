
import { motion } from "framer-motion";
import { Message } from "./ChatInterface";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isAssistant
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
};
