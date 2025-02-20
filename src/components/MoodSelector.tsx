
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MoodSelectorProps {
  moods: {
    id: string;
    name: string;
    icon: LucideIcon;
    color: string;
  }[];
  onSelect: (moodId: string) => void;
}

export const MoodSelector = ({ moods, onSelect }: MoodSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {moods.map((mood, index) => (
        <motion.button
          key={mood.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(mood.id)}
          className={`${
            mood.color
          } relative overflow-hidden rounded-xl p-6 text-white hover:scale-105 transition-transform duration-200 group`}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="relative flex flex-col items-center space-y-4">
            <mood.icon size={32} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium text-lg">{mood.name}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
