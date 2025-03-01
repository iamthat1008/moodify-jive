
import YTMusicAPI from "@codyduong/ytmusicapi";
import { Playlist, Song } from "@/types/music";
import { toast } from "@/components/ui/use-toast";

// Initialize the YTMusic API
const ytMusic = new YTMusicAPI();

// Cache mechanism for playlists
const playlistCache: Record<string, Record<string, Playlist>> = {};

export const fetchMoodCategories = async (): Promise<string[]> => {
  try {
    console.log("Fetching mood categories");
    // In a real implementation, we would fetch from the API
    // For now, return placeholder mood IDs
    return ["happy", "sad", "energetic", "relaxed", "romantic"];
  } catch (error) {
    console.error("Error fetching mood categories:", error);
    return [];
  }
};

export const fetchMoodPlaylists = async (
  mood: string,
  language: "hindi" | "english" | "mixed"
): Promise<Playlist> => {
  try {
    console.log(`Fetching playlists for mood: ${mood}, language: ${language}`);
    
    // Check if we have this in cache
    if (playlistCache[mood]?.[language]) {
      console.log("Returning cached playlist");
      return playlistCache[mood][language];
    }

    // In a real implementation, we would fetch from the API
    // For demo purposes, create a mock playlist
    const mockPlaylist: Playlist = {
      id: `${mood}-${language}-playlist`,
      name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} ${language} Music`,
      description: `A collection of ${language} songs for when you're feeling ${mood}`,
      coverImage: "/placeholder.svg",
      songs: generateMockSongs(mood, language, 10)
    };

    // Cache the result
    if (!playlistCache[mood]) {
      playlistCache[mood] = {};
    }
    playlistCache[mood][language] = mockPlaylist;

    return mockPlaylist;
  } catch (error) {
    console.error(`Error fetching playlists for mood ${mood}:`, error);
    toast({
      title: "Error",
      description: `Failed to load ${mood} playlists. Please try again.`,
      variant: "destructive",
    });
    
    // Return an empty playlist as fallback
    return {
      id: `${mood}-${language}-error`,
      name: `${mood} ${language} Music`,
      description: "Could not load playlist",
      coverImage: "/placeholder.svg",
      songs: []
    };
  }
};

// Helper function to generate mock songs for demo purposes
function generateMockSongs(
  mood: string,
  language: "hindi" | "english" | "mixed",
  count: number
): Song[] {
  const songs: Song[] = [];
  const artists = language === "hindi" 
    ? ["Arijit Singh", "Shreya Ghoshal", "Sonu Nigam"] 
    : ["Ed Sheeran", "Taylor Swift", "Adele"];
  
  const titles = {
    happy: ["Happy Day", "Sunshine", "Good Vibes"],
    sad: ["Lost in Thoughts", "Memories", "Missing You"],
    energetic: ["Power Up", "Unstoppable", "Energy Boost"],
    relaxed: ["Peaceful Mind", "Calm Waters", "Serenity"],
    romantic: ["Love Story", "Together Forever", "Sweet Romance"],
  };
  
  for (let i = 0; i < count; i++) {
    const songTitles = titles[mood as keyof typeof titles] || ["Song"];
    const title = `${songTitles[i % songTitles.length]} ${i + 1}`;
    const artist = artists[i % artists.length];
    
    songs.push({
      id: `song-${mood}-${i}`,
      title,
      artist,
      albumArt: `/placeholder.svg`,
      audioUrl: `https://example.com/audio/${mood}/${i}.mp3`,
      duration: 180 + Math.floor(Math.random() * 120)
    });
  }
  
  return songs;
}
