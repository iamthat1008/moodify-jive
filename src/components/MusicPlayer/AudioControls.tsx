
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  isShuffleOn: boolean;
  isRepeatOn: boolean;
  disableSeek?: boolean;
}

export const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  onToggleShuffle,
  onToggleRepeat,
  isShuffleOn,
  isRepeatOn,
  disableSeek = false
}: AudioControlsProps) => {
  const handleTimeChange = (values: number[]) => {
    onSeek(values[0]);
  };

  const handleVolumeChange = (values: number[]) => {
    onVolumeChange(values[0]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <div className="w-12 text-right">{formatTime(currentTime)}</div>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 1}
          step={1}
          onValueChange={handleTimeChange}
          className={cn("flex-1", disableSeek && "opacity-50 cursor-not-allowed")}
          disabled={disableSeek}
        />
        <div className="w-12">{formatTime(duration || 0)}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleShuffle}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isShuffleOn && "text-primary hover:text-primary"
            )}
          >
            <Shuffle size={18} />
          </Button>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevClick}
          >
            <SkipBack size={22} />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={onPlayPauseClick}
          >
            {isPlaying ? (
              <Pause size={22} />
            ) : (
              <Play size={22} className="ml-0.5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNextClick}
          >
            <SkipForward size={22} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleRepeat}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isRepeatOn && "text-primary hover:text-primary"
            )}
          >
            <Repeat size={18} />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => onVolumeChange(0)}>
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        <Slider
          value={[volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};
