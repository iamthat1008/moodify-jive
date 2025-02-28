import { useState, useRef, useEffect } from "react";
import { Song } from "@/types/music";
import { AudioControls } from "./AudioControls";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ListMusic, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface MediaPlayerProps {
  songs: Song[];
  initialSongIndex?: number;
  playlistTitle: string;
  onClose?: () => void;
  onShowQueue?: () => void;
}

export const MediaPlayer = ({
  songs,
  initialSongIndex = 0,
  playlistTitle,
  onClose,
  onShowQueue
}: MediaPlayerProps) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { toast } = useToast();

  const currentSong = songs[currentSongIndex];
  
  const isEmbedSong = currentSong?.isEmbed || currentSong?.audioUrl?.includes('/preview');

  useEffect(() => {
    if (!isEmbedSong && audioRef.current) {
      const audio = audioRef.current;
      
      const setAudioData = () => {
        setDuration(audio.duration);
      };
      
      const setAudioTime = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleEnded = () => {
        if (isRepeatOn) {
          audio.currentTime = 0;
          audio.play();
        } else {
          handleNext();
        }
      };

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', handleEnded);
      
      audio.volume = volume;
      
      if (isPlaying) {
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Playback Error",
            description: "There was an error playing this track. Please try again.",
            variant: "destructive"
          });
          setIsPlaying(false);
        });
      }
      
      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex, isPlaying, volume, isRepeatOn, toast, isEmbedSong]);

  const handlePlayPause = () => {
    if (isEmbedSong) {
      setIsPlaying(!isPlaying);
      toast({
        title: isPlaying ? "Paused" : "Playing",
        description: "Embedded players may need manual control in the iframe",
      });
      return;
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Playback Error",
            description: "There was an error playing this track. Please try again.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    if (!isEmbedSong && audioRef.current && currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      const newIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
      setCurrentSongIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (isShuffleOn) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * songs.length);
      } while (newIndex === currentSongIndex && songs.length > 1);
      setCurrentSongIndex(newIndex);
    } else {
      const newIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(newIndex);
    }
  };

  const handleSeek = (time: number) => {
    if (!isEmbedSong && audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    } else {
      toast({
        title: "Seek Not Available",
        description: "Seeking is not available for embedded content",
      });
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!isEmbedSong && audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
    toast({
      title: !isShuffleOn ? "Shuffle On" : "Shuffle Off",
      description: !isShuffleOn ? "Songs will play in random order" : "Songs will play in sequential order",
    });
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
    toast({
      title: !isRepeatOn ? "Repeat On" : "Repeat Off",
      description: !isRepeatOn ? "Current song will repeat" : "Playback will continue to next song",
    });
  };

  if (!currentSong) {
    return <div>No songs available</div>;
  }

  return (
    <>
      {!isEmbedSong && (
        <audio 
          ref={audioRef} 
          src={currentSong.audioUrl}
          preload="metadata" 
        />
      )}

      <AnimatePresence>
        {isMinimized ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50"
          >
            <Card className="p-3 flex items-center justify-between backdrop-blur-lg bg-background/80 border shadow-lg">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <img 
                  src={currentSong.albumArt} 
                  alt={currentSong.title} 
                  className="h-10 w-10 rounded object-cover mr-3" 
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{currentSong.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handlePlayPause}
                  className="h-8 w-8"
                >
                  {isPlaying ? (
                    <Pause size={18} />
                  ) : (
                    <Play size={18} />
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMinimized(false)}
                  className="h-8 w-8"
                >
                  <ChevronDown size={18} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={cn(
              "fixed inset-0 z-50 flex flex-col",
              "backdrop-blur-lg bg-background/95"
            )}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Badge variant="outline" className="font-normal">
                {playlistTitle}
              </Badge>
              <div className="flex space-x-1">
                {onShowQueue && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onShowQueue}
                    className="h-8 w-8"
                  >
                    <ListMusic size={18} />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8"
                >
                  <ChevronDown size={18} />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6 overflow-hidden">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square w-full max-w-[300px] mx-auto shadow-xl rounded-md overflow-hidden"
              >
                <img 
                  src={currentSong.albumArt} 
                  alt={currentSong.title} 
                  className="w-full h-full object-cover"
                />
                {isEmbedSong && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <iframe
                      ref={iframeRef}
                      src={currentSong.audioUrl}
                      width="100%"
                      height="100%"
                      allow="autoplay"
                      className="absolute opacity-0"
                      style={{ pointerEvents: isPlaying ? 'auto' : 'none' }}
                    />
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Button
                          onClick={handlePlayPause}
                          size="icon"
                          className="h-16 w-16 rounded-full"
                        >
                          <Play size={32} />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
              
              <div className="text-center w-full max-w-xs">
                <h2 className="text-xl font-bold truncate">{currentSong.title}</h2>
                <p className="text-muted-foreground truncate">{currentSong.artist}</p>
              </div>
            </div>
            
            <div className="p-6 bg-background/80 border-t">
              <AudioControls
                isPlaying={isPlaying}
                onPlayPauseClick={handlePlayPause}
                onPrevClick={handlePrev}
                onNextClick={handleNext}
                duration={duration}
                currentTime={currentTime}
                onSeek={handleSeek}
                volume={volume}
                onVolumeChange={handleVolumeChange}
                onToggleShuffle={toggleShuffle}
                onToggleRepeat={toggleRepeat}
                isShuffleOn={isShuffleOn}
                isRepeatOn={isRepeatOn}
                disableSeek={isEmbedSong}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
