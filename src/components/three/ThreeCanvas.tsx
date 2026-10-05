'use client';

import React, { useSyncExternalStore, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import Image from 'next/image';
import { Canvas, CanvasProps } from '@react-three/fiber';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[ThreeCanvas] WebGL render error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Checks client-side WebGL support
 */
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => {};

export interface ThreeCanvasProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode;
  fallbackImageSrc?: string;
  fallbackAlt?: string;
  className?: string;
  frameloop?: 'always' | 'demand' | 'never';
}

export function ThreeCanvas({
  children,
  fallbackImageSrc = '/images/hero-3d-fallback.webp',
  fallbackAlt = 'SPAN Studio Cinematic 3D Visual',
  className = 'w-full h-full',
  frameloop = 'always',
  ...canvasProps
}: ThreeCanvasProps) {
  // Use useSyncExternalStore to reliably detect client mount and WebGL availability
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const hasWebGL = useSyncExternalStore(
    emptySubscribe,
    () => isWebGLAvailable(),
    () => false
  );

  // Fallback view when WebGL is unavailable or during SSR
  const fallbackView = (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-bg-deep/80 select-none ${className}`}
      aria-label={fallbackAlt}
    >
      <Image
        src={fallbackImageSrc}
        alt={fallbackAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        priority
        className="object-contain p-4"
      />
      {/* Subtle status tag indicating fallback image */}
      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-bg-void/80 border border-border-subtle font-mono text-[9px] text-text-muted">
        STATIC PREVIEW
      </div>
    </div>
  );

  // If SSR or WebGL unavailable, render graceful fallback image
  if (!isMounted || !hasWebGL) {
    return fallbackView;
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      <WebGLErrorBoundary fallback={fallbackView}>
        <Suspense
          fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-deep/60 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-full border-2 border-border-default border-t-accent-primary animate-spin mb-3" />
              <span className="font-mono text-[10px] text-metal-mid tracking-widest uppercase">
                LOADING 3D ENGINE...
              </span>
            </div>
          }
        >
          <Canvas
            dpr={[1, 2]}
            frameloop={frameloop}
            gl={{
              powerPreference: 'high-performance',
              antialias: true,
              alpha: true,
              stencil: false,
              depth: true,
            }}
            camera={canvasProps.camera || { position: [0, 0, 5], fov: 45 }}
            style={{
              pointerEvents: 'auto',
              touchAction: 'pan-y',
              ...canvasProps.style,
            }}
            {...canvasProps}
          >
            {children}
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}
