import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'hero' | 'success' | 'warning' | 'bank' | 'black';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  glow?: boolean;
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'default',
  size = 'default',
  glow = false,
  className,
  children,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'gradient-beneficiary text-white hover:shadow-glow';
      case 'success':
        return 'gradient-success text-white hover:shadow-[0_0_20px_hsl(var(--success)/0.5)]';
      case 'warning':
        return 'bg-warning text-warning-foreground hover:shadow-[0_0_20px_hsl(var(--warning)/0.5)]';
      case 'bank':
        return 'gradient-bank text-white hover:shadow-bank';
      case 'black':
        return 'gradient-black text-white hover:shadow-[0_0_20px_hsl(0_0%_0%/0.5)]';
      default:
        return '';
    }
  };

  return (
    <Button
      className={cn(
        'btn-hover btn-bounce transition-smooth',
        glow && 'btn-glow',
        getVariantClasses(),
        className
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;