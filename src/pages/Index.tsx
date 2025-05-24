
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, TrendingUp, Clock, CheckCircle, Star } from 'lucide-react';
import OnboardingFlow from '@/components/OnboardingFlow';
import HabitDashboard from '@/components/HabitDashboard';
import ProgressTracker from '@/components/ProgressTracker';

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeHabit, setActiveHabit] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = (habitData) => {
    setActiveHabit(habitData);
    setShowOnboarding(false);
    setCurrentUser({ name: 'User', joinDate: new Date() });
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HabitFlow
                </h1>
                <p className="text-sm text-gray-500">Workflow-Based Habit Building</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => setShowOnboarding(true)}
                className="text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                New Habit
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            <HabitDashboard habit={activeHabit} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProgressTracker habit={activeHabit} />
            
            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Your Journey
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Current Streak</span>
                  <Badge className="bg-green-600 text-white">5 days</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Total Sessions</span>
                  <span className="font-semibold text-green-800">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Phase Progress</span>
                  <span className="font-semibold text-green-800">Kickstart</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
