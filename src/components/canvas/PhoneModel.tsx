'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { ScreenMaterial } from './ScreenMaterial';
import { ScreenContent } from '@/types';

export interface PhoneModelProps {
  targetRotation?: [number, number, number];
  targetPosition?: [number, number, number];
  targetScale?: number;
  activeProjectId?: string;
  screenContent: ScreenContent;
  interactive?: boolean;
  floatIntensity?: number;
}

/**
 * Procedural 3D Flagship Smartphone Chassis (Titanium rails, curved glass, camera bump, Dynamic Island).
 * Directly manipulates rotation & position with critically damped spring interpolation in useFrame.
 */
export const PhoneModel: React.FC<PhoneModelProps> = ({
  targetRotation = [0.08, -0.25, 0.04],
  targetPosition = [0, 0, 0],
  targetScale = 1,
  activeProjectId = 'pulse-telemetry',
  screenContent,
  interactive = true,
  floatIntensity = 1,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const chassisGroupRef = useRef<THREE.Group>(null);

  // Materials definitions
  // 1. Brushed Dark Titanium Frame
  const titaniumMaterial = new THREE.MeshStandardMaterial({
    color: '#27272a',
    metalness: 0.88,
    roughness: 0.22,
    envMapIntensity: 1.2,
  });

  // 2. Obsidian Deep Gloss Glass Bezel
  const bezelGlassMaterial = new THREE.MeshStandardMaterial({
    color: '#09090b',
    metalness: 0.1,
    roughness: 0.05,
  });

  // 3. Frosted Rear Glass with Specular sheen
  const rearGlassMaterial = new THREE.MeshStandardMaterial({
    color: '#121217',
    metalness: 0.25,
    roughness: 0.38,
    envMapIntensity: 0.8,
  });

  // 4. Matte Black Dynamic Island
  const dynamicIslandMaterial = new THREE.MeshBasicMaterial({
    color: '#000000',
  });

  // 5. Camera Optics Sapphire Glass
  const lensGlassMaterial = new THREE.MeshStandardMaterial({
    color: '#050508',
    metalness: 0.9,
    roughness: 0.08,
  });

  // 6. Camera Ring Bezel
  const cameraRingMaterial = new THREE.MeshStandardMaterial({
    color: '#3f3f46',
    metalness: 0.95,
    roughness: 0.18,
  });

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.064);

    // Subtle natural floating breath
    const floatY = Math.sin(t * 1.4) * 0.035 * floatIntensity;
    const floatRoll = Math.cos(t * 1.1) * 0.012 * floatIntensity;

    // Pointer parallax tilt (clamped to [-0.2, 0.2] radians)
    const pointerX = interactive ? state.pointer.x * 0.24 : 0;
    const pointerY = interactive ? -state.pointer.y * 0.18 : 0;

    // Critically damped interpolation for rotation
    const desiredRotX = targetRotation[0] + pointerY;
    const desiredRotY = targetRotation[1] + pointerX;
    const desiredRotZ = targetRotation[2] + floatRoll;

    rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.x,
      desiredRotX,
      6.5,
      clampedDelta
    );
    rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.y,
      desiredRotY,
      6.5,
      clampedDelta
    );
    rootGroupRef.current.rotation.z = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.z,
      desiredRotZ,
      6.5,
      clampedDelta
    );

    // Position interpolation
    rootGroupRef.current.position.x = THREE.MathUtils.damp(
      rootGroupRef.current.position.x,
      targetPosition[0],
      6.0,
      clampedDelta
    );
    rootGroupRef.current.position.y = THREE.MathUtils.damp(
      rootGroupRef.current.position.y,
      targetPosition[1] + floatY,
      6.0,
      clampedDelta
    );
    rootGroupRef.current.position.z = THREE.MathUtils.damp(
      rootGroupRef.current.position.z,
      targetPosition[2],
      6.0,
      clampedDelta
    );

    // Scale interpolation
    const currentScale = rootGroupRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 6.0, clampedDelta);
    rootGroupRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <group ref={rootGroupRef}>
      <group ref={chassisGroupRef}>
        {/* MAIN CHASSIS: Brushed Titanium Outer Enclosure */}
        {/* Dimensions: Width 1.54, Height 3.14, Depth 0.13, Corner radius 0.09 */}
        <RoundedBox
          args={[1.54, 3.14, 0.13]}
          radius={0.09}
          smoothness={6}
          material={titaniumMaterial}
          castShadow
          receiveShadow
        />

        {/* FRONT BEZEL: Deep Obsidian Glass */}
        <RoundedBox
          args={[1.47, 3.07, 0.012]}
          radius={0.075}
          smoothness={5}
          position={[0, 0, 0.063]}
          material={bezelGlassMaterial}
        />

        {/* REAR GLASS: Matte Frosted Obsidian Backplate */}
        <RoundedBox
          args={[1.47, 3.07, 0.012]}
          radius={0.075}
          smoothness={5}
          position={[0, 0, -0.063]}
          material={rearGlassMaterial}
        />

        {/* ACTIVE SCREEN SURFACE: CanvasTexture Shader Plane */}
        {/* Width 1.41, Height 2.97 fits inside front bezel with precision margin */}
        <mesh position={[0, 0, 0.071]}>
          <planeGeometry args={[1.41, 2.97]} />
          <ScreenMaterial
            screenContent={screenContent}
            projectId={activeProjectId}
            isInteractive={interactive}
          />
        </mesh>

        {/* DYNAMIC ISLAND PILL */}
        <RoundedBox
          args={[0.36, 0.085, 0.008]}
          radius={0.04}
          smoothness={4}
          position={[0, 1.34, 0.073]}
          material={dynamicIslandMaterial}
        >
          {/* Front Selfie Camera Sensor inside Dynamic Island */}
          <mesh position={[0.1, 0, 0.005]}>
            <circleGeometry args={[0.018, 16]} />
            <meshStandardMaterial color="#0a0a14" roughness={0.1} metalness={0.9} />
          </mesh>
        </RoundedBox>

        {/* REAR CAMERA BUMP PLATEAU */}
        <group position={[-0.34, 0.94, -0.07]}>
          {/* Raised Camera Island Rounded Plateau */}
          <RoundedBox
            args={[0.62, 0.65, 0.03]}
            radius={0.07}
            smoothness={5}
            position={[0, 0, -0.01]}
            material={titaniumMaterial}
          />

          {/* Lens 1: Top-Left Wide Camera */}
          <group position={[-0.14, 0.15, -0.025]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.028, 24]} />
              <primitive object={cameraRingMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0, -0.016]}>
              <circleGeometry args={[0.095, 24]} />
              <primitive object={lensGlassMaterial} attach="material" />
            </mesh>
          </group>

          {/* Lens 2: Bottom-Left Ultra-Wide Camera */}
          <group position={[-0.14, -0.15, -0.025]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.028, 24]} />
              <primitive object={cameraRingMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0, -0.016]}>
              <circleGeometry args={[0.095, 24]} />
              <primitive object={lensGlassMaterial} attach="material" />
            </mesh>
          </group>

          {/* Lens 3: Right Telephoto Camera */}
          <group position={[0.14, 0, -0.025]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.028, 24]} />
              <primitive object={cameraRingMaterial} attach="material" />
            </mesh>
            <mesh position={[0, 0, -0.016]}>
              <circleGeometry args={[0.095, 24]} />
              <primitive object={lensGlassMaterial} attach="material" />
            </mesh>
          </group>

          {/* Dual-Tone Flash & LiDAR Sensor */}
          <mesh position={[0.14, 0.18, -0.02]}>
            <circleGeometry args={[0.035, 16]} />
            <meshStandardMaterial color="#fef08a" roughness={0.3} emissive="#fef08a" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0.14, -0.18, -0.02]}>
            <circleGeometry args={[0.028, 16]} />
            <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>

        {/* SIDE HARDWARE BUTTONS */}
        {/* Left Side: Volume Up Button */}
        <mesh position={[-0.775, 0.55, 0]}>
          <boxGeometry args={[0.02, 0.18, 0.04]} />
          <primitive object={titaniumMaterial} attach="material" />
        </mesh>
        {/* Left Side: Volume Down Button */}
        <mesh position={[-0.775, 0.32, 0]}>
          <boxGeometry args={[0.02, 0.18, 0.04]} />
          <primitive object={titaniumMaterial} attach="material" />
        </mesh>
        {/* Left Side: Action Button */}
        <mesh position={[-0.775, 0.78, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.04]} />
          <primitive object={titaniumMaterial} attach="material" />
        </mesh>
        {/* Right Side: Power / Lock Button */}
        <mesh position={[0.775, 0.45, 0]}>
          <boxGeometry args={[0.02, 0.32, 0.04]} />
          <primitive object={titaniumMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};
