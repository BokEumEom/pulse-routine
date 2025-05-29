import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput, Modal } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { EmotionType } from '@/types';

type Props = {
  onRecordConnection: (emotion: EmotionType, notes: string) => void;
};

export default function EmotionConnectionCard({ onRecordConnection }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [notes, setNotes] = useState('');

  const person = {
    id: '1',
    name: '김민수 팀장',
    role: '팀장',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  };

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const handleSubmit = () => {
    if (selectedEmotion && notes) {
      onRecordConnection(selectedEmotion, notes);
      setModalVisible(false);
      setSelectedEmotion(null);
      setNotes('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>감정선 연결</Text>
      
      <View style={styles.cardContent}>
        <Image
          source={{ uri: person.image }}
          style={styles.personImage}
        />
        
        <View style={styles.personInfo}>
          <Text style={styles.personName}>{person.name}</Text>
          <Text style={styles.personRole}>{person.role}</Text>
          
          <Text style={styles.promptText}>
            오늘 이 사람과 어떤 감정을 나눴나요?
          </Text>
          
          <View style={styles.emotionOptions}>
            <Pressable 
              style={[styles.emotionOption, styles.emotionPositive]}
              onPress={() => handleEmotionSelect('happy')}
            >
              <Text style={styles.emotionText}>긍정적</Text>
            </Pressable>
            <Pressable 
              style={[styles.emotionOption, styles.emotionNeutral]}
              onPress={() => handleEmotionSelect('calm')}
            >
              <Text style={styles.emotionText}>중립적</Text>
            </Pressable>
            <Pressable 
              style={[styles.emotionOption, styles.emotionNegative]}
              onPress={() => handleEmotionSelect('frustrated')}
            >
              <Text style={styles.emotionText}>부정적</Text>
            </Pressable>
          </View>

          <Pressable 
            style={styles.recordButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.recordButtonText}>자세히 기록하기</Text>
          </Pressable>
        </View>
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
              <Text style={styles.modalTitle}>감정 기록하기</Text>
              <Pressable 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.text.secondary} />
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>어떤 일이 있었나요?</Text>
              <TextInput
                style={styles.notesInput}
                multiline
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
                placeholder="상황과 감정을 자유롭게 적어주세요"
                placeholderTextColor={Colors.text.tertiary}
              />

              <Pressable 
                style={[
                  styles.submitButton,
                  (!selectedEmotion || !notes) && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={!selectedEmotion || !notes}
              >
                <Text style={styles.submitButtonText}>기록하기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  cardContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  personImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  personInfo: {
    alignItems: 'center',
    width: '100%',
  },
  personName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  personRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginBottom: 20,
  },
  promptText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  emotionOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  emotionOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  emotionPositive: {
    backgroundColor: Colors.success + '20',
  },
  emotionNeutral: {
    backgroundColor: Colors.warning + '20',
  },
  emotionNegative: {
    backgroundColor: Colors.error + '20',
  },
  emotionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  recordButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  recordButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'white',
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
    minHeight: '60%',
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
  modalBody: {
    flex: 1,
  },
  modalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});