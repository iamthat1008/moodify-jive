
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  ListMusic
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Song } from "@/types/music";

interface MediaPlayerProps {
  songs: Song[];
  initialSongIndex?: number;
  playlistTitle: string;
  onShowQueue: () => void;
  onClose: () => void;
}

export const MediaPlayer = ({ songs, initialSongIndex = 0, playlistTitle, onShowQueue, onClose }: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [isRepeatOne, setIsRepeatOne] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    // Ensure currentSongIndex is within bounds
    if (currentSongIndex < 0) {
      setCurrentSongIndex(songs.length - 1);
    } else if (currentSongIndex >= songs.length) {
      setCurrentSongIndex(0);
    }
  }, [currentSongIndex, songs.length]);

  const currentSong = songs[currentSongIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => {
      if (isShuffleEnabled) {
        let newIndex = prevIndex;
        while (newIndex === prevIndex) {
          newIndex = Math.floor(Math.random() * songs.length);
        }
        return newIndex;
      } else {
        return (prevIndex + 1) % songs.length;
      }
    });
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => {
      if (isShuffleEnabled) {
        let newIndex = prevIndex;
        while (newIndex === prevIndex) {
          newIndex = Math.floor(Math.random() * songs.length);
        }
        return newIndex;
      } else {
        return (prevIndex - 1 + songs.length) % songs.length;
      }
    });
    setIsPlaying(true);
  };

  const handleShuffle = () => {
    setIsShuffleEnabled(!isShuffleEnabled);
  };

  const handleRepeatClick = () => {
    if (isRepeatEnabled) {
      setIsRepeatEnabled(false);
      setIsRepeatOne(true);
    } else if (isRepeatOne) {
      setIsRepeatOne(false);
    } else {
      setIsRepeatEnabled(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const handleEnded = () => {
    if (isRepeatEnabled) {
      handleNext();
    } else if (isRepeatOne) {
      audioRef.current?.play();
    } else {
      if (currentSongIndex === songs.length - 1) {
        setIsPlaying(false);
      } else {
        handleNext();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-x-0 bottom-0 z-50 p-4 pb-6 sm:p-6"
    >
      <div className="relative mx-auto max-w-4xl">
        <Card className="overflow-hidden border border-border/30 bg-card/80 backdrop-blur-lg shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              {/* Player Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{currentSong?.title}</h3>
                  <p className="text-sm text-muted-foreground">{playlistTitle}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>

              {/* Player Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Album Art */}
                <div className="col-span-1 flex justify-center">
                  <img
                    src={currentSong?.albumArt}
                    alt={currentSong?.title}
                    className="aspect-square w-48 rounded-md object-cover shadow-md"
                  />
                </div>

                {/* Middle section with progress slider */}
                <div className="col-span-1 md:col-span-2 flex flex-col space-y-3">
                  {/* Song Info */}
                  <div className="flex flex-col">
                    <h4 className="text-xl font-semibold">{currentSong?.title}</h4>
                    <p className="text-muted-foreground">{currentSong?.artist}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">
                      {formatTime(progress)}
                    </span>
                    <Slider
                      value={[progress]}
                      max={audioRef.current?.duration || 100}
                      onValueChange={handleSeek}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">
                      {formatTime(audioRef.current?.duration || 0)}
                    </span>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      <Toggle 
                        aria-label="Toggle shuffle"
                        pressed={isShuffleEnabled}
                        onPressedChange={setIsShuffleEnabled}
                        variant="outline"
                        size="sm"
                      >
                        <Shuffle className="h-4 w-4" />
                      </Toggle>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" onClick={handlePrevious}>
                        <SkipBack className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                        {isPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleNext}>
                        <SkipForward className="h-6 w-6" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <Toggle 
                        aria-label="Toggle repeat"
                        pressed={isRepeatEnabled || isRepeatOne}
                        onPressedChange={handleRepeatClick}
                        variant="outline"
                        size="sm"
                      >
                        <Repeat className="h-4 w-4" />
                        {isRepeatOne && <span className="text-xs font-bold absolute">1</span>}
                      </Toggle>
                    </div>
                  </div>
                </div>
              </div>

              {/* Volume Controls */}
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0 text-muted-foreground"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                </svg>
                <Slider
                  defaultValue={[volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={onShowQueue}>
                  <ListMusic className="mr-2 h-4 w-4" />
                  Queue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <audio
        src={currentSong?.audioUrl}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </motion.div>
  );
};
