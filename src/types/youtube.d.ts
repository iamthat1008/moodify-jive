
// Type definitions for YouTube IFrame API
interface YT {
  Player: {
    new(
      elementId: string,
      options: {
        height?: string | number;
        width?: string | number;
        videoId?: string;
        playerVars?: {
          autoplay?: 0 | 1;
          controls?: 0 | 1;
          disablekb?: 0 | 1;
          enablejsapi?: 0 | 1;
          fs?: 0 | 1;
          iv_load_policy?: 1 | 3;
          modestbranding?: 0 | 1;
          playsinline?: 0 | 1;
          rel?: 0 | 1;
          showinfo?: 0 | 1;
          start?: number;
          origin?: string;
        };
        events?: {
          onReady?: (event: YT.PlayerEvent) => void;
          onStateChange?: (event: YT.PlayerEvent) => void;
          onPlaybackQualityChange?: (event: YT.PlayerEvent) => void;
          onPlaybackRateChange?: (event: YT.PlayerEvent) => void;
          onError?: (event: YT.PlayerEvent) => void;
          onApiChange?: (event: YT.PlayerEvent) => void;
        };
      }
    ): YT.Player;
  };
  PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };
}

namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;
    getPlayerState(): number;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoUrl(): string;
    getVideoData(): { video_id: string; author: string; title: string };
    getVolume(): number;
    setVolume(volume: number): void;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setSize(width: number, height: number): object;
    getPlaybackRate(): number;
    setPlaybackRate(suggestedRate: number): void;
    getAvailablePlaybackRates(): number[];
    getPlaybackQuality(): string;
    setPlaybackQuality(suggestedQuality: string): void;
    getAvailableQualityLevels(): string[];
    getCurrentTime(): number;
    getDuration(): number;
    addEventListener(event: string, listener: (event: PlayerEvent) => void): void;
    removeEventListener(event: string, listener: (event: PlayerEvent) => void): void;
    destroy(): void;
    cueVideoById(videoId: string, startSeconds?: number): void;
    loadVideoById(videoId: string, startSeconds?: number): void;
  }

  interface PlayerEvent {
    target: Player;
    data: any;
  }
}

interface Window {
  YT?: YT;
  onYouTubeIframeAPIReady?: () => void;
}
