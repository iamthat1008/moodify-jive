
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <motion.div 
      className="fixed bottom-4 left-4 flex items-center gap-2 text-sm text-muted-foreground backdrop-blur-sm px-4 py-2 rounded-full bg-background/50 border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
    >
      <span>Created by Shub</span>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-primary"
      >
        <Heart size={12} fill="currentColor" />
      </motion.div>
    </motion.div>
  );
};
