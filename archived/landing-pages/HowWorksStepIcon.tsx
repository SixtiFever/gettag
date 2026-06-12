import type { LucideIcon } from 'lucide-react';

interface HowWorksStepIconProps {
  icon: LucideIcon;
}

/** Square tile with a Lucide stroke icon (Record / Tag / Grow). */
export function HowWorksStepIcon({ icon: Icon }: HowWorksStepIconProps) {
  return (
    <div className="new-landing__how-step-icon-wrap" aria-hidden="true">
      <Icon className="new-landing__how-step-icon" strokeWidth={1.75} />
    </div>
  );
}
