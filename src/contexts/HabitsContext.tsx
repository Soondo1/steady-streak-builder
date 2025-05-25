import { createContext, useContext, ReactNode } from 'react';
import { useHabits, HabitsState } from '@/hooks/useHabits';

const HabitsContext = createContext<HabitsState | undefined>(undefined);

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const habits = useHabits();
  
  return (
    <HabitsContext.Provider value={habits}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = (): HabitsState => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabitsContext must be used within a HabitsProvider');
  }
  return context;
}; 