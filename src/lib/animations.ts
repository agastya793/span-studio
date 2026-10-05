import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════
// SPAN STUDIO — ANIMATION SYSTEM CONSTANTS
// Phase 7: GSAP Cinematic Scroll & Reveal System
// ═══════════════════════════════════════════════════════

export const DURATION = {
  INSTANT: 0.15,
  FAST: 0.35,
  NORMAL: 0.6,
  DELIBERATE: 0.8,
  SLOW: 0.9,
  CINEMATIC: 1.2,
} as const;

export const EASE = {
  CINEMATIC: 'power3.out',
  SMOOTH: 'power2.out',
  EXPO: 'expo.out',
  BACK: 'back.out(1.4)',
  IN_OUT: 'power2.inOut',
} as const;

export const STAGGER = {
  FAST: 0.04,
  CARD_60MS: 0.06, // Specified 60ms stagger for positioning and capability cards
  NORMAL: 0.08,
  SLOW: 0.12,
} as const;

export const DISTANCE = {
  MICRO: 10,
  SM: 16,
  SUBTLE: 18,
  MD: 24,
  NORMAL: 28,
  LG: 32,
  DEEP: 48,
} as const;

// ═══════════════════════════════════════════════════════
// REUSABLE ANIMATION PRESET HELPERS
// ═══════════════════════════════════════════════════════

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  distance?: number;
  stagger?: number;
  scrollTrigger?: boolean | ScrollTrigger.Vars;
  trigger?: gsap.DOMTarget;
  start?: string;
  onComplete?: () => void;
}

/**
 * Standard cinematic Fade-In-Up animation
 */
export function fadeInUp(target: gsap.DOMTarget, options: AnimationOptions = {}) {
  const {
    duration = DURATION.NORMAL,
    delay = 0,
    ease = EASE.CINEMATIC,
    distance = DISTANCE.NORMAL,
    scrollTrigger,
    trigger = target,
    start = 'top 85%',
    onComplete,
  } = options;

  const vars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
    onComplete,
  };

  if (scrollTrigger) {
    vars.scrollTrigger =
      typeof scrollTrigger === 'object'
        ? scrollTrigger
        : {
            trigger,
            start,
            once: true,
          };
  }

  gsap.set(target, { opacity: 0, y: distance });
  return gsap.to(target, vars);
}

/**
 * Pure Fade-In animation
 */
export function fadeIn(target: gsap.DOMTarget, options: AnimationOptions = {}) {
  const {
    duration = DURATION.NORMAL,
    delay = 0,
    ease = EASE.SMOOTH,
    scrollTrigger,
    trigger = target,
    start = 'top 85%',
    onComplete,
  } = options;

  const vars: gsap.TweenVars = {
    opacity: 1,
    duration,
    delay,
    ease,
    onComplete,
  };

  if (scrollTrigger) {
    vars.scrollTrigger =
      typeof scrollTrigger === 'object'
        ? scrollTrigger
        : {
            trigger,
            start,
            once: true,
          };
  }

  gsap.set(target, { opacity: 0 });
  return gsap.to(target, vars);
}

/**
 * Stagger child elements into view with subtle upward travel
 */
export function staggerChildren(
  targets: gsap.DOMTarget,
  options: AnimationOptions = {}
) {
  const {
    duration = DURATION.NORMAL,
    delay = 0,
    ease = EASE.CINEMATIC,
    distance = DISTANCE.SUBTLE,
    stagger = STAGGER.CARD_60MS,
    scrollTrigger,
    trigger,
    start = 'top 85%',
  } = options;

  const vars: gsap.TweenVars = {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
    stagger,
  };

  if (scrollTrigger) {
    vars.scrollTrigger =
      typeof scrollTrigger === 'object'
        ? scrollTrigger
        : {
            trigger: trigger || (Array.isArray(targets) ? targets[0] : targets),
            start,
            once: true,
          };
  }

  gsap.set(targets, { opacity: 0, y: distance });
  return gsap.to(targets, vars);
}

/**
 * Word-by-word reveal using clean translateY clipping
 */
export function wordReveal(
  words: gsap.DOMTarget,
  options: AnimationOptions = {}
) {
  const {
    duration = DURATION.SLOW,
    delay = 0,
    ease = EASE.CINEMATIC,
    stagger = STAGGER.NORMAL,
    scrollTrigger,
    trigger,
    start = 'top 85%',
  } = options;

  const vars: gsap.TweenVars = {
    opacity: 1,
    yPercent: 0,
    duration,
    delay,
    ease,
    stagger,
  };

  if (scrollTrigger) {
    vars.scrollTrigger =
      typeof scrollTrigger === 'object'
        ? scrollTrigger
        : {
            trigger: trigger || words,
            start,
            once: true,
          };
  }

  gsap.set(words, { opacity: 0, yPercent: 100 });
  return gsap.to(words, vars);
}

/**
 * Horizontal slide from left
 */
export function slideFromLeft(
  target: gsap.DOMTarget,
  options: AnimationOptions = {}
) {
  const {
    duration = DURATION.NORMAL,
    delay = 0,
    ease = EASE.CINEMATIC,
    distance = DISTANCE.NORMAL,
    scrollTrigger,
    trigger = target,
    start = 'top 85%',
  } = options;

  const vars: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease,
  };

  if (scrollTrigger) {
    vars.scrollTrigger =
      typeof scrollTrigger === 'object'
        ? scrollTrigger
        : {
            trigger,
            start,
            once: true,
          };
  }

  gsap.set(target, { opacity: 0, x: -distance });
  return gsap.to(target, vars);
}

/**
 * Horizontal slide from right
 */
export function slideFromRight(
  target: gsap.DOMTarget,
  options: AnimationOptions = {}
) {
  const {
    duration = DURATION.NORMAL,
    delay = 0,
    ease = EASE.CINEMATIC,
    distance = DISTANCE.NORMAL,
    scrollTrigger,
    trigger = target,
    start = 'top 85%',
  } = options;

  const vars: gsap.TweenVars = {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease,
  };

  if (scrollTrigger) {
    vars.scrollTrigger =
      typeof scrollTrigger === 'object'
        ? scrollTrigger
        : {
            trigger,
            start,
            once: true,
          };
  }

  gsap.set(target, { opacity: 0, x: distance });
  return gsap.to(target, vars);
}
