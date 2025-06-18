import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface EmotionBubbleProps {
  emotion: string;
  percentage: number;
  color: string;
  icon: LucideIcon;
  delay: number;
}

export const EmotionBubble: React.FC<EmotionBubbleProps> = ({
  emotion,
  percentage,
  color,
  icon: Icon,
  delay
}) => {
  // Enhanced sizing logic - emotions above 20% get significantly larger
  const getSize = (percentage: number) => {
    if (percentage >= 20) {
      return Math.max(80, (percentage / 100) * 250);
    }
    return Math.max(50, (percentage / 100) * 120);
  };

  const size = getSize(percentage);
  const opacity = Math.max(0.3, percentage / 100);

  return (
    <div
      className="flex flex-col items-center justify-center relative transition-all duration-1000 ease-out"
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-1000 ease-out shadow-lg backdrop-blur-sm border border-white/10 hover:scale-110 cursor-pointer ${
          percentage >= 20 ? 'ring-2 ring-white/20' : ''
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
          boxShadow: `0 0 ${size / 4}px ${color}40`,
          transitionDelay: `${delay}ms`,
        }}
      >
        <Icon
          size={Math.max(16, size / 4)}
          className="text-white drop-shadow-lg"
        />
      </div>
      <div className="mt-3 text-center">
        <p className={`font-medium text-sm capitalize ${
          percentage >= 20 ? 'text-white text-base' : 'text-white/90'
        }`}>
          {emotion}
        </p>
        <p className={`text-xs mt-1 ${
          percentage >= 20 ? 'text-white/80 font-semibold' : 'text-white/60'
        }`}>
          {percentage.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};