
import { Song } from "@/types/music";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface MusicQueueProps {
  songs: Song[];
  currentSongIndex: number;
  onSelectSong: (index: number) => void;
  onClose: () => void;
}

export const MusicQueue = ({
  songs,
  currentSongIndex,
  onSelectSong,
  onClose
}: MusicQueueProps) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed inset-y-0 right-0 w-full sm:w-80 z-50 bg-background/95 backdrop-blur-lg shadow-xl border-l flex flex-col"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">Queue</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X size={16} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {songs.map((song, index) => (
          <Card
            key={song.id}
            className={`mb-2 p-2 flex items-center cursor-pointer hover:bg-accent/50 transition-colors ${
              index === currentSongIndex ? "bg-accent" : ""
            }`}
            onClick={() => onSelectSong(index)}
          >
            <img 
              src={song.albumArt} 
              alt={song.title} 
              className="h-10 w-10 rounded object-cover mr-3" 
            />
            <div className="min-w-0 flex-1">
              <p className={`font-medium truncate ${
                index === currentSongIndex ? "text-primary" : ""
              }`}>
                {song.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {song.artist}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
