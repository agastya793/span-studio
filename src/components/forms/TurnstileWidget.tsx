'use client';

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (error?: string) => void;
          'expired-callback'?: () => void;
          theme?: 'dark' | 'light' | 'auto';
          size?: 'invisible' | 'normal' | 'compact';
          action?: string;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export interface TurnstileRef {
  reset: () => void;
}

export interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: (error?: string) => void;
  onExpire?: () => void;
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
}

/**
 * Cloudflare Turnstile Invisible Verification Widget.
 * Handles client-side bot protection token generation.
 * In development, provides a safe fallback when site keys are not configured.
 */
export const TurnstileWidget = forwardRef<TurnstileRef, TurnstileWidgetProps>(
  function TurnstileWidget(
    { onSuccess, onError, onExpire, className = '', theme = 'dark' },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [devBypassActive, setDevBypassActive] = useState<boolean>(false);

    const siteKey =
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
      (process.env.NODE_ENV !== 'production'
        ? '1x00000000000000000000AA' // Cloudflare official test sitekey (always passes)
        : '');

    const isProduction = process.env.NODE_ENV === 'production';

    const reset = useCallback(() => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      } else if (!isProduction && devBypassActive) {
        // Re-issue dev token on reset
        onSuccess('dev-turnstile-token-' + Date.now());
      }
    }, [isProduction, devBypassActive, onSuccess]);

    useImperativeHandle(ref, () => ({
      reset,
    }));

    useEffect(() => {
      // In production without a sitekey, report error
      if (isProduction && !siteKey) {
        console.error(
          '[Turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY is required in production but missing.'
        );
        onError?.('Bot protection configuration is missing.');
        return;
      }

      let isMounted = true;
      let checkInterval: NodeJS.Timeout | null = null;

      const renderWidget = () => {
        if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;

        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme,
            size: 'invisible',
            action: 'contact_submission',
            callback: (token: string) => {
              if (isMounted) {
                onSuccess(token);
              }
            },
            'error-callback': (err?: string) => {
              console.warn('[Turnstile] Verification error:', err);
              if (isMounted) {
                // If in dev and test key fails or network blocked, activate dev mock
                if (!isProduction) {
                  setDevBypassActive(true);
                  onSuccess('dev-turnstile-token-fallback');
                } else {
                  onError?.(err || 'Bot protection verification failed.');
                }
              }
            },
            'expired-callback': () => {
              if (isMounted) {
                onExpire?.();
              }
            },
          });
        } catch (e) {
          console.warn('[Turnstile] Render error:', e);
          if (!isProduction && isMounted) {
            setDevBypassActive(true);
            onSuccess('dev-turnstile-token-fallback');
          }
        }
      };

      // Load Turnstile script if not present
      const scriptId = 'cloudflare-turnstile-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          if (!isProduction && isMounted) {
            console.warn('[Turnstile] Script failed to load (offline or blocked). Using dev fallback token.');
            setDevBypassActive(true);
            onSuccess('dev-turnstile-token-offline');
          } else if (isMounted) {
            onError?.('Failed to load bot protection script. Check network connection.');
          }
        };
        document.head.appendChild(script);
      }

      if (window.turnstile) {
        renderWidget();
      } else {
        checkInterval = setInterval(() => {
          if (window.turnstile) {
            if (checkInterval) clearInterval(checkInterval);
            renderWidget();
          }
        }, 100);

        // In dev: If script doesn't initialize within 3s, provide dev fallback token
        const timeout = setTimeout(() => {
          if (!widgetIdRef.current && !isProduction && isMounted) {
            console.warn('[Turnstile] Script init timeout in dev mode. Providing dev token.');
            setDevBypassActive(true);
            onSuccess('dev-turnstile-token-timeout');
          }
        }, 3000);

        return () => {
          clearTimeout(timeout);
          if (checkInterval) clearInterval(checkInterval);
          isMounted = false;
          if (widgetIdRef.current && window.turnstile) {
            try {
              window.turnstile.remove(widgetIdRef.current);
            } catch {
              // ignore cleanup error
            }
            widgetIdRef.current = null;
          }
        };
      }

      return () => {
        isMounted = false;
        if (checkInterval) clearInterval(checkInterval);
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore cleanup error
          }
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, isProduction, onSuccess, onError, onExpire, theme]);

    return (
      <div className={className}>
        <div ref={containerRef} aria-hidden="true" />
        {devBypassActive && !isProduction && (
          <p className="text-[10px] font-mono text-metal-mid mt-1">
            [Dev Mode: Cloudflare Turnstile dev token active]
          </p>
        )}
      </div>
    );
  }
);
