
import { YoutubeMusicPlaylists } from "@/types/music";

// Store YouTube Music playlist IDs for each mood and language
// These are placeholder IDs - replace with actual YouTube Music playlist IDs
export const youtubeMusicPlaylists: YoutubeMusicPlaylists = {
  happy: {
    english: "PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx", // Replace with actual happy English playlist ID
    hindi: "PLMRKdK25AuQssaS7PqbZjvO7zU3l9jWl4",   // Replace with actual happy Hindi playlist ID
    mixed: "PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5"    // Replace with actual happy mixed playlist ID
  },
  sad: {
    english: "PLgzTt0k8mXzHr1sOO0YH63ax5LW7r3bin", // Replace with actual sad English playlist ID
    hindi: "PLhsz9CILh357zA1yMT-K5T7PCLUSE8gY1",   // Replace with actual sad Hindi playlist ID
    mixed: "PLw-VjHDlEOgtEwOFZ9XE_SgT6c8pybn_X"    // Replace with actual sad mixed playlist ID
  },
  calm: {
    english: "PLgzTt0k8mXzFLOQ8oXX8-30YJOv9f49lB", // Replace with actual calm English playlist ID
    hindi: "PLMRKdK25AuQu96Oig2PQkTyVeV4KfZxg4",   // Replace with actual calm Hindi playlist ID
    mixed: "PLw-VjHDlEOgsD_aD9NVf4RA4O1rhqtXQd"    // Replace with actual calm mixed playlist ID
  },
  energetic: {
    english: "PLgzTt0k8mXzFYRLF7bx0y2Hkv9F6HNgZX", // Replace with actual energetic English playlist ID
    hindi: "PLMRKdK25AuQvq8sdgw5B_kFZRhAn0lLVv",   // Replace with actual energetic Hindi playlist ID
    mixed: "PLw-VjHDlEOgvvHRYMde_V6kZF_PLLGckh"    // Replace with actual energetic mixed playlist ID
  },
  romantic: {
    english: "PLgzTt0k8mXzHQtxkIkFSAyAyGT_uYMUbU", // Replace with actual romantic English playlist ID
    hindi: "PLMRKdK25AuQs6_J61KGIw7c-hMYxUYEwY",   // Replace with actual romantic Hindi playlist ID
    mixed: "PLw-VjHDlEOguu_vdD3yqZHeSfJGGPspXw"    // Replace with actual romantic mixed playlist ID
  }
};

// Function to check if we have a YouTube Music playlist ID for a given mood and language
export const hasYouTubeMusicPlaylist = (mood: string, language: string): boolean => {
  return !!(
    youtubeMusicPlaylists[mood] && 
    youtubeMusicPlaylists[mood][language] && 
    youtubeMusicPlaylists[mood][language].length > 0
  );
};

// Function to get the YouTube Music playlist ID for a given mood and language
export const getYouTubeMusicPlaylistId = (mood: string, language: string): string | null => {
  if (hasYouTubeMusicPlaylist(mood, language)) {
    return youtubeMusicPlaylists[mood][language];
  }
  return null;
};
