'use client';

import { useState, useEffect } from 'react';
import { LoadForm } from '@/components/load-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dataStore } from '@/lib/datastore';
import { type LoadData, type NewLoadData } from '@/lib/datastore/types';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Clock } from 'lucide-react';
import PentagonBackground from '@/components/pentagon-background';

export default function Home() {
  const [savedData, setSavedData] = useState<LoadData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuth(); // AuthGate placeholder
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    if (user.isAuthenticated) {
      const data = dataStore.get();
      setSavedData(data);
    }
  }, [user.isAuthenticated]);
  
  const handleSave = (data: NewLoadData) => {
    try {
      const updatedData = dataStore.set(data);
      setSavedData(updatedData);
      toast({
        title: 'Success!',
        description: 'Load data has been saved.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error saving data',
        description: (error as Error).message,
      });
    }
  };

  const handleDelete = () => {
    try {
      dataStore.delete();
      setSavedData(null);
      toast({
        title: 'Data Deleted',
        description: 'The saved load data has been removed.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error deleting data',
        description: (error as Error).message,
      });
    }
  };
  
  return (
    <main className="screen text-foreground">
      <div className="scene">
        <div className="pentagon-layer">
          <PentagonBackground />
        </div>
        <div className="form-layer">
          <div className="w-full max-w-2xl flex flex-col items-center">
            <LoadForm
              initialData={savedData}
              onSave={handleSave}
              onDelete={handleDelete}
            />
            {isClient && savedData && (
              <Card className="mt-6 w-full max-w-2xl shadow-lg animate-in fade-in-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Clock size={20} /> Last Saved</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Created:</strong> {new Date(savedData.createdAt).toLocaleString()}</p>
                  <p><strong>Updated:</strong> {new Date(savedData.updatedAt).toLocaleString()}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
