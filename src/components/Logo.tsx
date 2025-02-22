
import { motion } from "framer-motion";

export const Logo = () => {
  const letters = "Moodify".split("");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center mb-8"
    >
      <div className="flex items-center space-x-0.5">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring",
              stiffness: 400,
              damping: 15
            }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent tracking-tight"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
