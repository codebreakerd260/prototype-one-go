import { ReactNode } from 'react';

interface StatCardProps {
  number: string;
  label: string;
  icon: ReactNode;
}

export default function StatCard({ number, label, icon }: StatCardProps) {
  return (
    <div className="text-center p-8 rounded-2xl bg-muted/50 hover:bg-muted transition-colors animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
        {icon}
      </div>
      <div className="text-5xl font-bold text-primary mb-2">{number}</div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
}
