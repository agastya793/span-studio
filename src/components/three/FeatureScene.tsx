'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ThreeCanvas } from './ThreeCanvas';
import { HeroModel } from './HeroModel';
import { useReducedMotion } from './useReducedMotion';

export interface FeatureSceneProps {
  activeCapabilityId?: string;
  className?: string;
}

export function FeatureScene({
  activeCapabilityId = 'internal-structure',
  className = '',
}: FeatureSceneProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <ThreeCanvas
        frameloop="demand"
        camera={{ position: [2.2, 1.6, 4.2], fov: 42 }}
        fallbackImageSrc="/images/hero-3d-fallback.webp"
        fallbackAlt="SPAN Studio 3D Feature Visualization"
        className="w-full h-full"
      >
        {/* ── Studio Lighting Rig (Controlled & Cinematic) ── */}
        <ambientLight color="#121722" intensity={0.9} />

        {/* Key Light */}
        <directionalLight
          position={[-3, 4, 3]}
          color="#FFF5E8"
          intensity={2.2}
        />

        {/* Cool Fill */}
        <directionalLight
          position={[3, -2, 2]}
          color="#9BB0C7"
          intensity={0.8}
        />

        {/* Restrained SPAN Magenta Rim Accent */}
        <directionalLight
          position={[2, 3, -3]}
          color="#B6063D"
          intensity={3.2}
        />

        {/* Feature Scene Controller for Frameloop & Camera/Model Poses */}
        <FeatureController activeCapabilityId={activeCapabilityId} />

        {/* Feature 3D Model Instance with Technical Angle */}
        <HeroModel
          scale={1.45}
          position={[0, -0.05, 0]}
          initialRotation={
            activeCapabilityId === 'internal-structure'
              ? [0.35, -0.75, 0.12]
              : activeCapabilityId === 'process-flow'
              ? [0.15, -0.3, -0.05]
              : [0.45, -1.05, 0.2]
          }
          interactive
        />
      </ThreeCanvas>
    </div>
  );
}

/**
 * Controller to trigger frame invalidation when `frameloop="demand"` is active
 * and handle smooth capability perspective updates.
 */
function FeatureController({
  activeCapabilityId,
}: {
  activeCapabilityId: string;
}) {
  const { invalidate } = useThree();
  const prefersReducedMotion = useReducedMotion();
  const prevId = useRef(activeCapabilityId);

  // When capability changes, re-render the demand frame
  useEffect(() => {
    if (prevId.current !== activeCapabilityId) {
      prevId.current = activeCapabilityId;
      invalidate();
    }
  }, [activeCapabilityId, invalidate]);

  // Request frames on subtle interaction or pointer movement
  useFrame((state) => {
    if (prefersReducedMotion) return;

    // If pointer is moving across the canvas, request redraw in demand mode
    if (Math.abs(state.pointer.x) > 0.01 || Math.abs(state.pointer.y) > 0.01) {
      invalidate();
    }
  });

  return null;
}
