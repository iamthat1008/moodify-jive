
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  ListMusic, X, Repeat, Repeat1, Shuffle 
} from "lucide-react";
import { AudioControls } from "./AudioControls";
import { createYouTubePlayer, formatDuration } from "@/services/youtubePlayerService";

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
  duration: number;
  isEmbed?: boolean;
  videoId?: string;
}

interface MediaPlayerProps {
  songs: Song[];
  initialSongIndex: number;
  playlistTitle: string;
  onShowQueue: () => void;
  onClose: () => void;
}

export const MediaPlayer = ({
  songs,
  initialSongIndex,
  playlistTitle,
  onShowQueue,
  onClose,
}: MediaPlayerProps) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
  const [isRepeatOne, setIsRepeatOne] = useState(false);
  
  const youtubePlayerRef = useRef<YT.Player | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<number | null>(null);
  
  const currentSong = songs[currentSongIndex];
  const isYouTube = !!currentSong?.videoId;

  // Create/update YouTube player when song changes
  useEffect(() => {
    if (isYouTube && currentSong.videoId) {
      // Clear any existing interval
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }

      // Initialize YouTube player
      const initPlayer = async () => {
        if (playerContainerRef.current) {
          // Remove any existing player
          while (playerContainerRef.current.firstChild) {
            playerContainerRef.current.removeChild(playerContainerRef.current.firstChild);
          }

          // Create a new div for the player
          const playerElement = document.createElement('div');
          playerElement.id = 'youtube-player';
          playerContainerRef.current.appendChild(playerElement);

          // Create YouTube player
          const player = await createYouTubePlayer(
            'youtube-player',
            currentSong.videoId || '',
            (event) => {
              // onReady
              youtubePlayerRef.current = event.target;
              setDuration(event.target.getDuration());
              if (isPlaying) event.target.playVideo();
              
              // Start progress tracking
              progressInterval.current = window.setInterval(() => {
                if (youtubePlayerRef.current) {
                  const currentTime = youtubePlayerRef.current.getCurrentTime();
                  const videoDuration = youtubePlayerRef.current.getDuration();
                  setProgress(currentTime);
                  setDuration(videoDuration);
                }
              }, 1000);
            },
            (event) => {
              // onStateChange
              if (event.data === window.YT?.PlayerState.ENDED) {
                handleSongEnd();
              } else if (event.data === window.YT?.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT?.PlayerState.PAUSED) {
                setIsPlaying(false);
              }
            }
          );
        }
      };

      initPlayer();
    }

    // Cleanup
    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, [currentSong, isYouTube]);

  // Handle volume change
  useEffect(() => {
    if (youtubePlayerRef.current) {
      if (isMuted) {
        youtubePlayerRef.current.mute();
      } else {
        youtubePlayerRef.current.unMute();
        youtubePlayerRef.current.setVolume(volume);
      }
    }
  }, [volume, isMuted]);

  // Handle song end
  const handleSongEnd = () => {
    if (isRepeatOne) {
      // Replay the same song
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.seekTo(0, true);
        youtubePlayerRef.current.playVideo();
      }
    } else if (isShuffleEnabled) {
      // Play random song
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(randomIndex);
    } else if (currentSongIndex < songs.length - 1) {
      // Play next song
      setCurrentSongIndex(prev => prev + 1);
    } else if (isRepeatEnabled) {
      // Start playlist over
      setCurrentSongIndex(0);
    } else {
      // Stop playback
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (youtubePlayerRef.current) {
      if (isPlaying) {
        youtubePlayerRef.current.pauseVideo();
      } else {
        youtubePlayerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    } else if (isRepeatEnabled) {
      setCurrentSongIndex(0);
    }
  };

  const handleProgressChange = (value: number[]) => {
    const newPosition = value[0];
    setProgress(newPosition);
    
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(newPosition, true);
    }
  };

  const handleRepeatClick = () => {
    if (!isRepeatEnabled && !isRepeatOne) {
      setIsRepeatEnabled(true);
      setIsRepeatOne(false);
    } else if (isRepeatEnabled && !isRepeatOne) {
      setIsRepeatEnabled(false);
      setIsRepeatOne(true);
    } else {
      setIsRepeatEnabled(false);
      setIsRepeatOne(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <Card className="w-full max-w-4xl mx-auto bg-card/80 backdrop-blur border shadow-xl">
        <div className="flex flex-col md:flex-row p-4 gap-4">
          {/* Album Art and Player Container */}
          <div className="flex md:w-1/3">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded overflow-hidden flex-shrink-0 mr-4">
              <img src={currentSong.albumArt} alt={currentSong.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center flex-grow min-w-0">
              <h3 className="font-medium text-sm md:text-base truncate">{currentSong.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground truncate">{currentSong.artist}</p>
              <p className="text-xs text-muted-foreground mt-1">{playlistTitle}</p>
            </div>
          </div>

          {/* YouTube Player (hidden) */}
          <div 
            ref={playerContainerRef} 
            className="absolute left-0 top-0 opacity-0 pointer-events-none" 
            style={{ width: '1px', height: '1px', overflow: 'hidden' }}
          />

          {/* Controls */}
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <Toggle
                aria-label="Toggle shuffle"
                pressed={isShuffleEnabled}
                onPressedChange={setIsShuffleEnabled}
                variant="ghost"
                size="sm"
              >
                <Shuffle className="h-4 w-4" />
              </Toggle>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrevious} 
                disabled={currentSongIndex === 0}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="default" 
                size="icon" 
                className="rounded-full h-12 w-12 shadow-sm"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNext} 
                disabled={currentSongIndex === songs.length - 1 && !isRepeatEnabled}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <Toggle
                aria-label="Toggle repeat"
                pressed={isRepeatEnabled || isRepeatOne}
                onPressedChange={handleRepeatClick}
                variant="ghost"
                size="sm"
              >
                {isRepeatOne ? (
                  <Repeat1 className="h-4 w-4" />
                ) : (
                  <Repeat className="h-4 w-4" />
                )}
              </Toggle>
            </div>
            
            <div className="flex items-center gap-2 px-2">
              <span className="text-xs text-muted-foreground">
                {formatDuration(progress)}
              </span>
              <Slider
                className="flex-1"
                value={[progress]}
                max={duration}
                step={1}
                onValueChange={handleProgressChange}
              />
              <span className="text-xs text-muted-foreground">
                {formatDuration(duration)}
              </span>
            </div>
          </div>
          
          {/* Volume and Queue */}
          <div className="flex items-center gap-2 md:gap-4 md:w-1/6 justify-end">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                className="w-20 hidden md:flex"
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={(value) => {
                  setVolume(value[0]);
                  if (value[0] > 0) setIsMuted(false);
                }}
              />
            </div>
            
            <Button variant="ghost" size="icon" onClick={onShowQueue}>
              <ListMusic className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
