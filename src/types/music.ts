export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
  duration: number; // in seconds
  isEmbed?: boolean; // Optional flag to indicate if the song uses an embed player
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  songs: Song[];
  source?: "local" | "youtube"; // To track the source of the playlist
}

export type MoodPlaylistMap = {
  [mood: string]: {
    [language: string]: Playlist;
  };
};

// This type will help us keep track of the YouTube Music playlist IDs for each mood
export type YoutubeMusicPlaylists = {
  [mood: string]: {
    [language: string]: string; // YouTube Music Playlist ID
  };
};
