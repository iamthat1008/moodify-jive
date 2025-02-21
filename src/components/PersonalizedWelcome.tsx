
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PersonalizedWelcomeProps {
  name: string;
}

const moodMessages = [
  "What's your vibe today",
  "Pick your mood",
  "Let's match your mood to the perfect music",
  "How are you feeling today",
  "Ready to set your mood with music",
];

export const PersonalizedWelcome = ({ name }: PersonalizedWelcomeProps) => {
  const [greeting, setGreeting] = useState("");
  const [message, setMessage] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    
    if (hour >= 5 && hour < 12) timeGreeting = "Good morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    setGreeting(timeGreeting);
    
    // Initial message
    setMessage(moodMessages[Math.floor(Math.random() * moodMessages.length)]);

    // Set up message rotation
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setMessage(moodMessages[Math.floor(Math.random() * moodMessages.length)]);
        setIsChanging(false);
      }, 500); // Half of the transition duration
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center space-y-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-2xl text-muted-foreground"
      >
        {greeting}, {name}!
      </motion.h2>
      <AnimatePresence mode="wait">
        <motion.h1
          key={message}
          variants={messageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`text-4xl md:text-5xl font-bold tracking-tight text-gradient ${
            isChanging ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-500`}
        >
          {message}?
        </motion.h1>
      </AnimatePresence>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-lg text-muted-foreground"
      >
        Select your mood and let the music match your emotions
      </motion.p>
    </motion.div>
  );
};
