import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { EmotionEntry } from '@/types';
import { getEmotionEmoji } from '@/utils/emotionUtils';

type Props = {
  entries: EmotionEntry[];
};

export default function EmotionHistoryList({ entries }: Props) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>감정 기록</Text>
        <Pressable style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>모두 보기</Text>
        </Pressable>
      </View>
      
      {entries.map(entry => (
        <Pressable key={entry.id} style={styles.entryCard}>
          <View style={styles.entryHeader}>
            <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
          </View>
          <View style={styles.entryContent}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{getEmotionEmoji(entry.primaryEmotion)}</Text>
            </View>
            <View style={styles.entryDetails}>
              <Text style={styles.primaryEmotion}>{entry.primaryEmotion}</Text>
              {entry.secondaryEmotions && (
                <Text style={styles.secondaryEmotions}>
                  {entry.secondaryEmotions.join(', ')}
                </Text>
              )}
              <Text 
                style={styles.notes}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {entry.notes}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}

      {entries.length === 0 && (
        <View style={styles.emptyContainer}>
          <Calendar size={40} color={Colors.text.tertiary} />
          <Text style={styles.emptyText}>아직 감정 기록이 없습니다</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
  entryCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  entryHeader: {
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  entryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 24,
  },
  entryDetails: {
    flex: 1,
  },
  primaryEmotion: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  secondaryEmotions: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: 2,
  },
  notes: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
    marginTop: 6,
  },
  emptyContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: 12,
  },
});