
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [habitData, setHabitData] = useState({
    name: '',
    type: '',
    baseline: 0,
    unit: '',
    goal: ''
  });

  const habitTypes = [
    { value: 'physical', label: 'Physical', icon: '💪', description: 'Exercise, stretching, walking' },
    { value: 'mental', label: 'Mental', icon: '🧠', description: 'Reading, learning, meditation' },
    { value: 'creative', label: 'Creative', icon: '🎨', description: 'Writing, drawing, music' },
    { value: 'productivity', label: 'Productivity', icon: '⚡', description: 'Organization, planning, focus' },
    { value: 'wellness', label: 'Wellness', icon: '🌱', description: 'Sleep, nutrition, mindfulness' },
    { value: 'social', label: 'Social', icon: '👥', description: 'Networking, relationships, community' }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate kickstart values
      const kickstartValue = Math.ceil(habitData.baseline * 0.75);
      const completeHabitData = {
        ...habitData,
        kickstartValue,
        currentPhase: 'kickstart',
        currentDay: 1,
        setsPerDay: 2,
        completedSessions: [],
        startDate: new Date()
      };
      onComplete(completeHabitData);
    }
  };

  const updateHabitData = (field, value) => {
    setHabitData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  i <= step 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i < step ? <CheckCircle className="w-5 h-5" /> : i}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome to HabitFlow</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Build lasting habits with our proven 4-phase workflow system. We'll start easy and gradually increase your commitment for sustainable growth.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800">Baseline</h3>
                  <p className="text-sm text-blue-600">Find your starting point</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Kickstart</h3>
                  <p className="text-sm text-green-600">Start with 75% effort</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-800">Progress</h3>
                  <p className="text-sm text-purple-600">Gradually increase</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Habit Type</h2>
                <p className="text-gray-600">Select the category that best fits your goal</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habitTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateHabitData('type', type.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                      habitData.type === type.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{type.label}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Define Your Habit</h2>
                <p className="text-gray-600">Give your habit a name and describe what you want to achieve</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="habitName" className="text-gray-700 font-medium">Habit Name</Label>
                  <Input
                    id="habitName"
                    placeholder="e.g., Morning Journaling, Push-ups, Reading"
                    value={habitData.name}
                    onChange={(e) => updateHabitData('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="unit" className="text-gray-700 font-medium">Unit of Measurement</Label>
                  <Input
                    id="unit"
                    placeholder="e.g., minutes, pages, reps, words"
                    value={habitData.unit}
                    onChange={(e) => updateHabitData('unit', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="goal" className="text-gray-700 font-medium">What's your goal? (Optional)</Label>
                  <Textarea
                    id="goal"
                    placeholder="Describe what you hope to achieve with this habit..."
                    value={habitData.goal}
                    onChange={(e) => updateHabitData('goal', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Set Your Baseline</h2>
                <p className="text-gray-600">
                  Do your maximum effort for "{habitData.name}" right now and enter the result
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Why baseline matters:</h3>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• Gives us your current capacity</li>
                  <li>• Helps calculate your 75% kickstart level</li>
                  <li>• Creates a reference point for progress</li>
                </ul>
              </div>
              <div>
                <Label htmlFor="baseline" className="text-gray-700 font-medium">
                  Your maximum {habitData.unit} right now
                </Label>
                <Input
                  id="baseline"
                  type="number"
                  placeholder="Enter your baseline number"
                  value={habitData.baseline}
                  onChange={(e) => updateHabitData('baseline', parseInt(e.target.value) || 0)}
                  className="mt-1 text-lg"
                />
              </div>
              {habitData.baseline > 0 && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800">
                    <strong>Your kickstart target:</strong> {Math.ceil(habitData.baseline * 0.75)} {habitData.unit} 
                    × 2 sessions per day for the first 5 days
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (step === 2 && !habitData.type) ||
                (step === 3 && (!habitData.name || !habitData.unit)) ||
                (step === 4 && !habitData.baseline)
              }
              className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {step === 4 ? 'Start My Journey' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
