import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, Lock } from 'lucide-react';

interface StepsPanelProps {
  steps: string[];
  isPremium: boolean;
}

export function StepsPanel({ steps, isPremium }: StepsPanelProps) {
  // Show only first 2 steps for non-premium users
  const displaySteps = isPremium ? steps : steps.slice(0, 2);
  const hasMoreSteps = steps.length > 2;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <Accordion type="single" collapsible defaultValue="steps">
        <AccordionItem value="steps" className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">Step-by-Step Solution</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-2">
              {displaySteps.map((step, index) => (
                <div
                  key={index}
                  className="p-3 bg-accent/30 rounded-lg text-sm text-foreground/90"
                >
                  <span className="font-semibold text-primary mr-2">{index + 1}.</span>
                  {step}
                </div>
              ))}
              
              {!isPremium && hasMoreSteps && (
                <div className="p-4 bg-muted/50 rounded-lg text-center border border-dashed border-border">
                  <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Unlock Premium for Full Solution
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Get access to all {steps.length} detailed steps and complete explanations
                  </p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
