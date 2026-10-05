'use client';

import { useEffect, useLayoutEffect, useRef, DependencyList, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// In browser environments use layout effect for DOM measurements, in SSR fallback to effect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface UseGSAPOptions {
  scope?: RefObject<Element | null | undefined>;
  dependencies?: DependencyList;
  revertOnUpdate?: boolean;
}

export type GSAPContextCallback = (
  contextOrGsap: typeof gsap,
  isReducedMotion: boolean
) => void;

/**
 * Checks client-side prefers-reduced-motion setting
 */
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Lifecycle-safe hook for GSAP animations with gsap.context(),
 * automatic cleanup on unmount, ScrollTrigger registration,
 * and prefers-reduced-motion safety.
 *
 * When reduced motion is enabled:
 * - ScrollTriggers are bypassed
 * - Animations should not execute or content remains in its natural visible state.
 */
export function useGSAP(
  scopeOrCallback:
    | RefObject<Element | null | undefined>
    | GSAPContextCallback,
  callbackOrOptions?: GSAPContextCallback | DependencyList | UseGSAPOptions,
  optionsOrDependencies?: DependencyList | UseGSAPOptions
) {
  let scopeRef: RefObject<Element | null | undefined> | undefined;
  let callback: GSAPContextCallback;
  let options: UseGSAPOptions = {};

  if (
    typeof scopeOrCallback === 'object' &&
    scopeOrCallback !== null &&
    'current' in scopeOrCallback
  ) {
    scopeRef = scopeOrCallback as RefObject<Element | null | undefined>;
    callback = callbackOrOptions as GSAPContextCallback;
    if (Array.isArray(optionsOrDependencies)) {
      options = { dependencies: optionsOrDependencies };
    } else if (optionsOrDependencies && typeof optionsOrDependencies === 'object') {
      options = optionsOrDependencies as unknown as UseGSAPOptions;
    }
  } else {
    callback = scopeOrCallback as GSAPContextCallback;
    if (Array.isArray(callbackOrOptions)) {
      options = { dependencies: callbackOrOptions };
    } else if (callbackOrOptions && typeof callbackOrOptions === 'object') {
      options = callbackOrOptions as unknown as UseGSAPOptions;
      if (options.scope) {
        scopeRef = options.scope;
      }
    }
  }

  const { dependencies = [], revertOnUpdate = true } = options;

  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const isReducedMotion = checkPrefersReducedMotion();

    // When reduced motion is enabled:
    // Do not create ScrollTriggers, animations are skipped, content remains in final visible state.
    if (isReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      callbackRef.current(gsap, false);
    }, scopeRef?.current || undefined);

    return () => {
      if (revertOnUpdate) {
        ctx.revert();
      }
    };
  }, dependencies);
}
