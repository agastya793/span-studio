'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface ServiceVideoStageProps {
  /** Matches the file name in /public/videos, e.g. "factory-video" -> /videos/factory-video.mp4 */
  slug: string;
  title: string;
  label: string;
  /** Rendered when the clip file is not present yet. */
  fallback: React.ReactNode;
  isMobile?: boolean;
}

/**
 * Service showreel stage.
 * - Desktop: muted preview plays on hover, pauses on leave.
 * - Touch: tap toggles preview.
 * - Click (desktop) opens a full viewer with sound and native controls.
 * Drop `<slug>.mp4` (and optional `<slug>.jpg` poster) into /public/videos to activate.
 */
export function ServiceVideoStage({
  slug,
  title,
  label,
  fallback,
  isMobile = false,
}: ServiceVideoStageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  const src = `/videos/${slug}.mp4`;
  const poster = `/videos/${slug}.jpg`;

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTouch = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  }, []);

  const handleEnter = () => {
    if (isTouch() || prefersReducedMotion()) return;
    play();
  };

  const handleLeave = () => {
    if (isTouch()) return;
    pause();
  };

  const handleClick = () => {
    if (isTouch()) {
      playing ? pause() : play();
    } else {
      pause();
      setViewerOpen(true);
    }
  };

  // Close viewer with Escape and lock page scroll while open
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewerOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [viewerOpen]);

  if (failed) return <>{fallback}</>;

  return (
    <>
      <button
        type="button"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        onClick={handleClick}
        aria-label={`Watch ${title} showreel`}
        className={`group relative block w-full overflow-hidden rounded-xl border border-border-default bg-metal-dark text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
          isMobile ? 'h-[220px]' : 'h-[360px] xl:h-[420px]'
        }`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) setProgress(v.currentTime / v.duration);
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Legibility gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Play affordance — fades out once playing */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-accent-primary" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </div>

        {/* Caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-3.5 text-white">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest">
            {label}
          </span>
          <span className="font-mono text-[11px] text-white/80">
            {isMobile ? 'Tap to preview' : 'Hover to preview · Click to watch'}
          </span>
        </div>

        {/* Progress */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
          <div
            className="h-full bg-accent-primary"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </button>

      {viewerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} showreel`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={() => setViewerOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg bg-black shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="font-display text-base font-semibold text-white">
                {title}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-lg bg-accent-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  onClick={() => setViewerOpen(false)}
                >
                  Start a project
                </Link>
                <button
                  type="button"
                  onClick={() => setViewerOpen(false)}
                  className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
