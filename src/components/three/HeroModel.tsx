'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useReducedMotion } from './useReducedMotion';

export interface HeroModelProps {
  modelPath?: string;
  scale?: number;
  position?: [number, number, number];
  initialRotation?: [number, number, number];
  interactive?: boolean;
}

export function HeroModel({
  modelPath = '/models/hero-object.glb',
  scale = 1.6,
  position = [0, 0, 0],
  initialRotation = [0.22, -0.65, 0.08],
  interactive = true,
}: HeroModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const prefersReducedMotion = useReducedMotion();

  // Internal rotation tracking for smooth damping
  const currentRotation = useRef({
    x: initialRotation[0],
    y: initialRotation[1],
    z: initialRotation[2],
  });

  // Base idle rotation accumulator
  const idleAngle = useRef(initialRotation[1]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // When reduced motion is preferred, keep model completely static in an elegant pose
    if (prefersReducedMotion) {
      groupRef.current.position.set(position[0], position[1], position[2]);
      groupRef.current.rotation.set(
        initialRotation[0],
        initialRotation[1],
        initialRotation[2]
      );
      return;
    }

    // Safe delta limit to prevent frame jumps on tab focus change
    const safeDelta = Math.min(delta, 0.1);

    // Subtle idle spin (~0.12 rad/sec: 1 full rotation every ~52s)
    idleAngle.current += safeDelta * 0.12;

    // Mouse pointer influence: maximum ~±15 degrees (±0.26 radians)
    let pointerTargetX = 0;
    let pointerTargetY = 0;

    if (interactive) {
      // state.pointer.x and state.pointer.y are normalized between -1 and 1
      pointerTargetX = -state.pointer.y * 0.26;
      pointerTargetY = state.pointer.x * 0.26;
    }

    // Target angles combining idle base + mouse dampening
    const targetX = initialRotation[0] + pointerTargetX;
    const targetY = idleAngle.current + pointerTargetY;
    const targetZ = initialRotation[2] - pointerTargetY * 0.3;

    // Smooth exponential damping toward target
    currentRotation.current.x = THREE.MathUtils.damp(
      currentRotation.current.x,
      targetX,
      4,
      safeDelta
    );
    currentRotation.current.y = THREE.MathUtils.damp(
      currentRotation.current.y,
      targetY,
      4,
      safeDelta
    );
    currentRotation.current.z = THREE.MathUtils.damp(
      currentRotation.current.z,
      targetZ,
      4,
      safeDelta
    );

    groupRef.current.rotation.set(
      currentRotation.current.x,
      currentRotation.current.y,
      currentRotation.current.z
    );

    // Subtle breathing / levitation floating motion
    const floatY = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
    groupRef.current.position.set(
      position[0],
      position[1] + floatY,
      position[2]
    );
  });

  return (
    <group ref={groupRef} scale={scale} position={position}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the GLB model asset for instant hydration
useGLTF.preload('/models/hero-object.glb');
