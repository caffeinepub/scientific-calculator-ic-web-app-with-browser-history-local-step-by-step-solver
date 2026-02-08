import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb } from 'lucide-react';

interface StepsPanelProps {
  steps: string[];
}

export function StepsPanel({ steps }: StepsPanelProps) {
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
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="p-3 bg-accent/30 rounded-lg text-sm text-foreground/90"
                >
                  <span className="font-semibold text-primary mr-2">{index + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
