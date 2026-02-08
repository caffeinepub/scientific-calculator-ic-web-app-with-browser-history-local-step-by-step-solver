import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  history: string[];
  onClear: () => void;
}

export function HistoryPanel({ history, onClear }: HistoryPanelProps) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Calculation History</h2>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={onClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm flex-1 overflow-hidden">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8">
            <p className="text-muted-foreground text-center">
              No calculations yet.
              <br />
              Start calculating to see your history here.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="p-3 bg-accent/50 rounded-lg text-sm font-mono text-foreground hover:bg-accent transition-colors"
                >
                  {entry}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
