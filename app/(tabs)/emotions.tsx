import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ClipboardList, Users, Brain } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import EmotionDayCard from '@/components/emotions/EmotionDayCard';
import EmotionHistoryList from '@/components/emotions/EmotionHistoryList';
import EmotionConnectionCard from '@/components/emotions/EmotionConnectionCard';
import { EmotionEntry } from '@/types';

export default function EmotionsScreen() {
  const [emotionEntries, setEmotionEntries] = useState<EmotionEntry[]>([]);

  const addEmotionEntry = (entry: EmotionEntry) => {
    setEmotionEntries(prev => [entry, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>감정</Text>
          <Text style={styles.subtitle}>오늘의 감정을 기록하고 연결해요</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <EmotionDayCard onRecordEmotion={addEmotionEntry} />

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>빠른 액션</Text>
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton}>
              <ClipboardList size={24} color={Colors.primary} />
              <Text style={styles.actionText}>감정 일기</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Users size={24} color={Colors.secondary} />
              <Text style={styles.actionText}>팀 체크인</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Calendar size={24} color={Colors.accent} />
              <Text style={styles.actionText}>주간 리포트</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Brain size={24} color={Colors.warning} />
              <Text style={styles.actionText}>감정 훈련</Text>
            </Pressable>
          </View>
        </View>

        <EmotionConnectionCard 
          onRecordConnection={(emotion, notes) => {
            addEmotionEntry({
              id: Date.now().toString(),
              date: new Date(),
              primaryEmotion: emotion,
              notes,
              relatedTo: {
                personId: '1',
                type: 'person'
              }
            });
          }}
        />
        
        <EmotionHistoryList entries={emotionEntries} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginTop: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  quickActions: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionButton: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginTop: 8,
  },
});