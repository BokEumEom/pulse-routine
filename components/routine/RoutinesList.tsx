import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { AlarmClock, Moon, Play } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { RoutineTemplate } from '@/types';

type Props = {
  routines: RoutineTemplate[];
  onStart: (routine: RoutineTemplate) => void;
};

export default function RoutinesList({ routines, onStart }: Props) {
  const getRoutineIcon = (iconName: string) => {
    switch (iconName) {
      case 'morning':
        return <AlarmClock size={24} color={Colors.primary} />;
      case 'night':
        return <Moon size={24} color={Colors.secondary} />;
      default:
        return <AlarmClock size={24} color={Colors.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>내 루틴</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {routines.map(routine => (
          <View key={routine.id} style={styles.routineCard}>
            <View style={styles.routineIconContainer}>
              {getRoutineIcon(routine.icon)}
            </View>
            <Text style={styles.routineName}>{routine.name}</Text>
            <Text style={styles.routineTime}>{routine.duration}분</Text>
            <Text style={styles.routineTaskCount}>
              {routine.tasks.length}개 할 일
            </Text>
            
            <Pressable 
              style={styles.startButton}
              onPress={() => onStart(routine)}
            >
              <Play size={20} color="white" fill="white" />
              <Text style={styles.startButtonText}>시작하기</Text>
            </Pressable>
          </View>
        ))}
        <View style={styles.addRoutineCard}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
          <Text style={styles.addText}>새 루틴 만들기</Text>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  routineCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    width: 160,
    marginRight: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  routineIconContainer: {
    backgroundColor: Colors.background,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  routineName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  routineTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  routineTaskCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 'auto',
  },
  startButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  addRoutineCard: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    fontSize: 24,
    color: Colors.primary,
    fontFamily: 'Inter-Medium',
  },
  addText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
});