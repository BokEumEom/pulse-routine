import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AlarmClock, Moon, Sun, Plus, Trash2, ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Task } from '@/types';
import { useRoutines } from '@/hooks/useRoutines';

export default function CreateRoutineScreen() {
  const { addRoutine } = useRoutines();
  const [routineName, setRoutineName] = useState('');
  const [duration, setDuration] = useState('60');
  const [selectedIcon, setSelectedIcon] = useState<'morning' | 'day' | 'night'>('morning');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: '', completed: false }
  ]);
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = () => {
    setTasks(prev => [...prev, {
      id: Date.now().toString(),
      text: '',
      completed: false
    }]);
  };

  const handleRemoveTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleTaskChange = (taskId: string, text: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, text } : task
    ));
    setError(null);
  };

  const validateForm = () => {
    if (!routineName.trim()) {
      setError('루틴 이름을 입력해주세요');
      return false;
    }

    if (tasks.some(task => !task.text.trim())) {
      setError('모든 할 일을 입력해주세요');
      return false;
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      setError('올바른 소요 시간을 입력해주세요');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newRoutine = {
      id: Date.now().toString(),
      name: routineName,
      duration: parseInt(duration),
      tasks: tasks.filter(task => task.text.trim()),
      icon: selectedIcon
    };

    addRoutine(newRoutine);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>새 루틴 만들기</Text>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>저장</Text>
        </Pressable>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>루틴 이름</Text>
          <TextInput
            style={styles.input}
            value={routineName}
            onChangeText={(text) => {
              setRoutineName(text);
              setError(null);
            }}
            placeholder="루틴 이름을 입력하세요"
            placeholderTextColor={Colors.text.tertiary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>시간대</Text>
          <View style={styles.iconSelector}>
            <Pressable 
              style={[styles.iconOption, selectedIcon === 'morning' && styles.iconOptionSelected]}
              onPress={() => setSelectedIcon('morning')}
            >
              <Sun size={24} color={selectedIcon === 'morning' ? Colors.primary : Colors.text.secondary} />
              <Text style={[styles.iconText, selectedIcon === 'morning' && styles.iconTextSelected]}>아침</Text>
            </Pressable>
            <Pressable 
              style={[styles.iconOption, selectedIcon === 'day' && styles.iconOptionSelected]}
              onPress={() => setSelectedIcon('day')}
            >
              <AlarmClock size={24} color={selectedIcon === 'day' ? Colors.primary : Colors.text.secondary} />
              <Text style={[styles.iconText, selectedIcon === 'day' && styles.iconTextSelected]}>낮</Text>
            </Pressable>
            <Pressable 
              style={[styles.iconOption, selectedIcon === 'night' && styles.iconOptionSelected]}
              onPress={() => setSelectedIcon('night')}
            >
              <Moon size={24} color={selectedIcon === 'night' ? Colors.primary : Colors.text.secondary} />
              <Text style={[styles.iconText, selectedIcon === 'night' && styles.iconTextSelected]}>밤</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>소요 시간 (분)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={(text) => {
              setDuration(text);
              setError(null);
            }}
            keyboardType="numeric"
            placeholder="60"
            placeholderTextColor={Colors.text.tertiary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>할 일 목록</Text>
          {tasks.map((task, index) => (
            <View key={task.id} style={styles.taskContainer}>
              <TextInput
                style={styles.taskInput}
                value={task.text}
                onChangeText={(text) => handleTaskChange(task.id, text)}
                placeholder={`할 일 ${index + 1}`}
                placeholderTextColor={Colors.text.tertiary}
              />
              {tasks.length > 1 && (
                <Pressable 
                  onPress={() => handleRemoveTask(task.id)}
                  style={styles.removeTaskButton}
                >
                  <Trash2 size={20} color={Colors.error} />
                </Pressable>
              )}
            </View>
          ))}
          <Pressable style={styles.addTaskButton} onPress={handleAddTask}>
            <Plus size={20} color={Colors.primary} />
            <Text style={styles.addTaskText}>할 일 추가</Text>
          </Pressable>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  errorContainer: {
    backgroundColor: Colors.error + '15',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
  },
  iconSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconOption: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconOptionSelected: {
    backgroundColor: Colors.primary + '15',
  },
  iconText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text.secondary,
  },
  iconTextSelected: {
    color: Colors.primary,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskInput: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.text.primary,
    marginRight: 8,
  },
  removeTaskButton: {
    padding: 8,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  addTaskText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.primary,
  },
});