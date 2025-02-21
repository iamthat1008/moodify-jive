
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";

interface OnboardingData {
  name: string;
  age: number | "";
  country: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

type StepConfig = {
  title: string;
  description: string;
  field: keyof OnboardingData;
  type: "text" | "number";
  placeholder: string;
  validation: (value: any) => boolean;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: "",
    country: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const steps: StepConfig[] = [
    {
      title: "What's your name?",
      description: "Let's make this personal!",
      field: "name",
      type: "text",
      placeholder: "Enter your name",
      validation: (value: string) => value.length >= 2,
    },
    {
      title: "How old are you?",
      description: "We'll tailor your experience accordingly",
      field: "age",
      type: "number",
      placeholder: "Enter your age",
      validation: (value: number | "") => typeof value === "number" ? value >= 13 && value <= 120 : false,
    },
    {
      title: "Where are you from?",
      description: "Music knows no borders!",
      field: "country",
      type: "text",
      placeholder: "Enter your country",
      validation: (value: string) => value.length >= 2,
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    const currentValue = data[currentStep.field];
    if (!currentStep.validation(currentValue)) {
      toast({
        title: "Invalid Input",
        description: "Please provide a valid value",
        variant: "destructive",
      });
      return;
    }

    if (step === steps.length - 1) {
      setShowSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        onComplete(data);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showSuccess ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto space-y-8"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full space-y-6 text-center"
          >
            <motion.h1
              layout
              className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              {currentStep.title}
            </motion.h1>
            <motion.p
              layout
              className="text-muted-foreground"
            >
              {currentStep.description}
            </motion.p>
            <motion.div layout className="space-y-4">
              <Input
                type={currentStep.type}
                placeholder={currentStep.placeholder}
                value={data[currentStep.field]}
                onChange={(e) =>
                  setData({
                    ...data,
                    [currentStep.field]: currentStep.type === "number"
                      ? e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                      : e.target.value,
                  })
                }
                className="text-lg p-6 text-center glass"
              />
              <Button
                onClick={handleNext}
                className="w-full p-6 text-lg hover-scale glass"
              >
                {step === steps.length - 1 ? "Complete" : "Continue"}
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="flex gap-2 mt-8">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-8 bg-primary"
                    : i < step
                    ? "w-8 bg-primary/40"
                    : "w-2 bg-primary/20"
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gradient"
          >
            Welcome aboard, {data.name}!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Get ready for a mood-boosting experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

