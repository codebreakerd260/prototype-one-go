import { ReactNode } from 'react';

interface TipItemProps {
  icon: ReactNode;
  text: string;
  isRecommendation: boolean;
}

export default function TipItem({ icon, text, isRecommendation }: TipItemProps) {
  return (
    <li className="flex items-start gap-3">
      {icon}
      <span className={!isRecommendation ? 'text-muted-foreground' : ''}>{text}</span>
    </li>
  );
}
