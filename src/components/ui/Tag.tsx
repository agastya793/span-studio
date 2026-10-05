import React from 'react';

export type TagVariant = 'standard' | 'accent' | 'concept' | 'category';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
}

export function Tag({
  children,
  variant = 'standard',
  size = 'md',
  className = '',
}: TagProps) {
  const sizeClasses =
    size === 'sm'
      ? 'h-[22px] px-2.5 text-[10px] tracking-[0.06em]'
      : 'h-[26px] px-3 text-label';

  let variantClasses = '';
  switch (variant) {
    case 'accent':
      variantClasses =
        'bg-accent-subtle border border-border-accent text-accent-primary';
      break;
    case 'concept':
      variantClasses =
        'bg-bg-raised/80 border border-border-default text-text-muted backdrop-blur-sm';
      break;
    case 'category':
      variantClasses =
        'bg-bg-elevated border border-border-subtle text-metal-bright hover:border-border-strong transition-colors';
      break;
    case 'standard':
    default:
      variantClasses =
        'bg-bg-raised border border-border-default text-text-muted';
      break;
  }

  return (
    <span
      className={`inline-flex items-center justify-center font-body font-semibold uppercase rounded-full select-none whitespace-nowrap ${sizeClasses} ${variantClasses} ${className}`}
    >
      {variant === 'concept' && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-1.5" />
      )}
      {children}
    </span>
  );
}
