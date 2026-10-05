import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export function Container({
  children,
  className = '',
  as: Component = 'div',
  id,
  ...props
}: ContainerProps) {
  return React.createElement(
    Component,
    {
      id,
      className: `w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-20 ${className}`,
      ...props,
    },
    children
  );
}
