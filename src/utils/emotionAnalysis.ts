export interface EmotionData {
  fear: number;
  contempt: number;
  disgust: number;
  sadness: number;
  anger: number;
  happiness: number;
  surprise: number;
}

// Mock emotion analysis function
export const analyzeEmotion = async (text: string): Promise<EmotionData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock analysis based on keywords for demonstration
  const lowerText = text.toLowerCase();
  
  let emotions: EmotionData = {
    fear: 0,
    contempt: 0,
    disgust: 0,
    sadness: 0,
    anger: 0,
    happiness: 0,
    surprise: 0,
  };

  // Simple keyword-based emotion detection for demo
  const emotionKeywords = {
    happiness: ['happy', 'joy', 'glad', 'excited', 'wonderful', 'amazing', 'great', 'fantastic', 'love', 'awesome', 'brilliant'],
    sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'grief', 'sorrow', 'tears', 'cry', 'lonely', 'heartbroken'],
    anger: ['angry', 'mad', 'furious', 'rage', 'hate', 'annoyed', 'irritated', 'frustrated', 'outraged'],
    fear: ['scared', 'afraid', 'terrified', 'anxious', 'worried', 'nervous', 'panic', 'frightened'],
    surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'stunned', 'unexpected', 'wow', 'incredible'],
    disgust: ['disgusted', 'revolted', 'sick', 'gross', 'repulsive', 'horrible', 'awful', 'terrible'],
    contempt: ['contempt', 'disdain', 'scorn', 'despise', 'worthless', 'pathetic', 'ridiculous'],
  };

  // Calculate base scores
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
    emotions[emotion as keyof EmotionData] = Math.min(matches * 25, 80);
  });

  // Add some randomness for more realistic results
  Object.keys(emotions).forEach(emotion => {
    emotions[emotion as keyof EmotionData] += Math.random() * 15;
  });

  // Ensure at least one emotion has a significant value
  const total = Object.values(emotions).reduce((sum, val) => sum + val, 0);
  if (total < 50) {
    emotions.happiness = 60 + Math.random() * 30;
  }

  // Normalize to ensure total doesn't exceed 100% too much
  const finalTotal = Object.values(emotions).reduce((sum, val) => sum + val, 0);
  if (finalTotal > 100) {
    const factor = 100 / finalTotal;
    Object.keys(emotions).forEach(emotion => {
      emotions[emotion as keyof EmotionData] *= factor;
    });
  }

  return emotions;
};