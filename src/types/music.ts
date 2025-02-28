
export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
  duration: number; // in seconds
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  songs: Song[];
}

export type MoodPlaylistMap = {
  [mood: string]: {
    [language: string]: Playlist;
  };
};
