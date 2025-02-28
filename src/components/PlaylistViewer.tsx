
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { playlists } from "@/data/playlists";
import { MediaPlayer } from "@/components/MusicPlayer/MediaPlayer";
import { MusicQueue } from "@/components/MusicPlayer/MusicQueue";
import { PlayCircle, ListMusic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PlaylistViewerProps {
  mood: string;
  language: "hindi" | "english" | "mixed";
}

export const PlaylistViewer = ({ mood, language }: PlaylistViewerProps) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  const playlist = playlists[mood as keyof typeof playlists]?.[language];
  
  if (!playlist) {
    return (
      <Card className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl bg-card flex items-center justify-center">
        <p className="text-muted-foreground">Playlist not found</p>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl bg-card p-6 flex flex-col relative">
        <div className="absolute inset-0 z-0">
          <img 
            src={playlist.songs[0]?.albumArt || ""} 
            alt={playlist.name}
            className="w-full h-full object-cover opacity-25 blur-2xl"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-lg" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4 flex justify-between items-start">
            <div>
              <Badge variant="outline" className="mb-2">{mood}</Badge>
              <h2 className="text-2xl font-bold">{playlist.name}</h2>
              <p className="text-muted-foreground">{playlist.description}</p>
            </div>

            <Button 
              onClick={() => {
                setIsPlayerOpen(true);
                setCurrentSongIndex(0);
              }}
              className="rounded-full"
              size="icon"
            >
              <PlayCircle size={24} />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto flex-1 pr-2">
            {playlist.songs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Card 
                  className="p-2 flex items-center hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setIsPlayerOpen(true);
                  }}
                >
                  <img 
                    src={song.albumArt} 
                    alt={song.title} 
                    className="h-12 w-12 rounded object-cover mr-3" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {isPlayerOpen && (
          <MediaPlayer 
            songs={playlist.songs}
            initialSongIndex={currentSongIndex}
            playlistTitle={playlist.name}
            onShowQueue={() => setIsQueueOpen(true)}
          />
        )}

        {isQueueOpen && (
          <MusicQueue 
            songs={playlist.songs}
            currentSongIndex={currentSongIndex}
            onSelectSong={(index) => {
              setCurrentSongIndex(index);
              setIsQueueOpen(false);
            }}
            onClose={() => setIsQueueOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
