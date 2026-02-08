import { useState } from 'react';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKeypad } from './CalculatorKeypad';
import { HistoryPanel } from '../history/HistoryPanel';
import { StepsPanel } from '../steps/StepsPanel';
import { useCalculator } from './useCalculator';
import { useLocalHistory } from '../history/useLocalHistory';
import { Calculator } from 'lucide-react';

export function CalculatorPage() {
  const { display, result, error, handleButtonClick, clearAll } = useCalculator();
  const { history, addToHistory, clearHistory } = useLocalHistory();
  const [steps, setSteps] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleCalculate = (expr: string, res: string, stepList: string[]) => {
    addToHistory(`${expr} = ${res}`);
    setSteps(stepList);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto w-full">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Scientific Calculator</h1>
              <p className="text-xs text-muted-foreground">Soumyajit Dutta</p>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {showHistory ? 'Calculator' : 'History'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {showHistory ? (
          <HistoryPanel history={history} onClear={clearHistory} />
        ) : (
          <>
            <CalculatorDisplay display={display} result={result} error={error} />
            <CalculatorKeypad onButtonClick={handleButtonClick} onCalculate={handleCalculate} />
            {steps.length > 0 && <StepsPanel steps={steps} />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
