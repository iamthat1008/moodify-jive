
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MoodType {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

interface MoodSelectorProps {
  moods: MoodType[];
  onSelect: (moodId: string) => void;
}

export const MoodSelector = ({ moods, onSelect }: MoodSelectorProps) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold">How are you feeling today?</h2>
        <p className="text-muted-foreground">Select a mood to discover music that matches your vibe</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {moods.map((mood) => (
          <motion.div
            key={mood.id}
            className={cn(
              "cursor-pointer transition-all relative overflow-hidden rounded-xl",
              hoveredMood === mood.id ? "scale-105 shadow-lg" : "scale-100"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredMood(mood.id)}
            onHoverEnd={() => setHoveredMood(null)}
            onClick={() => onSelect(mood.id)}
            // Use aria-disabled instead of disabled for divs
            aria-disabled={false}
          >
            <Card className={cn(
              "aspect-square flex flex-col items-center justify-center p-6 relative overflow-hidden border-2 transition-colors",
              hoveredMood === mood.id ? "border-primary" : "border-transparent"
            )}>
              <div className={cn(
                "absolute inset-0 opacity-10 z-0 transition-opacity",
                hoveredMood === mood.id ? "opacity-20" : "opacity-10"
              )}
                style={{ backgroundColor: mood.color }}
              />
              
              <span className="text-4xl mb-4" role="img" aria-label={mood.name}>
                {mood.icon}
              </span>
              <h3 className="font-semibold text-lg">{mood.name}</h3>
              
              {hoveredMood === mood.id && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-center mt-2 text-muted-foreground"
                >
                  {mood.description}
                </motion.p>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
