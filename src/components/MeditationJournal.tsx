
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Plus, Trash2, Calendar } from 'lucide-react';
import { JournalEntry } from '../types/session';

interface MeditationJournalProps {
  entries: JournalEntry[];
  onAddEntry: (content: string, sessionId?: string) => void;
  onDeleteEntry: (entryId: string) => void;
}

const MeditationJournal: React.FC<MeditationJournalProps> = ({ 
  entries, 
  onAddEntry, 
  onDeleteEntry 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntryContent, setNewEntryContent] = useState('');

  const handleAddEntry = () => {
    if (newEntryContent.trim()) {
      onAddEntry(newEntryContent);
      setNewEntryContent('');
      setShowAddForm(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Meditation Journal
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
            <Textarea
              placeholder="Write about your meditation experience, insights, or feelings..."
              value={newEntryContent}
              onChange={(e) => setNewEntryContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddEntry} size="sm">
                Save Entry
              </Button>
              <Button 
                onClick={() => {
                  setShowAddForm(false);
                  setNewEntryContent('');
                }} 
                variant="outline" 
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {sortedEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No journal entries yet. Start documenting your meditation journey!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {formatDate(entry.timestamp)}
                  </div>
                  <Button
                    onClick={() => onDeleteEntry(entry.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {entry.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeditationJournal;
