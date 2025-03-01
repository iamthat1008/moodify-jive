
import { useState, useRef, useEffect } from "react";
import { Song } from "@/types/music";
import { AudioControls } from "./AudioControls";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ListMusic, Play, Pause, X } from "lucide-react";
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
  const ytPlayerRef = useRef<any>(null);
  const { toast } = useToast();

  const currentSong = songs[currentSongIndex];
  
  // All YouTube Music content is treated as embedded
  const isEmbedSong = true;

  // Initialize YouTube player
  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT && !document.getElementById('youtube-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // When YouTube IFrame API is ready
    const onYouTubeIframeAPIReady = () => {
      if (!currentSong?.videoId) return;
      
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
      }
      
      // Extract video ID from URL if it's a full URL
      let videoId = currentSong.videoId;
      if (!videoId && currentSong.audioUrl) {
        const match = currentSong.audioUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (match) {
          videoId = match[1];
        }
      }
      
      if (!videoId) {
        console.error("No video ID found for song:", currentSong);
        return;
      }
      
      // Create YouTube player
      ytPlayerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
    };

    // Handle player ready event
    const onPlayerReady = (event: any) => {
      event.target.setVolume(volume * 100);
      if (isPlaying) {
        event.target.playVideo();
      }
      setDuration(event.target.getDuration());
    };

    // Handle player state changes
    const onPlayerStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        if (isRepeatOn) {
          event.target.seekTo(0);
          event.target.playVideo();
        } else {
          handleNext();
        }
      }
      
      if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        // Start time updater
        startTimeUpdater();
      } else if (event.data === window.YT.PlayerState.PAUSED) {
        setIsPlaying(false);
        // Stop time updater
        stopTimeUpdater();
      }
    };

    // Handle player errors
    const onPlayerError = (event: any) => {
      console.error("YouTube Player Error:", event.data);
      toast({
        title: "Playback Error",
        description: "There was an error playing this track. Please try another song.",
        variant: "destructive"
      });
    };

    // Set up YouTube API ready callback
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // If YouTube API is already loaded, initialize player directly
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    }

    return () => {
      // Clean up YouTube player
      if (ytPlayerRef.current) {
        ytPlayerRef.current.destroy();
      }
      
      // Clean up time updater
      stopTimeUpdater();
    };
  }, [currentSong, isPlaying, volume, isRepeatOn, toast]);

  // Time updater for YouTube player
  const timeUpdaterRef = useRef<number | null>(null);
  
  const startTimeUpdater = () => {
    stopTimeUpdater();
    timeUpdaterRef.current = window.setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
        setCurrentTime(ytPlayerRef.current.getCurrentTime());
      }
    }, 1000);
  };
  
  const stopTimeUpdater = () => {
    if (timeUpdaterRef.current) {
      window.clearInterval(timeUpdaterRef.current);
      timeUpdaterRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (ytPlayerRef.current) {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    }
    // setIsPlaying is handled by onPlayerStateChange
  };

  const handlePrev = () => {
    if (ytPlayerRef.current && currentTime > 3) {
      ytPlayerRef.current.seekTo(0);
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
    if (ytPlayerRef.current) {
      ytPlayerRef.current.seekTo(time);
      setCurrentTime(time);
    } else {
      toast({
        title: "Seek Not Available",
        description: "Seeking is not available for this content",
      });
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (ytPlayerRef.current) {
      ytPlayerRef.current.setVolume(newVolume * 100);
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
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="font-normal">
                  {playlistTitle}
                </Badge>
                <Badge variant="secondary">YouTube Music</Badge>
              </div>
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
                {onClose && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="h-8 w-8"
                  >
                    <X size={18} />
                  </Button>
                )}
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
                <div className="absolute inset-0">
                  <div id="youtube-player" className="absolute top-0 left-0 w-full h-full opacity-0"></div>
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
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
                disableSeek={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
