import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define our habit type directly
interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: string;
  target_days: string[];
  created_at: string;
  updated_at: string;
  start_date: string;
  color: string;
  icon: string;
  streak: number;
  total_check_ins: number;
}

interface CheckIn {
  id: string;
  habit_id: string;
  date: string;
  notes: string;
  created_at: string;
}

export interface HabitsState {
  habits: Habit[];
  activeHabit: Habit | null;
  isLoading: boolean;
  error: Error | null;
  createHabit: (habitData: Omit<Habit, 'id' | 'created_at' | 'updated_at' | 'streak' | 'total_check_ins'>) => Promise<Habit | null>;
  updateHabit: (id: string, habitData: Partial<Habit>) => Promise<Habit | null>;
  deleteHabit: (id: string) => Promise<void>;
  setActiveHabit: (habit: Habit | null) => void;
  createCheckIn: (checkInData: Omit<CheckIn, 'id' | 'created_at'>) => Promise<CheckIn | null>;
  getCheckIns: (habitId: string) => Promise<CheckIn[]>;
}

// Sample demo habit
const demoHabit: Habit = {
  id: uuidv4(),
  title: "Morning Exercise",
  description: "20 minutes of light exercise every morning",
  frequency: "daily",
  target_days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  start_date: new Date().toISOString(),
  color: "blue",
  icon: "activity",
  streak: 5,
  total_check_ins: 23
};

// Create a storage key for habits
const HABITS_STORAGE_KEY = 'local_habits';
const CHECKINS_STORAGE_KEY = 'local_checkins';

export const useHabits = (): HabitsState => {
  // Initialize with stored habits or demo habit if none exists
  const getInitialHabits = (): Habit[] => {
    if (typeof window === 'undefined') return [demoHabit];
    
    const storedHabits = localStorage.getItem(HABITS_STORAGE_KEY);
    if (storedHabits) {
      try {
        return JSON.parse(storedHabits);
      } catch (e) {
        console.error("Failed to parse stored habits", e);
      }
    }
    return [demoHabit];
  };

  const [habits, setHabits] = useState<Habit[]>(getInitialHabits);
  const [activeHabit, setActiveHabit] = useState<Habit | null>(habits[0] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Save habits to localStorage
  const saveHabits = (updatedHabits: Habit[]) => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(updatedHabits));
    setHabits(updatedHabits);
  };

  // Save check-ins to localStorage
  const saveCheckIns = (checkIns: CheckIn[]) => {
    localStorage.setItem(CHECKINS_STORAGE_KEY, JSON.stringify(checkIns));
  };

  // Get check-ins from localStorage
  const getStoredCheckIns = (): CheckIn[] => {
    if (typeof window === 'undefined') return [];
    
    const storedCheckIns = localStorage.getItem(CHECKINS_STORAGE_KEY);
    if (storedCheckIns) {
      try {
        return JSON.parse(storedCheckIns);
      } catch (e) {
        console.error("Failed to parse stored check-ins", e);
      }
    }
    return [];
  };

  // Create a new habit
  const createHabit = async (habitData: Omit<Habit, 'id' | 'created_at' | 'updated_at' | 'streak' | 'total_check_ins'>): Promise<Habit | null> => {
    try {
      const now = new Date().toISOString();
      const newHabit: Habit = {
        ...habitData,
        id: uuidv4(),
        created_at: now,
        updated_at: now,
        streak: 0,
        total_check_ins: 0
      };

      const updatedHabits = [newHabit, ...habits];
      saveHabits(updatedHabits);
      setActiveHabit(newHabit);
      return newHabit;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    }
  };

  // Update an existing habit
  const updateHabit = async (id: string, habitData: Partial<Habit>): Promise<Habit | null> => {
    try {
      const updatedHabits = habits.map(habit => {
        if (habit.id === id) {
          const updatedHabit = {
            ...habit,
            ...habitData,
            updated_at: new Date().toISOString()
          };
          
          // Update activeHabit if needed
          if (activeHabit && activeHabit.id === id) {
            setActiveHabit(updatedHabit);
          }
          
          return updatedHabit;
        }
        return habit;
      });
      
      saveHabits(updatedHabits);
      const updatedHabit = updatedHabits.find(h => h.id === id) || null;
      return updatedHabit;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    }
  };

  // Delete a habit
  const deleteHabit = async (id: string): Promise<void> => {
    try {
      const updatedHabits = habits.filter(habit => habit.id !== id);
      saveHabits(updatedHabits);
      
      // Update activeHabit if needed
      if (activeHabit && activeHabit.id === id) {
        const nextHabit = updatedHabits[0] || null;
        setActiveHabit(nextHabit);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  // Create a new check-in
  const createCheckIn = async (checkInData: Omit<CheckIn, 'id' | 'created_at'>): Promise<CheckIn | null> => {
    try {
      const newCheckIn: CheckIn = {
        ...checkInData,
        id: uuidv4(),
        created_at: new Date().toISOString()
      };

      const storedCheckIns = getStoredCheckIns();
      const updatedCheckIns = [newCheckIn, ...storedCheckIns];
      saveCheckIns(updatedCheckIns);
      
      // Update habit streak and total_check_ins
      const targetHabit = habits.find(h => h.id === checkInData.habit_id);
      if (targetHabit) {
        updateHabit(targetHabit.id, {
          streak: targetHabit.streak + 1,
          total_check_ins: targetHabit.total_check_ins + 1
        });
      }
      
      return newCheckIn;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    }
  };

  // Get check-ins for a specific habit
  const getCheckIns = async (habitId: string): Promise<CheckIn[]> => {
    try {
      const allCheckIns = getStoredCheckIns();
      return allCheckIns.filter(checkIn => checkIn.habit_id === habitId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return [];
    }
  };

  return {
    habits,
    activeHabit,
    isLoading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    setActiveHabit,
    createCheckIn,
    getCheckIns,
  };
}; 