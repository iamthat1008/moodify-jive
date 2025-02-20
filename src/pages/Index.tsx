
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Smile,
  Frown,
  Flame,
  Focus,
  Moon,
  Rocket,
  Heart,
} from "lucide-react";
import { MoodSelector } from "@/components/MoodSelector";
import { PlaylistViewer } from "@/components/PlaylistViewer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { IntroAnimation } from "@/components/IntroAnimation";
import { WelcomeMessage } from "@/components/WelcomeMessage";

const moods = [
  { id: "happy", name: "Happy", icon: Smile, color: "bg-yellow-500" },
  { id: "sad", name: "Sad", icon: Frown, color: "bg-blue-500" },
  { id: "energetic", name: "Energetic", icon: Flame, color: "bg-red-500" },
  { id: "focus", name: "Focus", icon: Focus, color: "bg-teal-500" },
  { id: "chill", name: "Chill", icon: Moon, color: "bg-purple-500" },
  { id: "motivational", name: "Motivational", icon: Rocket, color: "bg-amber-500" },
];

const Footer = () => {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 flex items-center gap-2 text-sm text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
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

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"hindi" | "english" | "mixed">("english");
  const { toast } = useToast();

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    toast({
      title: "Mood Selected",
      description: `Playing ${moodId} music for you`,
    });
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto space-y-8"
      >
        {!selectedMood ? (
          <>
            <WelcomeMessage />
            <MoodSelector moods={moods} onSelect={handleMoodSelect} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => setSelectedMood(null)}
                className="hover:scale-105 transition-transform"
              >
                ← Back to moods
              </Button>
              <LanguageSelector
                value={selectedLanguage}
                onChange={setSelectedLanguage}
              />
            </div>
            <PlaylistViewer mood={selectedMood} language={selectedLanguage} />
          </motion.div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Index;
