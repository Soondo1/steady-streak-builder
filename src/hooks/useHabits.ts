import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Database } from '@/integrations/supabase/types';

type Habit = Database['public']['Tables']['habits']['Row'];
type CheckIn = Database['public']['Tables']['check_ins']['Row'];

export interface HabitsState {
  habits: Habit[];
  activeHabit: Habit | null;
  isLoading: boolean;
  error: Error | null;
  createHabit: (habitData: Omit<Database['public']['Tables']['habits']['Insert'], 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Habit | null>;
  updateHabit: (id: string, habitData: Partial<Database['public']['Tables']['habits']['Update']>) => Promise<Habit | null>;
  deleteHabit: (id: string) => Promise<void>;
  setActiveHabit: (habit: Habit | null) => void;
  createCheckIn: (checkInData: Omit<Database['public']['Tables']['check_ins']['Insert'], 'id' | 'user_id' | 'created_at'>) => Promise<CheckIn | null>;
  getCheckIns: (habitId: string) => Promise<CheckIn[]>;
}

export const useHabits = (): HabitsState => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeHabit, setActiveHabit] = useState<Habit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch habits for the current user
  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) {
        setHabits([]);
        setActiveHabit(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('habits')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setHabits(data || []);
        if (data && data.length > 0 && !activeHabit) {
          setActiveHabit(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [user]);

  // Create a new habit
  const createHabit = async (habitData: Omit<Database['public']['Tables']['habits']['Insert'], 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('habits')
        .insert({
          ...habitData,
          user_id: user.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setHabits(prev => [data, ...prev]);
      setActiveHabit(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    }
  };

  // Update an existing habit
  const updateHabit = async (id: string, habitData: Partial<Database['public']['Tables']['habits']['Update']>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('habits')
        .update({
          ...habitData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update the habits array
      setHabits(prev => prev.map(habit => (habit.id === id ? data : habit)));
      
      // Update activeHabit if needed
      if (activeHabit && activeHabit.id === id) {
        setActiveHabit(data);
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    }
  };

  // Delete a habit
  const deleteHabit = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update the habits array
      setHabits(prev => prev.filter(habit => habit.id !== id));
      
      // Update activeHabit if needed
      if (activeHabit && activeHabit.id === id) {
        const nextHabit = habits.find(habit => habit.id !== id);
        setActiveHabit(nextHabit || null);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  // Create a new check-in
  const createCheckIn = async (checkInData: Omit<Database['public']['Tables']['check_ins']['Insert'], 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('check_ins')
        .insert({
          ...checkInData,
          user_id: user.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return null;
    }
  };

  // Get check-ins for a specific habit
  const getCheckIns = async (habitId: string): Promise<CheckIn[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq('habit_id', habitId)
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
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