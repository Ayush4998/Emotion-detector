import React, { useState } from 'react';
import { Heart, Frown, Meh, Angry, Smile, Zap, Eye } from 'lucide-react';
import { EmotionBubble } from './components/EmotionBubble';
import { TextInput } from './components/TextInput';
import { ExampleSentences } from './components/ExampleSentences';
import { analyzeEmotion, EmotionData } from './utils/emotionAnalysis';

const emotionConfig = [
  { key: 'fear', name: 'Fear', color: '#8B5CF6', icon: Eye },
  { key: 'contempt', name: 'Contempt', color: '#6B7280', icon: Meh },
  { key: 'disgust', name: 'Disgust', color: '#10B981', icon: Frown },
  { key: 'sadness', name: 'Sadness', color: '#3B82F6', icon: Heart },
  { key: 'anger', name: 'Anger', color: '#EF4444', icon: Angry },
  { key: 'happiness', name: 'Happiness', color: '#F59E0B', icon: Smile },
  { key: 'surprise', name: 'Surprise', color: '#EC4899', icon: Zap },
];

function App() {
  const [emotions, setEmotions] = useState<EmotionData>({
    fear: 5,
    contempt: 5,
    disgust: 5,
    sadness: 5,
    anger: 5,
    happiness: 70,
    surprise: 5,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setCurrentText(text);
    try {
      const result = await analyzeEmotion(text);
      setEmotions(result);
      setHasAnalyzed(true);
    } catch (error) {
      console.error('Error analyzing emotion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectExample = (text: string) => {
    handleAnalyze(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23FFFFFF%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M30%2030c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20zM10%2010c0-11.046%208.954-20%2020-20s20%208.954%2020%2020-8.954%2020-20%2020-20-8.954-20-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Emotion Analyzer
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the emotional landscape of your words with AI-powered sentiment analysis
          </p>
        </header>

        {/* Emotion Bubbles */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-12 w-full max-w-6xl">
            {emotionConfig.map((config, index) => (
              <EmotionBubble
                key={config.key}
                emotion={config.name}
                percentage={emotions[config.key as keyof EmotionData]}
                color={config.color}
                icon={config.icon}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Status Message */}
        {hasAnalyzed && !isLoading && (
          <div className="text-center py-4 px-4">
            <p className="text-white/80 text-sm mb-2">
              Analysis complete! The bubbles above show the emotional composition of your text.
            </p>
            {currentText && (
              <p className="text-white/60 text-xs max-w-2xl mx-auto italic">
                "{currentText.length > 100 ? currentText.substring(0, 100) + '...' : currentText}"
              </p>
            )}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <p className="text-white/80 text-sm animate-pulse">
              Analyzing emotional content...
            </p>
          </div>
        )}

        {/* Examples Section */}
        <div className="px-6 md:px-12 pb-6">
          <ExampleSentences onSelectExample={handleSelectExample} isLoading={isLoading} />
        </div>

        {/* Input Section */}
        <div className="px-6 md:px-12 pb-6">
          <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Footer */}
        <footer className="text-center py-6 px-4">
          <p className="text-white/40 text-sm">
            Try the examples above or enter your own sentence to see its emotional breakdown — built by Ayush Goswami
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;