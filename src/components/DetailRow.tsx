import { ReactNode } from 'react';

interface DetailRowProps {
  label: string;
  value: ReactNode;
}

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
