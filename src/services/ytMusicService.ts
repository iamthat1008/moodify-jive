
import { YTMusic } from "@codyduong/ytmusicapi";
import { Playlist, Song, MoodPlaylistMap } from "@/types/music";

// Initialize YTMusic API client
const ytmusic = new YTMusic();

// Cache for mood categories to avoid redundant API calls
let moodCategoriesCache: any[] = [];
let playlistsCache: Record<string, Record<string, any[]>> = {};

/**
 * Fetch available mood categories from YouTube Music
 */
export const fetchMoodCategories = async (): Promise<string[]> => {
  try {
    if (moodCategoriesCache.length) {
      return moodCategoriesCache.map(category => category.params);
    }
    
    // If we don't have real mood categories yet, return our predefined moods
    // In a real implementation, we would use: const categories = await ytmusic.getMoodCategories();
    const categories = [
      { title: "Happy", params: "happy" },
      { title: "Sad", params: "sad" },
      { title: "Calm", params: "calm" },
      { title: "Energetic", params: "energetic" },
      { title: "Romantic", params: "romantic" }
    ];
    
    moodCategoriesCache = categories;
    return categories.map(category => category.params);
  } catch (error) {
    console.error("Error fetching mood categories:", error);
    return ["happy", "sad", "calm", "energetic", "romantic"];
  }
};

/**
 * Fetch playlists for a specific mood and language
 */
export const fetchMoodPlaylists = async (
  mood: string,
  language: "hindi" | "english" | "mixed"
): Promise<Playlist> => {
  try {
    // Check cache first
    if (playlistsCache[mood]?.[language]) {
      return convertToPlaylist(playlistsCache[mood][language][0], mood);
    }

    // In a real implementation, we would use:
    // const playlists = await ytmusic.getMoodPlaylists(mood);
    // For now, we'll simulate the API call with sample data
    
    // Simulated API call based on mood and language
    const playlistTitle = `${mood.charAt(0).toUpperCase() + mood.slice(1)} ${language.charAt(0).toUpperCase() + language.slice(1)} Music`;
    const simulatedResponse = await simulatePlaylistFetch(mood, language);
    
    // Cache the result
    if (!playlistsCache[mood]) {
      playlistsCache[mood] = {};
    }
    playlistsCache[mood][language] = [simulatedResponse];
    
    return convertToPlaylist(simulatedResponse, mood);
  } catch (error) {
    console.error(`Error fetching ${mood} playlists for ${language}:`, error);
    return {
      id: `${mood}-${language}-fallback`,
      name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Music (Fallback)`,
      description: "Couldn't fetch playlists. Showing fallback content.",
      coverImage: "https://source.unsplash.com/random/800x600/?music",
      songs: []
    };
  }
};

/**
 * Search for songs, artists, or albums on YouTube Music
 */
export const searchMusic = async (query: string, type: "song" | "artist" | "album" = "song") => {
  try {
    // In a real implementation, we would use:
    // const results = await ytmusic.search(query, type);
    // return results;
    
    // For now, return simulated search results
    return simulateSearchResults(query, type);
  } catch (error) {
    console.error("Error searching music:", error);
    return [];
  }
};

/**
 * Get song details including streaming URL
 */
export const getSongDetails = async (videoId: string): Promise<any> => {
  try {
    // In a real implementation, we would use:
    // const song = await ytmusic.getSong(videoId);
    // return song;
    
    // For now, return simulated song details
    return {
      videoId,
      title: "Sample Song",
      artist: "Sample Artist",
      album: "Sample Album",
      thumbnails: [{ url: `https://source.unsplash.com/random/300x300/?music,${videoId}` }],
      streamingData: {
        adaptiveFormats: [
          { url: `https://www.youtube.com/watch?v=${videoId}` }
        ]
      }
    };
  } catch (error) {
    console.error("Error fetching song details:", error);
    return null;
  }
};

// Helper function to convert YT Music playlist to our app's format
const convertToPlaylist = (ytPlaylist: any, mood: string): Playlist => {
  const songs: Song[] = ytPlaylist.tracks.map((track: any, index: number) => ({
    id: track.videoId || `${mood}-${index}`,
    title: track.title,
    artist: track.artists.map((a: any) => a.name).join(", "),
    albumArt: track.thumbnails[track.thumbnails.length - 1].url,
    audioUrl: `https://www.youtube.com/watch?v=${track.videoId}`,
    duration: track.duration_seconds || 240,
    isEmbed: true,
    videoId: track.videoId
  }));

  return {
    id: ytPlaylist.playlistId || `${mood}-playlist`,
    name: ytPlaylist.title,
    description: ytPlaylist.description || `A collection of ${mood} music`,
    coverImage: ytPlaylist.thumbnails[ytPlaylist.thumbnails.length - 1].url,
    songs
  };
};

// Simulated API responses for development
const simulatePlaylistFetch = async (mood: string, language: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const trackCount = 10;
  const tracks = Array.from({ length: trackCount }, (_, i) => {
    const videoId = `${mood}-${language}-${i}`.split('').map(c => c.charCodeAt(0)).reduce((a, b) => a + b, 0).toString(16);
    return {
      videoId,
      title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} ${language} Song ${i + 1}`,
      artists: [{ name: `Artist ${i + 1}` }],
      album: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Album`,
      thumbnails: [
        { url: `https://source.unsplash.com/random/300x300/?music,${mood},${i}` }
      ],
      duration_seconds: 180 + Math.floor(Math.random() * 180)
    };
  });

  return {
    playlistId: `${mood}-${language}-playlist`,
    title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} ${language.charAt(0).toUpperCase() + language.slice(1)} Music`,
    description: `A collection of ${mood} music in ${language}`,
    thumbnails: [
      { url: `https://source.unsplash.com/random/800x600/?${mood},music` }
    ],
    tracks
  };
};

const simulateSearchResults = (query: string, type: string) => {
  const resultCount = 5;
  return Array.from({ length: resultCount }, (_, i) => {
    const videoId = `search-${query}-${i}`.split('').map(c => c.charCodeAt(0)).reduce((a, b) => a + b, 0).toString(16);
    return {
      videoId,
      title: `${query} Result ${i + 1}`,
      artists: [{ name: "Search Artist" }],
      thumbnails: [
        { url: `https://source.unsplash.com/random/300x300/?music,${query},${i}` }
      ],
      duration_seconds: 180 + Math.floor(Math.random() * 180)
    };
  });
};

// Function to get all playlists for all moods and languages
export const getAllPlaylists = async (): Promise<MoodPlaylistMap> => {
  const moods = await fetchMoodCategories();
  const languages = ["hindi", "english", "mixed"] as const;
  
  const playlistMap: MoodPlaylistMap = {};
  
  // Create an array of promises for all mood+language combinations
  const promises = moods.map(async (mood) => {
    playlistMap[mood] = {} as Record<string, Playlist>;
    
    // For each mood, fetch playlists for all languages
    const languagePromises = languages.map(async (language) => {
      const playlist = await fetchMoodPlaylists(mood, language);
      playlistMap[mood][language] = playlist;
    });
    
    await Promise.all(languagePromises);
  });
  
  await Promise.all(promises);
  return playlistMap;
};
