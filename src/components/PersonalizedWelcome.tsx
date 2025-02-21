
import { motion } from "framer-motion";
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

  useEffect(() => {
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    
    if (hour >= 5 && hour < 12) timeGreeting = "Good morning";
    else if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    setGreeting(timeGreeting);
    setMessage(moodMessages[Math.floor(Math.random() * moodMessages.length)]);
  }, []);

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
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-4xl md:text-5xl font-bold tracking-tight text-gradient"
      >
        {message}?
      </motion.h1>
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
