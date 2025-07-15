
import React from 'react';
import { Code } from 'lucide-react';

interface KlickodeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function KlickodeLogo({ className = "", size = 'md' }: KlickodeLogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const codeIconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${iconSizes[size]} bg-primary-red rounded-lg flex items-center justify-center`}>
        <Code className={`${codeIconSizes[size]} text-white`} />
      </div>
      <span className={`${sizeClasses[size]} font-space-mono text-white`}>Klickode</span>
    </div>
  );
}
