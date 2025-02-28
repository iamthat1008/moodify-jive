
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  isShuffleOn: boolean;
  isRepeatOn: boolean;
}

export const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  duration,
  currentTime,
  onSeek,
  volume,
  onVolumeChange,
  onToggleShuffle,
  onToggleRepeat,
  isShuffleOn,
  isRepeatOn
}: AudioControlsProps) => {
  const [formattedCurrentTime, setFormattedCurrentTime] = useState("0:00");
  const [formattedDuration, setFormattedDuration] = useState("0:00");
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  useEffect(() => {
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    if (isFinite(currentTime)) {
      setFormattedCurrentTime(formatTime(currentTime));
    }
    
    if (isFinite(duration)) {
      setFormattedDuration(formatTime(duration));
    }
  }, [currentTime, duration]);

  const handleVolumeToggle = () => {
    if (isMuted) {
      onVolumeChange(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "hover:bg-primary/5",
            isShuffleOn ? "text-primary" : "text-muted-foreground"
          )}
          onClick={onToggleShuffle}
        >
          <Shuffle size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/5"
          onClick={onPrevClick}
        >
          <SkipBack size={20} />
        </Button>

        <Button
          variant="default"
          size="icon"
          className="rounded-full bg-primary text-primary-foreground h-10 w-10 hover:bg-primary/90"
          onClick={onPlayPauseClick}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/5"
          onClick={onNextClick}
        >
          <SkipForward size={20} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "hover:bg-primary/5",
            isRepeatOn ? "text-primary" : "text-muted-foreground"
          )}
          onClick={onToggleRepeat}
        >
          <Repeat size={18} />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground w-10 text-right">
          {formattedCurrentTime}
        </span>
        <Slider
          defaultValue={[0]}
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={(value) => onSeek(value[0])}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-10">
          {formattedDuration}
        </span>
      </div>

      <div className="flex items-center space-x-2 ml-auto w-32">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/5"
          onClick={handleVolumeToggle}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={16} className="text-muted-foreground" />
          ) : (
            <Volume2 size={16} className="text-muted-foreground" />
          )}
        </Button>
        <Slider
          defaultValue={[volume * 100]}
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={(value) => {
            onVolumeChange(value[0] / 100);
            if (value[0] === 0) {
              setIsMuted(true);
            } else if (isMuted) {
              setIsMuted(false);
            }
          }}
          className="flex-1"
        />
      </div>
    </div>
  );
};
