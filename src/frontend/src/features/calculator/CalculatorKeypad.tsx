import { Button } from '@/components/ui/button';

const buttons: string[][] = [
  ['AC', '⌫', '(', ')'],
  ['sin', 'cos', 'tan', '√'],
  ['log', 'ln', 'x²', 'x^y'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '−'],
  ['0', '.', '±', '+'],
  ['π', 'e', '!', '='],
];

interface CalculatorKeypadProps {
  onButtonClick: (btn: string) => void;
  onCalculate: (expr: string, result: string, steps: string[]) => void;
}

export function CalculatorKeypad({ onButtonClick, onCalculate }: CalculatorKeypadProps) {
  const getButtonVariant = (btn: string) => {
    if (btn === '=') return 'default';
    if (btn === 'AC' || btn === '⌫') return 'destructive';
    if (['sin', 'cos', 'tan', '√', 'log', 'ln', 'x²', 'x^y', 'π', 'e', '!', '±'].includes(btn)) {
      return 'secondary';
    }
    if (['+', '−', '×', '÷', '(', ')'].includes(btn)) return 'outline';
    return 'ghost';
  };

  const handleClick = (btn: string) => {
    onButtonClick(btn);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4">
      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((btn, idx) => (
          <Button
            key={`${btn}-${idx}`}
            variant={getButtonVariant(btn)}
            size="lg"
            onClick={() => handleClick(btn)}
            className={`h-14 text-base font-semibold ${
              btn === '=' ? 'col-span-4' : ''
            }`}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
}
