
import { Card } from "@/components/ui/card";

interface PlaylistViewerProps {
  mood: string;
  language: "hindi" | "english" | "mixed";
}

// These would come from your actual playlist database
const playlists = {
  happy: {
    hindi: "37i9dQZF1DX9uKNf5jGX6m",
    english: "37i9dQZF1DXdPec7aLTmlC",
    mixed: "37i9dQZF1DX7K31D69s4M1",
  },
  sad: {
    hindi: "37i9dQZF1DWYVUxp0wXqeV",
    english: "37i9dQZF1DX7qK8ma5wgG1",
    mixed: "37i9dQZF1DWXyVXBHUJOmN",
  },
  energetic: {
    hindi: "37i9dQZF1DX5q67ZpWyRrZ",
    english: "37i9dQZF1DX0BcQWzuB7ZO",
    mixed: "37i9dQZF1DWZUTt0fNaCPB",
  },
  focus: {
    hindi: "37i9dQZF1DX5trt9i14X7j",
    english: "37i9dQZF1DX8NTLI2TtZa6",
    mixed: "37i9dQZF1DX4sWSpwq3LiO",
  },
  chill: {
    hindi: "37i9dQZF1DX0XUfTFmNBRM",
    english: "37i9dQZF1DX4WYpdgoIcn6",
    mixed: "37i9dQZF1DX4dyzvuaRJ0n",
  },
  motivational: {
    hindi: "37i9dQZF1DX1OY2Lp0bIPp",
    english: "37i9dQZF1DX8q1e6Qm7rnL",
    mixed: "37i9dQZF1DX8ZfQjkCpEPI",
  },
} as const;

export const PlaylistViewer = ({ mood, language }: PlaylistViewerProps) => {
  const playlistId = playlists[mood as keyof typeof playlists]?.[language];

  return (
    <Card className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl bg-card">
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="bg-card"
      />
    </Card>
  );
};
