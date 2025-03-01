
// YouTube Player Service to manage the YouTube IFrame API

// Function to load YouTube IFrame API script
export const loadYouTubeIframeAPI = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    // If the API is already loaded
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // Create the script tag
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Define callback when API is ready
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };
  });
};

// Create YouTube player instance
export const createYouTubePlayer = (
  elementId: string,
  videoId: string,
  onReady?: (event: YT.PlayerEvent) => void,
  onStateChange?: (event: YT.PlayerEvent) => void
): Promise<YT.Player> => {
  return new Promise((resolve) => {
    loadYouTubeIframeAPI().then(() => {
      if (!window.YT) {
        console.error('YouTube IFrame API failed to load');
        return;
      }

      const player = new window.YT.Player(elementId, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event) => {
            if (onReady) onReady(event);
            resolve(player);
          },
          onStateChange: onStateChange
        }
      });
    });
  });
};

// Helper function to format time (seconds to MM:SS)
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
