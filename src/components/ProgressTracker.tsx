import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { HabitData } from './OnboardingFlow';

interface ProgressTrackerProps {
  habit: HabitData | null;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ habit }) => {
  if (!habit) return null;

  // Generate calendar view for current week
  const generateWeekView = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();
    
    return days.map((day, index) => {
      const isPast = index < today - 1;
      const isToday = index === today - 1;
      const isCompleted = isPast || (isToday && Math.random() > 0.3); // Mock completion
      
      return {
        day,
        isPast,
        isToday,
        isCompleted
      };
    });
  };

  const weekData = generateWeekView();

  return (
    <div className="space-y-6">
      {/* Weekly Calendar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            This Week
          </h3>
          <Badge className="bg-blue-100 text-blue-800">Week 1</Badge>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekData.map((dayData, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{dayData.day}</div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                  dayData.isCompleted
                    ? 'bg-green-500 text-white shadow-md'
                    : dayData.isToday
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {dayData.isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Progress Metrics */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
        <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Progress Metrics
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-purple-700">Baseline Growth</span>
            <div className="text-right">
              <div className="font-semibold text-purple-800">{habit.baseline} → {habit.baseline}</div>
              <div className="text-xs text-purple-600">No change yet</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-purple-700">Total Volume</span>
            <div className="text-right">
              <div className="font-semibold text-purple-800">{(habit.kickstartValue || 0) * 8}</div>
              <div className="text-xs text-purple-600">{habit.unit} completed</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-purple-700">Consistency Rate</span>
            <div className="text-right">
              <div className="font-semibold text-purple-800">80%</div>
              <div className="text-xs text-purple-600">4/5 days</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Upcoming Milestone */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-100">
        <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Next Milestone
        </h3>
        <div className="space-y-2">
          <p className="text-orange-700 font-medium">Phase Reassessment</p>
          <p className="text-sm text-orange-600">
            Complete your kickstart phase and retest your maximum capacity
          </p>
          <Badge className="bg-orange-200 text-orange-800 text-xs">
            In 1 day
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracker;
