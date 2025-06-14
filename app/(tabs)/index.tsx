import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CircleCheck as CheckCircle2, Timer, Users } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import ActiveRoutineCard from '@/components/routine/ActiveRoutineCard';
import RoutinesList from '@/components/routine/RoutinesList';
import DeadlinesList from '@/components/routine/DeadlinesList';
import { useRoutines } from '@/hooks/useRoutines';

export default function RoutineScreen() {
  const { routines } = useRoutines();
  const [activeRoutine, setActiveRoutine] = useState(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const [deadlines, setDeadlines] = useState([
    {
      id: '1',
      title: '분기 보고서 제출',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      teammates: ['김민수', '이지연']
    },
    {
      id: '2',
      title: '디자인 시안 검토',
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      teammates: ['박지훈']
    }
  ]);

  const startRoutine = (routine) => {
    const newRoutine = JSON.parse(JSON.stringify(routine));
    setActiveRoutine(newRoutine);
    setRemainingTime(newRoutine.duration * 60);
  };

  const stopRoutine = () => {
    setActiveRoutine(null);
    setRemainingTime(0);
  };

  useEffect(() => {
    let timer;
    if (activeRoutine && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && activeRoutine) {
      stopRoutine();
    }
    return () => clearTimeout(timer);
  }, [remainingTime, activeRoutine]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>루틴</Text>
          <Text style={styles.subtitle}>집중과 실행의 리듬을 만들어요</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeRoutine ? (
          <ActiveRoutineCard 
            routine={activeRoutine} 
            remainingTime={remainingTime} 
            onStop={stopRoutine} 
          />
        ) : (
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>빠른 시작</Text>
            <View style={styles.actionButtons}>
              <Pressable style={styles.actionButton}>
                <Timer size={24} color={Colors.primary} />
                <Text style={styles.actionText}>집중 타이머</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <CheckCircle2 size={24} color={Colors.secondary} />
                <Text style={styles.actionText}>빠른 체크리스트</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Calendar size={24} color={Colors.accent} />
                <Text style={styles.actionText}>마감 추가</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <Users size={24} color={Colors.warning} />
                <Text style={styles.actionText}>팀 공유</Text>
              </Pressable>
            </View>
          </View>
        )}

        <RoutinesList routines={routines} onStart={startRoutine} />
        
        <DeadlinesList deadlines={deadlines} />
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