
import { motion } from "framer-motion";

export const WelcomeMessage = () => {
  const text = "How are you feeling today?";
  const description = "Select your mood and let the music match your emotions";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center space-y-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-4xl md:text-5xl font-bold tracking-tight"
      >
        {text}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-lg text-muted-foreground"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
