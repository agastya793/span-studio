import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  className = '',
  fullWidth = false,
  target,
  rel,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium font-body rounded-radius-sm transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeClasses = {
    sm: 'h-9 px-3.5 text-button-sm uppercase tracking-wider',
    md: 'h-11 px-5 text-button-md tracking-wide',
    lg: 'h-13 px-7 text-button-lg tracking-wide',
  }[size];

  const variantClasses = {
    primary:
      'bg-accent-primary text-white hover:bg-accent-hover active:bg-accent-pressed shadow-accent hover:shadow-glow border border-transparent font-semibold',
    secondary:
      'bg-white hover:bg-bg-raised text-text-primary hover:text-brand-charcoal border border-border-strong hover:border-text-primary shadow-sm font-semibold',
    ghost:
      'bg-transparent hover:bg-bg-raised text-text-secondary hover:text-text-primary border border-transparent font-medium',
    whatsapp:
      'bg-brand-green hover:bg-brand-green-hover text-white border border-brand-green shadow-sm font-semibold',
  }[variant];

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`;

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <span className="mr-2 flex items-center">{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="ml-2 flex items-center">{icon}</span>}
    </>
  );

  if (href) {
    const isExternal =
      href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a
          href={href}
          onClick={onClick}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          aria-label={ariaLabel}
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} aria-label={ariaLabel} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={combinedClasses}
    >
      {content}
    </button>
  );
}
