
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Plus, Target, CheckCircle, Edit, Check, X } from 'lucide-react';
import { SessionGoal } from '../types/session';

interface SessionGoalsProps {
  goals: SessionGoal[];
  onCreateGoal: (title: string, description: string, targetSessions: number) => void;
  onUpdateGoal: (goalId: string, title: string, description: string, targetSessions: number) => void;
  onCompleteGoal: (goalId: string) => void;
}

const SessionGoals: React.FC<SessionGoalsProps> = ({ 
  goals, 
  onCreateGoal, 
  onUpdateGoal, 
  onCompleteGoal 
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetSessions: 7
  });
  const [editGoal, setEditGoal] = useState({
    title: '',
    description: '',
    targetSessions: 7
  });

  const handleCreateGoal = () => {
    if (newGoal.title.trim()) {
      onCreateGoal(newGoal.title, newGoal.description, newGoal.targetSessions);
      setNewGoal({ title: '', description: '', targetSessions: 7 });
      setShowCreateForm(false);
    }
  };

  const handleEditGoal = (goal: SessionGoal) => {
    setEditingGoal(goal.id);
    setEditGoal({
      title: goal.title,
      description: goal.description,
      targetSessions: goal.targetSessions
    });
  };

  const handleUpdateGoal = (goalId: string) => {
    if (editGoal.title.trim()) {
      onUpdateGoal(goalId, editGoal.title, editGoal.description, editGoal.targetSessions);
      setEditingGoal(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
    setEditGoal({ title: '', description: '', targetSessions: 7 });
  };

  const getProgressPercentage = (goal: SessionGoal) => {
    return Math.min((goal.completedSessions / goal.targetSessions) * 100, 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Meditation Goals
          </CardTitle>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showCreateForm && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
            <Input
              placeholder="Goal title (e.g., 'Meditate daily for a week')"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
            <Textarea
              placeholder="Description (optional)"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              rows={2}
            />
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Target sessions:</label>
              <Input
                type="number"
                min="1"
                max="365"
                value={newGoal.targetSessions}
                onChange={(e) => setNewGoal({ ...newGoal, targetSessions: parseInt(e.target.value) || 1 })}
                className="w-20"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateGoal} size="sm">
                Create Goal
              </Button>
              <Button onClick={() => setShowCreateForm(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {goals.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No goals set yet. Create your first meditation goal!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border ${
                  goal.completedAt 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                {editingGoal === goal.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editGoal.title}
                      onChange={(e) => setEditGoal({ ...editGoal, title: e.target.value })}
                      placeholder="Goal title"
                    />
                    <Textarea
                      value={editGoal.description}
                      onChange={(e) => setEditGoal({ ...editGoal, description: e.target.value })}
                      placeholder="Description (optional)"
                      rows={2}
                    />
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Target sessions:</label>
                      <Input
                        type="number"
                        min="1"
                        max="365"
                        value={editGoal.targetSessions}
                        onChange={(e) => setEditGoal({ ...editGoal, targetSessions: parseInt(e.target.value) || 1 })}
                        className="w-20"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleUpdateGoal(goal.id)} size="sm">
                        <Check className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm">
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2">
                          {goal.completedAt && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {goal.title}
                        </h4>
                        {goal.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {goal.description}
                          </p>
                        )}
                      </div>
                      {!goal.completedAt && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditGoal(goal)}
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {goal.completedSessions >= goal.targetSessions && (
                            <Button
                              onClick={() => onCompleteGoal(goal.id)}
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {goal.completedSessions} / {goal.targetSessions} sessions
                        </span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(goal)} 
                        className="h-2"
                      />
                      {goal.completedAt && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          ✅ Completed on {goal.completedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionGoals;
