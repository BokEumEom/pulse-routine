import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';

type Deadline = {
  id: string;
  title: string;
  dueDate: Date;
  teammates: string[];
};

type Props = {
  deadlines: Deadline[];
};

export default function DeadlinesList({ deadlines }: Props) {
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return '오늘';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    } else {
      return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
  };

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const getDueDateColor = (daysRemaining: number) => {
    if (daysRemaining <= 1) {
      return Colors.error;
    } else if (daysRemaining <= 3) {
      return Colors.warning;
    } else {
      return Colors.success;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>다가오는 마감</Text>
      
      {deadlines.map(deadline => {
        const daysRemaining = getDaysRemaining(deadline.dueDate);
        const dueDateColor = getDueDateColor(daysRemaining);
        
        return (
          <View key={deadline.id} style={styles.deadlineCard}>
            <View style={styles.deadlineInfo}>
              <View style={styles.deadlineHeader}>
                <Calendar size={20} color={dueDateColor} />
                <Text style={[styles.deadlineDate, { color: dueDateColor }]}>
                  {formatDate(deadline.dueDate)}
                </Text>
              </View>
              <Text style={styles.deadlineTitle}>{deadline.title}</Text>
              <View style={styles.teammatesContainer}>
                <Text style={styles.teammatesLabel}>함께하는 사람: </Text>
                <Text style={styles.teammatesText}>
                  {deadline.teammates.join(', ')}
                </Text>
              </View>
            </View>
            <View style={[styles.daysContainer, { backgroundColor: dueDateColor }]}>
              <Text style={styles.daysNumber}>{daysRemaining}</Text>
              <Text style={styles.daysText}>일 남음</Text>
            </View>
          </View>
        );
      })}

      {deadlines.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>마감일이 없습니다</Text>
        </View>
      )}
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
  deadlineCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  deadlineInfo: {
    flex: 1,
  },
  deadlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deadlineDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  deadlineTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 6,
  },
  teammatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  teammatesLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.text.secondary,
  },
  teammatesText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.primary,
  },
  daysContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  daysNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  daysText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'white',
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
  },
});