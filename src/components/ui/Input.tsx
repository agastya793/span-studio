import React, { forwardRef, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      required,
      id: customId,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={id}
            className="flex items-center justify-between text-caption font-mono uppercase tracking-wider text-text-secondary select-none"
          >
            <span>
              {label}
              {required && <span className="text-accent-primary ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={`w-full h-11 px-4 rounded-radius-sm bg-bg-elevated text-body-md text-text-primary placeholder:text-text-disabled border transition-all duration-200 outline-none ${
              error
                ? 'border-status-error focus:border-status-error focus:ring-2 focus:ring-status-error/30'
                : 'border-border-default hover:border-border-strong focus:border-border-accent focus:ring-2 focus:ring-accent-primary/20'
            } ${
              disabled
                ? 'opacity-50 cursor-not-allowed bg-bg-deep border-border-subtle select-none'
                : ''
            } ${className}`}
            {...props}
          />
        </div>

        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-caption font-mono text-status-error flex items-center gap-1.5 pt-0.5"
          >
            <span aria-hidden="true">⚠</span>
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p id={hintId} className="text-caption font-mono text-text-muted pt-0.5">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
