import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const MoodSelector = ({ moods, onSelect }: { moods: any[], onSelect: (mood: string) => void }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (mood: string) => {
    setSelectedMood(mood);
    setIsLoading(true);
    
    // Simulate loading time when selecting a mood
    setTimeout(() => {
      setIsLoading(false);
      onSelect(mood);
    }, 800);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {moods.map((mood) => (
        <Card
          key={mood.id}
          className={cn(
            "cursor-pointer hover:scale-105 transition-transform",
            selectedMood === mood.id ? "ring-2 ring-primary" : "ring-1 ring-border"
          )}
          onClick={() => handleSelect(mood.id)}
          disabled={isLoading}
        >
          <CardContent className="flex flex-col items-center justify-center space-y-3 p-3">
            {isLoading && selectedMood === mood.id ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <img
                src={mood.image}
                alt={mood.name}
                className="h-16 w-16 rounded-full object-cover shadow-md"
              />
            )}
            <h3 className="text-sm font-semibold text-center">{mood.name}</h3>
            <p className="text-xs text-muted-foreground text-center">{mood.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
