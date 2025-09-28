import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  bankTheme?: boolean;
  style?: React.CSSProperties;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hover = true,
  gradient = false,
  bankTheme = false,
  style,
}) => {
  return (
    <Card
      className={cn(
        'animate-fade-in-scale',
        hover && 'card-hover',
        gradient && !bankTheme && 'gradient-card',
        gradient && bankTheme && 'gradient-bank-card',
        bankTheme && 'border-bank-border text-bank-card-foreground',
        className
      )}
      style={style}
    >
      {children}
    </Card>
  );
};

export default AnimatedCard;