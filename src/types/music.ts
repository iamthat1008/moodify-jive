
export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  songs: Song[];
}

// Add the missing MoodPlaylistMap type
export interface MoodPlaylistMap {
  [mood: string]: {
    [language: string]: Playlist;
  };
}
