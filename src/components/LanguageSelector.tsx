
import { Button } from "@/components/ui/button";
import { Music4, Globe2 } from "lucide-react";

interface LanguageSelectorProps {
  value: "hindi" | "english" | "mixed";
  onChange: (value: "hindi" | "english" | "mixed") => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2 bg-secondary/50 backdrop-blur-sm rounded-lg p-1">
      <Button
        variant={value === "hindi" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("hindi")}
        className="relative"
      >
        Hindi
      </Button>
      <Button
        variant={value === "english" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("english")}
      >
        English
      </Button>
      <Button
        variant={value === "mixed" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onChange("mixed")}
      >
        Mixed
      </Button>
    </div>
  );
};
