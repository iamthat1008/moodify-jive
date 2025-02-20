
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Smile,
  Frown,
  Flame,
  Focus,
  Moon,
  Rocket,
  Music4,
  LanguagesIcon,
} from "lucide-react";
import { MoodSelector } from "@/components/MoodSelector";
import { PlaylistViewer } from "@/components/PlaylistViewer";
import { LanguageSelector } from "@/components/LanguageSelector";

const moods = [
  { id: "happy", name: "Happy", icon: Smile, color: "bg-yellow-500" },
  { id: "sad", name: "Sad", icon: Frown, color: "bg-blue-500" },
  { id: "energetic", name: "Energetic", icon: Flame, color: "bg-red-500" },
  { id: "focus", name: "Focus", icon: Focus, color: "bg-teal-500" },
  { id: "chill", name: "Chill", icon: Moon, color: "bg-purple-500" },
  { id: "motivational", name: "Motivational", icon: Rocket, color: "bg-amber-500" },
];

const Index = () => {
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

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            How are you feeling today?
          </h1>
          <p className="text-lg text-muted-foreground">
            Select your mood and let the music match your emotions
          </p>
        </div>

        {!selectedMood ? (
          <MoodSelector moods={moods} onSelect={handleMoodSelect} />
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
    </div>
  );
};

export default Index;
