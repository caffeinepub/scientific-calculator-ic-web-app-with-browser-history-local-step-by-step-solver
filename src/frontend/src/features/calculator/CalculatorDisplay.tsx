interface CalculatorDisplayProps {
  display: string;
  result: string | null;
  error: string | null;
}

export function CalculatorDisplay({ display, result, error }: CalculatorDisplayProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
      <div className="flex flex-col gap-2">
        {/* Expression */}
        <div className="min-h-[3rem] flex items-center justify-end">
          <input
            type="text"
            value={display}
            readOnly
            className="w-full text-right text-2xl font-medium bg-transparent border-none outline-none text-foreground"
            placeholder="0"
          />
        </div>
        
        {/* Result or Error */}
        <div className="min-h-[2.5rem] flex items-center justify-end border-t border-border pt-2">
          {error ? (
            <p className="text-lg text-destructive font-medium">{error}</p>
          ) : result !== null ? (
            <p className="text-xl text-muted-foreground font-semibold">= {result}</p>
          ) : (
            <p className="text-xl text-muted-foreground/40">...</p>
          )}
        </div>
      </div>
    </div>
  );
}
