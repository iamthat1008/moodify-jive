import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { PersonalizedWelcome } from "@/components/PersonalizedWelcome";

const moods = [
  { id: "happy", name: "Happy", icon: Smile, color: "bg-gradient-to-br from-yellow-400 to-amber-500" },
  { id: "sad", name: "Sad", icon: Frown, color: "bg-gradient-to-br from-blue-400 to-blue-600" },
  { id: "energetic", name: "Energetic", icon: Flame, color: "bg-gradient-to-br from-red-400 to-red-600" },
  { id: "focus", name: "Focus", icon: Focus, color: "bg-gradient-to-br from-teal-400 to-teal-600" },
  { id: "chill", name: "Chill", icon: Moon, color: "bg-gradient-to-br from-purple-400 to-purple-600" },
  { id: "motivational", name: "Motivational", icon: Rocket, color: "bg-gradient-to-br from-amber-400 to-amber-600" },
];

const Logo = () => {
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

const Footer = () => {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 flex items-center gap-2 text-sm text-muted-foreground backdrop-blur-sm px-4 py-2 rounded-full bg-background/50 border border-border/50"
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

interface UserData {
  name: string;
  age: number | "";
  country: string;
}

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"hindi" | "english" | "mixed">("english");
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
    setShowOnboarding(false);
    toast({
      title: "Welcome aboard!",
      description: `Great to have you here, ${data.name}!`,
      className: "glass-dark",
    });
  };

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setShowLanguageSelector(true);
    toast({
      title: "Mood Selected",
      description: `You're feeling ${moodId}! Now, choose your preferred language.`,
      className: "glass-dark",
    });
  };

  const handleLanguageSelect = (language: "hindi" | "english" | "mixed") => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
    toast({
      title: "Language Selected",
      description: `Playing ${selectedMood} music in ${language}`,
      className: "glass-dark",
    });
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => {
      setShowIntro(false);
      if (!userData) {
        setShowOnboarding(true);
      }
    }} />;
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center relative bg-gradient-to-br from-background via-background to-muted/20">
        <Logo />
        <OnboardingFlow onComplete={handleOnboardingComplete} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center relative bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto space-y-8"
      >
        <Logo />
        {!selectedMood ? (
          <>
            {userData && <PersonalizedWelcome name={userData.name} />}
            <MoodSelector moods={moods} onSelect={handleMoodSelect} />
          </>
        ) : showLanguageSelector ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedMood(null);
                setShowLanguageSelector(false);
              }}
              className="hover:scale-105 transition-transform glass"
            >
              ← Back to moods
            </Button>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                In which language would you like to listen?
              </h2>
              <p className="text-muted-foreground">Choose your preferred language for music</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <LanguageSelector
                value={selectedLanguage}
                onChange={handleLanguageSelect}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedMood(null);
                  setShowLanguageSelector(false);
                }}
                className="hover:scale-105 transition-transform glass"
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
