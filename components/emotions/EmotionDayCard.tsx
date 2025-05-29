import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { EmotionType } from '@/types';
import { getEmotionEmoji } from '@/utils/emotionUtils';

type Props = {
  onRecordEmotion: (emotion: { 
    id: string;
    date: Date;
    primaryEmotion: EmotionType;
    secondaryEmotions?: EmotionType[];
    notes?: string;
    relatedTo: null;
  }) => void;
};

export default function EmotionDayCard({ onRecordEmotion }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  
  const emotions: EmotionType[] = [
    'happy', 'excited', 'content', 'calm',
    'anxious', 'sad', 'angry', 'frustrated',
    'motivated', 'optimistic', 'grateful', 'overwhelmed'
  ];

  const handleEmotionSelect = (emotion: EmotionType) => {
    onRecordEmotion({
      id: Date.now().toString(),
      date: new Date(),
      primaryEmotion: emotion,
      relatedTo: null
    });
    setSelectedEmotion(emotion);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
          </Text>
          <Text style={styles.title}>오늘의 감정</Text>
        </View>
        <View style={[
          styles.statusBadge,
          selectedEmotion ? styles.recordedBadge : styles.notRecordedBadge
        ]}>
          <Text style={[
            styles.statusText,
            selectedEmotion ? styles.recordedText : styles.notRecordedText
          ]}>
            {selectedEmotion ? '기록됨' : '미기록'}
          </Text>
        </View>
      </View>
      
      <View style={styles.content}>
        {selectedEmotion ? (
          <View style={styles.emotionSummary}>
            <View style={styles.emojiContainer}>
              <Text style={styles.primaryEmoji}>
                {getEmotionEmoji(selectedEmotion)}
              </Text>
            </View>
            <View style={styles.emotionDetails}>
              <Text style={styles.primaryEmotion}>{selectedEmotion}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>
              오늘 어떤 감정을 느끼셨나요?
            </Text>
            <Pressable 
              style={styles.recordButton}
              onPress={() => setModalVisible(true)}
            >
              <Plus size={20} color="white" />
              <Text style={styles.recordButtonText}>감정 기록하기</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>감정 선택</Text>
              <Pressable 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.text.secondary} />
              </Pressable>
            </View>
            <View style={styles.emotionsGrid}>
              {emotions.map((emotion) => (
                <Pressable
                  key={emotion}
                  style={styles.emotionButton}
                  onPress={() => handleEmotionSelect(emotion)}
                >
                  <Text style={styles.emotionEmoji}>
                    {getEmotionEmoji(emotion)}
                  </Text>
                  <Text style={styles.emotionLabel}>{emotion}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordedBadge: {
    backgroundColor: Colors.success + '20',
  },
  notRecordedBadge: {
    backgroundColor: Colors.warning + '20',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  recordedText: {
    color: Colors.success,
  },
  notRecordedText: {
    color: Colors.warning,
  },
  content: {
    minHeight: 100,
    justifyContent: 'center',
  },
  emotionSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  primaryEmoji: {
    fontSize: 36,
  },
  emotionDetails: {
    flex: 1,
  },
  primaryEmotion: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  promptContainer: {
    alignItems: 'center',
  },
  promptText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  recordButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  recordButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'white',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 8,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emotionButton: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
  },
  emotionEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  emotionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
    textAlign: 'center',
  },
});