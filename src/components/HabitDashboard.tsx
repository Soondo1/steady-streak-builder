
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Target, Clock, TrendingUp, Play, Pause } from 'lucide-react';

const HabitDashboard = ({ habit }) => {
  const [completedToday, setCompletedToday] = useState(0);
  const [isActive, setIsActive] = useState(false);

  if (!habit) return null;

  const handleCompleteSession = () => {
    if (completedToday < habit.setsPerDay) {
      setCompletedToday(prev => prev + 1);
    }
  };

  const getPhaseInfo = () => {
    switch (habit.currentPhase) {
      case 'kickstart':
        return {
          name: 'Kickstart Phase',
          description: 'Building consistency with 75% effort',
          color: 'blue',
          icon: Play,
          daysRemaining: 5 - habit.currentDay + 1
        };
      case 'progressive':
        return {
          name: 'Progressive Build',
          description: 'Gradually increasing intensity',
          color: 'green',
          icon: TrendingUp,
          daysRemaining: 5
        };
      case 'optimization':
        return {
          name: 'Optimization Phase',
          description: 'Maintaining and optimizing',
          color: 'purple',
          icon: Target,
          daysRemaining: null
        };
      default:
        return {
          name: 'Getting Started',
          description: 'Ready to begin',
          color: 'gray',
          icon: Circle,
          daysRemaining: null
        };
    }
  };

  const phaseInfo = getPhaseInfo();
  const todayProgress = (completedToday / habit.setsPerDay) * 100;

  return (
    <div className="space-y-6">
      {/* Current Habit Overview */}
      <Card className="p-6 bg-gradient-to-r from-white to-blue-50 border-blue-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{habit.name}</h2>
            <div className="flex items-center space-x-3">
              <Badge className={`bg-${phaseInfo.color}-100 text-${phaseInfo.color}-800 border-${phaseInfo.color}-200`}>
                <phaseInfo.icon className="w-3 h-3 mr-1" />
                {phaseInfo.name}
              </Badge>
              <span className="text-sm text-gray-600">Day {habit.currentDay}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {habit.kickstartValue}
            </div>
            <div className="text-sm text-gray-600">{habit.unit} per session</div>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{phaseInfo.description}</p>
        {phaseInfo.daysRemaining && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-700 text-sm">
              {phaseInfo.daysRemaining} days remaining in this phase
            </p>
          </div>
        )}
      </Card>

      {/* Today's Sessions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Today's Sessions</h3>
          <Badge variant={completedToday === habit.setsPerDay ? "default" : "secondary"}>
            {completedToday}/{habit.setsPerDay} completed
          </Badge>
        </div>
        
        <div className="space-y-4">
          <Progress value={todayProgress} className="h-3" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: habit.setsPerDay }, (_, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  i < completedToday
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Session {i + 1}</p>
                    <p className="text-sm text-gray-600">
                      {habit.kickstartValue} {habit.unit}
                    </p>
                  </div>
                  {i < completedToday ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleCompleteSession}
              disabled={completedToday >= habit.setsPerDay}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Session
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsActive(!isActive)}
              className="px-6"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Phase Timeline */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Journey Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Kickstart Phase</h4>
              <p className="text-sm text-blue-600">Days 1-5: {Math.ceil(habit.baseline * 0.75)} {habit.unit} × 2 sessions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-600">Progressive Build</h4>
              <p className="text-sm text-gray-500">Retest max every 5 days, increase sets</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-600">Optimization</h4>
              <p className="text-sm text-gray-500">Maintain routine, track advanced metrics</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HabitDashboard;
