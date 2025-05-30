import { useState } from 'react';
import { RoutineTemplate } from '@/types';

export function useRoutines() {
  const [routines, setRoutines] = useState<RoutineTemplate[]>([
    {
      id: '1',
      name: '오전 집중 루틴',
      duration: 120,
      tasks: [
        { id: 't1', text: '이메일 확인 및 응답', completed: false },
        { id: 't2', text: '가장 중요한 업무 1개 처리', completed: false },
        { id: 't3', text: '팀 회의 준비', completed: false }
      ],
      icon: 'morning'
    },
    {
      id: '2',
      name: '야간 창작 루틴',
      duration: 120,
      tasks: [
        { id: 't1', text: '아이디어 스케치', completed: false },
        { id: 't2', text: '콘텐츠 제작', completed: false },
        { id: 't3', text: '내일 계획 정리', completed: false }
      ],
      icon: 'night'
    }
  ]);

  const addRoutine = (routine: RoutineTemplate) => {
    setRoutines(prev => [...prev, routine]);
  };

  const removeRoutine = (routineId: string) => {
    setRoutines(prev => prev.filter(routine => routine.id !== routineId));
  };

  const updateRoutine = (routineId: string, updates: Partial<RoutineTemplate>) => {
    setRoutines(prev => prev.map(routine => 
      routine.id === routineId ? { ...routine, ...updates } : routine
    ));
  };

  return {
    routines,
    addRoutine,
    removeRoutine,
    updateRoutine
  };
}