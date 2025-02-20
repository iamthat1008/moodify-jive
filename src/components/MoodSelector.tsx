
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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {moods.map((mood) => (
        <motion.button
          key={mood.id}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(mood.id)}
          className={`${
            mood.color
          } relative overflow-hidden rounded-xl p-6 text-white transition-colors duration-200 group`}
        >
          <motion.div
            className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"
            initial={false}
            animate={{ opacity: 1 }}
          />
          <div className="relative flex flex-col items-center space-y-4">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <mood.icon size={32} />
            </motion.div>
            <span className="font-medium text-lg">{mood.name}</span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};
