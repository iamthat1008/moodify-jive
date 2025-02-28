
import { MoodPlaylistMap, Playlist, Song } from "@/types/music";
import songMetadata from './songs_metadata.json';

// Process the imported song metadata to ensure URLs are properly formed
const processedSongs: Song[] = songMetadata.map(song => {
  // Check if the audioUrl is a direct Google Drive link or a local path
  let audioUrl = song.audioUrl;
  let isEmbed = false;

  // If it's a direct Google Drive link but not yet processed
  if (audioUrl.includes('drive.google.com') && !audioUrl.includes('uc?export=view')) {
    // Check if it's a preview/embed link
    if (audioUrl.includes('/preview')) {
      isEmbed = true;
    }
  } else if (audioUrl.startsWith('C:\\')) {
    // If it's a local file path from Windows, replace with a placeholder
    audioUrl = "https://example.com/placeholder-audio.mp3";
    isEmbed = true; // Set as embed since we can't directly play it
  }

  // Similarly check and fix album art URL
  let albumArt = song.albumArt;
  if (albumArt.startsWith('C:\\')) {
    // Use a placeholder image for local file paths
    albumArt = "https://example.com/placeholder-image.jpg";
  }

  return {
    ...song,
    audioUrl,
    albumArt,
    isEmbed: isEmbed || song.audioUrl.includes('example.com') // Mark as embed if URL can't be directly played
  };
});

// Define playlists for each mood
const sadPlaylist: Playlist = {
  id: "sad-playlist",
  name: "Melancholy Melodies",
  description: "Songs for when you need to embrace the feelings of sadness",
  coverImage: processedSongs[0]?.albumArt || "https://example.com/placeholder-cover.jpg",
  songs: processedSongs
};

const happyPlaylist: Playlist = {
  id: "happy-playlist",
  name: "Upbeat Vibes",
  description: "Energetic and cheerful tunes to lift your spirits",
  coverImage: "https://source.unsplash.com/random/800x600/?happy,music",
  songs: [
    {
      id: "happy-1",
      title: "Happy Place",
      artist: "Pharrell Williams",
      albumArt: "https://source.unsplash.com/random/300x300/?happy,album",
      audioUrl: "https://example.com/happy-place.mp3",
      duration: 180
    },
    {
      id: "happy-2",
      title: "Good Vibes",
      artist: "The Sunshine Band",
      albumArt: "https://source.unsplash.com/random/300x300/?sunshine,album",
      audioUrl: "https://example.com/good-vibes.mp3",
      duration: 210
    }
  ]
};

const calmPlaylist: Playlist = {
  id: "calm-playlist",
  name: "Tranquil Tunes",
  description: "Peaceful melodies to help you relax and find serenity",
  coverImage: "https://source.unsplash.com/random/800x600/?calm,nature",
  songs: [
    {
      id: "calm-1",
      title: "Ocean Waves",
      artist: "Nature Sounds",
      albumArt: "https://source.unsplash.com/random/300x300/?ocean,waves",
      audioUrl: "https://example.com/ocean-waves.mp3",
      duration: 300
    },
    {
      id: "calm-2",
      title: "Forest Rain",
      artist: "Ambient World",
      albumArt: "https://source.unsplash.com/random/300x300/?forest,rain",
      audioUrl: "https://example.com/forest-rain.mp3",
      duration: 360
    }
  ]
};

const energeticPlaylist: Playlist = {
  id: "energetic-playlist",
  name: "Energy Boost",
  description: "High-energy tracks to fuel your workouts and activities",
  coverImage: "https://source.unsplash.com/random/800x600/?energy,workout",
  songs: [
    {
      id: "energetic-1",
      title: "Power Up",
      artist: "Workout Kings",
      albumArt: "https://source.unsplash.com/random/300x300/?workout,power",
      audioUrl: "https://example.com/power-up.mp3",
      duration: 240
    },
    {
      id: "energetic-2",
      title: "Run the World",
      artist: "Fitness Queens",
      albumArt: "https://source.unsplash.com/random/300x300/?run,fitness",
      audioUrl: "https://example.com/run-the-world.mp3",
      duration: 210
    }
  ]
};

const romanticPlaylist: Playlist = {
  id: "romantic-playlist",
  name: "Love Ballads",
  description: "Romantic songs for heartfelt moments",
  coverImage: "https://source.unsplash.com/random/800x600/?love,romantic",
  songs: [
    {
      id: "romantic-1",
      title: "Eternal Love",
      artist: "Heart & Soul",
      albumArt: "https://source.unsplash.com/random/300x300/?love,heart",
      audioUrl: "https://example.com/eternal-love.mp3",
      duration: 270
    },
    {
      id: "romantic-2",
      title: "Forever Yours",
      artist: "The Lovers",
      albumArt: "https://source.unsplash.com/random/300x300/?couple,romance",
      audioUrl: "https://example.com/forever-yours.mp3",
      duration: 240
    }
  ]
};

// Create a full playlist map with language variants
export const playlists: MoodPlaylistMap = {
  sad: {
    english: sadPlaylist,
    hindi: sadPlaylist, // Using the same playlist for now
    mixed: sadPlaylist   // Using the same playlist for now
  },
  happy: {
    english: happyPlaylist,
    hindi: happyPlaylist,
    mixed: happyPlaylist
  },
  calm: {
    english: calmPlaylist,
    hindi: calmPlaylist,
    mixed: calmPlaylist
  },
  energetic: {
    english: energeticPlaylist,
    hindi: energeticPlaylist,
    mixed: energeticPlaylist
  },
  romantic: {
    english: romanticPlaylist,
    hindi: romanticPlaylist,
    mixed: romanticPlaylist
  }
};
