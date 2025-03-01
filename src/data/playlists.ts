
import { MoodPlaylistMap } from "@/types/music";
import { getAllPlaylists } from "@/services/ytMusicService";

// Initialize with empty playlists that will be populated when loaded
export const playlists: MoodPlaylistMap = {};

// Function to load playlists dynamically
export async function loadPlaylists(): Promise<MoodPlaylistMap> {
  try {
    const fetchedPlaylists = await getAllPlaylists();
    
    // Update the exported playlists object with fetched data
    Object.keys(fetchedPlaylists).forEach(mood => {
      playlists[mood] = fetchedPlaylists[mood];
    });
    
    return fetchedPlaylists;
  } catch (error) {
    console.error("Error loading playlists:", error);
    return {};
  }
}

// Immediately load playlists when this module is imported
loadPlaylists();
