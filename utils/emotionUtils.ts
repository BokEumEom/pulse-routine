import { EmotionType } from '@/types';

export const getEmotionEmoji = (emotion: EmotionType): string => {
  const emotionEmojiMap: Record<EmotionType, string> = {
    happy: '😊',
    excited: '🤩',
    content: '😌',
    calm: '😌',
    anxious: '😟',
    sad: '😢',
    angry: '😠',
    frustrated: '😤',
    motivated: '💪',
    optimistic: '🙂',
    grateful: '🙏',
    overwhelmed: '😵',
  };
  
  return emotionEmojiMap[emotion] || '😐';
};

export const getEmotionColor = (emotion: EmotionType): string => {
  const emotionColorMap: Record<EmotionType, string> = {
    happy: '#FFD166',
    excited: '#FF9F1C',
    content: '#4ECDC4',
    calm: '#83C5BE',
    anxious: '#FFB347',
    sad: '#6699CC',
    angry: '#E84855',
    frustrated: '#F25F5C',
    motivated: '#6A0572',
    optimistic: '#FFC857',
    grateful: '#98C1D9',
    overwhelmed: '#7B68EE',
  };
  
  return emotionColorMap[emotion] || '#CCCCCC';
};

export const groupEmotions = () => {
  return {
    positive: ['happy', 'excited', 'content', 'calm', 'motivated', 'optimistic', 'grateful'],
    negative: ['anxious', 'sad', 'angry', 'frustrated', 'overwhelmed'],
  };
};