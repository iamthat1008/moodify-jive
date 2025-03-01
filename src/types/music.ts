
export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
  duration: number; // in seconds
  isEmbed?: boolean; // Flag to indicate if the song uses an embed player
  videoId?: string; // YouTube video ID for direct YouTube Music integration
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
