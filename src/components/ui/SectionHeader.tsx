import React from 'react';

export interface SectionHeaderProps {
  overline: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  note?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeader({
  overline,
  heading,
  description,
  note,
  align = 'left',
  className = '',
  as: Component = 'h2',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-8 lg:mb-12 ${
        isCenter ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
    >
      <span className="text-overline block mb-3 font-semibold tracking-[0.12em]">
        {overline}
      </span>

      <Component
        className={`text-display-md lg:text-display-lg text-text-primary tracking-tight font-display mb-4 ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        {heading}
      </Component>

      {description && (
        <div
          className={`text-body-md lg:text-body-lg text-text-secondary leading-relaxed max-w-2xl ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {description}
        </div>
      )}

      {note && (
        <p
          className={`mt-3 text-caption text-text-muted italic ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
}
