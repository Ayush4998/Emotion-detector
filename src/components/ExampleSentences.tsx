import React from 'react';
import { Sparkles } from 'lucide-react';

interface ExampleSentencesProps {
  onSelectExample: (text: string) => void;
  isLoading: boolean;
}

const examples = [
  {
    text: "I was absolutely amazed and thrilled by the performance—it was just brilliant and awesome!",
    emotions: "happiness + surprise"
  },
  {
    text: "She felt miserable and heartbroken after the awful news, crying alone in her room.",
    emotions: "sadness + disgust"
  },
  {
    text: "He was so frustrated and irritated that he started yelling in a rage—it was terrible to watch.",
    emotions: "anger + disgust"
  },
  {
    text: "I'm scared and anxious about the unexpected results, it's making me panic.",
    emotions: "fear + surprise"
  },
  {
    text: "They laughed with disdain, calling the idea pathetic and ridiculous like it was beneath them.",
    emotions: "contempt"
  }
];

export const ExampleSentences: React.FC<ExampleSentencesProps> = ({ onSelectExample, isLoading }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-center mb-6">
        <Sparkles className="text-purple-400 mr-2" size={20} />
        <h3 className="text-white text-lg font-semibold">Try These Examples</h3>
        <Sparkles className="text-purple-400 ml-2" size={20} />
      </div>
      
      <div className="grid gap-3 md:gap-4">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectExample(example.text)}
            disabled={isLoading}
            className="group p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            <p className="text-white/90 text-sm md:text-base mb-2 group-hover:text-white transition-colors">
              "{example.text}"
            </p>
            <p className="text-purple-300 text-xs font-medium">
              Expected: {example.emotions}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};