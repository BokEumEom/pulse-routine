import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check, Clock, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { formatTime } from '@/utils/timeUtils';
import { RoutineTemplate } from '@/types';

type Props = {
  routine: RoutineTemplate;
  remainingTime: number;
  onStop: () => void;
};

export default function ActiveRoutineCard({ routine, remainingTime, onStop }: Props) {
  const progress = 1 - remainingTime / (routine.duration * 60);
  
  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = routine.tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    
    routine.tasks = updatedTasks;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{routine.name}</Text>
        <Pressable onPress={onStop} style={styles.stopButton}>
          <X size={20} color="white" />
        </Pressable>
      </View>

      <View style={styles.timerContainer}>
        <Clock size={24} color={Colors.primary} />
        <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progress * 100}%` }
          ]}
        />
      </View>

      <Text style={styles.tasksTitle}>할 일</Text>
      
      <View style={styles.taskList}>
        {routine.tasks.map((task) => (
          <Pressable 
            key={task.id} 
            style={styles.taskItem}
            onPress={() => toggleTaskCompletion(task.id)}
          >
            <View style={[
              styles.checkbox, 
              task.completed && styles.checkboxCompleted
            ]}>
              {task.completed && <Check size={16} color="white" />}
            </View>
            <Text style={[
              styles.taskText,
              task.completed && styles.taskTextCompleted
            ]}>
              {task.text}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.text.primary,
  },
  stopButton: {
    backgroundColor: Colors.error,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  timerText: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  tasksTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginTop: 20,
    marginBottom: 12,
  },
  taskList: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  taskText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.text.secondary,
  },
});