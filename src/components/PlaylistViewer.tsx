
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { playlists } from "@/data/playlists";
import { MediaPlayer } from "@/components/MusicPlayer/MediaPlayer";
import { MusicQueue } from "@/components/MusicPlayer/MusicQueue";
import { PlayCircle, ListMusic, Grid, List, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getPlaylistById } from "@/services/ytMusicService";
import { getYouTubeMusicPlaylistId } from "@/config/youtubeMusic";
import { Playlist } from "@/types/music";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PlaylistViewerProps {
  mood: string;
  language: "hindi" | "english" | "mixed";
}

export const PlaylistViewer = ({ mood, language }: PlaylistViewerProps) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [useYouTubeMusic, setUseYouTubeMusic] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Get the local playlist
  const localPlaylist = playlists[mood as keyof typeof playlists]?.[language];
  
  // Fetch YouTube Music playlist
  const fetchYouTubeMusicPlaylist = async () => {
    const playlistId = getYouTubeMusicPlaylistId(mood, language);
    if (!playlistId) {
      toast({
        title: "Playlist not available",
        description: `No YouTube Music playlist found for ${mood} mood in ${language} language.`,
        variant: "destructive"
      });
      return null;
    }
    
    setIsLoading(true);
    try {
      const ytPlaylist = await getPlaylistById(playlistId);
      if (ytPlaylist) {
        ytPlaylist.source = "youtube";
        return ytPlaylist;
      }
      return null;
    } catch (error) {
      console.error("Error fetching YouTube Music playlist:", error);
      toast({
        title: "Error",
        description: "Failed to fetch YouTube Music playlist. Using local playlist instead.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load the appropriate playlist based on the source selection
  useEffect(() => {
    const loadPlaylist = async () => {
      if (useYouTubeMusic) {
        const ytPlaylist = await fetchYouTubeMusicPlaylist();
        if (ytPlaylist) {
          setPlaylist(ytPlaylist);
        } else {
          // Fall back to local playlist if YouTube Music playlist isn't available
          setPlaylist(localPlaylist);
          setUseYouTubeMusic(false);
        }
      } else {
        setPlaylist(localPlaylist);
      }
    };
    
    loadPlaylist();
  }, [mood, language, useYouTubeMusic]);
  
  if (!playlist) {
    return (
      <Card className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl bg-card flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <RefreshCcw className="animate-spin h-8 w-8 text-primary" />
            <p className="text-muted-foreground">Loading playlist...</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Playlist not found</p>
        )}
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
              
              <div className="flex items-center mt-2 space-x-2">
                <Switch
                  id="use-youtube"
                  checked={useYouTubeMusic}
                  onCheckedChange={setUseYouTubeMusic}
                />
                <Label htmlFor="use-youtube">
                  {useYouTubeMusic ? "Using YouTube Music" : "Using Local Playlist"}
                </Label>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ToggleGroup type="single" value={viewType} onValueChange={(value) => {
                if (value) setViewType(value as "list" | "grid");
              }}>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
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
          </div>

          {viewType === "list" ? (
            <div className="grid grid-cols-1 gap-3 overflow-y-auto flex-1 pr-2">
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSongIndex(index);
                        setIsPlayerOpen(true);
                      }}
                    >
                      <PlayCircle size={18} />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto flex-1 pr-2">
              {playlist.songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col"
                >
                  <Card 
                    className="aspect-square overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setCurrentSongIndex(index);
                      setIsPlayerOpen(true);
                    }}
                  >
                    <div className="relative h-full">
                      <img 
                        src={song.albumArt} 
                        alt={song.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white h-12 w-12 rounded-full bg-black/30"
                        >
                          <PlayCircle size={24} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <div className="mt-2 text-center">
                    <p className="font-medium truncate text-sm">{song.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <AnimatePresence>
        {isPlayerOpen && playlist && (
          <MediaPlayer 
            songs={playlist.songs}
            initialSongIndex={currentSongIndex}
            playlistTitle={playlist.name}
            onShowQueue={() => setIsQueueOpen(true)}
          />
        )}

        {isQueueOpen && playlist && (
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
