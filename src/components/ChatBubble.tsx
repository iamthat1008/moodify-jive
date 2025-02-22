
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { ChatInterface } from "./MoodifyAssistant/ChatInterface";

export const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-foreground p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
        >
          <MessageCircle size={20} className="md:w-6 md:h-6" />
        </motion.button>
      </motion.div>
      <ChatInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

