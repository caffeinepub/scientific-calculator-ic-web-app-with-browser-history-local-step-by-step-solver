import { useState, useCallback } from 'react';
import { tokenize } from '@/lib/calc/tokenize';
import { parse } from '@/lib/calc/parse';
import { evaluate } from '@/lib/calc/evaluate';
import { generateSteps } from '@/lib/calc/stepSolver';

export function useCalculator() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearAll = useCallback(() => {
    setDisplay('');
    setResult(null);
    setError(null);
  }, []);

  const backspace = useCallback(() => {
    setDisplay((prev) => prev.slice(0, -1));
    setResult(null);
    setError(null);
  }, []);

  const append = useCallback((value: string) => {
    setDisplay((prev) => prev + value);
    setResult(null);
    setError(null);
  }, []);

  const calculate = useCallback(() => {
    try {
      setError(null);
      const tokens = tokenize(display);
      const ast = parse(tokens);
      const evalResult = evaluate(ast);
      
      const resultStr = Number.isInteger(evalResult) 
        ? evalResult.toString() 
        : evalResult.toFixed(8).replace(/\.?0+$/, '');
      
      setResult(resultStr);
      
      const steps = generateSteps(display, tokens, ast, evalResult);
      
      return { expr: display, result: resultStr, steps };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Invalid expression';
      setError(errorMsg);
      setResult(null);
      return null;
    }
  }, [display]);

  const handleButtonClick = useCallback(
    (btn: string) => {
      if (btn === 'AC') {
        clearAll();
      } else if (btn === '⌫') {
        backspace();
      } else if (btn === '=') {
        const calcResult = calculate();
        if (calcResult) {
          // Trigger callback in parent
          return calcResult;
        }
      } else {
        append(btn);
      }
      return null;
    },
    [clearAll, backspace, calculate, append]
  );

  return {
    display,
    result,
    error,
    handleButtonClick,
    clearAll,
  };
}
