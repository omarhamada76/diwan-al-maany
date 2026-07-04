'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Highly polished, high-resolution 3D Scales of Justice
function ScalesOfJustice() {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Damped proximity rotation factor (slows down near center pointer focus)
    const dist = Math.sqrt(state.pointer.x * state.pointer.x + state.pointer.y * state.pointer.y);
    const speedFactor = Math.max(0.05, Math.min(1.0, dist * 1.6));

    // Slow elegant rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15 * speedFactor;
      groupRef.current.rotation.x = Math.sin(time * 0.12) * 0.02;
    }

    // Smooth balancing sway
    const tilt = Math.sin(time * 0.9) * 0.05;
    if (beamRef.current) {
      beamRef.current.rotation.z = tilt;
    }

    // Keep pans level
    if (leftPanRef.current) {
      leftPanRef.current.rotation.z = -tilt;
    }
    if (rightPanRef.current) {
      rightPanRef.current.rotation.z = -tilt;
    }

    // Key spotlight tracks cursor coordinates with damped latency
    if (spotLightRef.current) {
      const targetX = state.pointer.x * 4.5;
      const targetY = state.pointer.y * 3.5 + 5.5;
      spotLightRef.current.position.x = THREE.MathUtils.lerp(spotLightRef.current.position.x, targetX, 0.05);
      spotLightRef.current.position.y = THREE.MathUtils.lerp(spotLightRef.current.position.y, targetY, 0.05);
    }
  });

  // Clean gold material – polished satin brass
  const goldProps = {
    color: '#C5A880',
    metalness: 0.92,
    roughness: 0.18,
    emissive: '#C5A880' as const,
    emissiveIntensity: 0.03,
  };

  const brightGoldProps = {
    color: '#D4B896',
    metalness: 0.95,
    roughness: 0.12,
    emissive: '#C5A880' as const,
    emissiveIntensity: 0.02,
  };

  const darkProps = {
    color: '#0D0D0E',
    metalness: 0.8,
    roughness: 0.3,
  };

  return (
    <group ref={groupRef} position={[0, -0.65, 0]} scale={1.05}>
      <spotLight
        ref={spotLightRef}
        position={[0, 6, 2.5]}
        intensity={3.5}
        angle={0.35}
        penumbra={1}
        color="#D4B896"
      />

      {/* ===== pedestal / base ===== */}
      {/* Stepped Base 1 (Bottom Tier) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.7, 0.08, 64]} />
        <meshStandardMaterial {...darkProps} />
      </mesh>
      {/* Stepped Base 2 (Middle Tier) */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.55, 0.58, 0.04, 64]} />
        <meshStandardMaterial {...brightGoldProps} />
      </mesh>
      {/* Stepped Base 3 (Top Tier) */}
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.45, 0.47, 0.03, 64]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>

      {/* ===== central pillar ===== */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.032, 0.048, 1.6, 64]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>
      {/* Pillar Collar base */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.06, 0.015, 16, 64]} />
        <meshStandardMaterial {...brightGoldProps} />
      </mesh>
      {/* Pillar Center sphere detail */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshStandardMaterial {...brightGoldProps} />
      </mesh>
      {/* Pillar Collar top */}
      <mesh position={[0, 1.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.05, 0.012, 16, 64]} />
        <meshStandardMaterial {...brightGoldProps} />
      </mesh>

      {/* ===== top crown ornament ===== */}
      <mesh position={[0, 1.74, 0]}>
        <sphereGeometry args={[0.065, 32, 32]} />
        <meshStandardMaterial {...brightGoldProps} />
      </mesh>
      {/* Crown spire tip */}
      <mesh position={[0, 1.83, 0]}>
        <cylinderGeometry args={[0.002, 0.02, 0.1, 16]} />
        <meshStandardMaterial {...brightGoldProps} />
      </mesh>

      {/* ===== horizontal beam (tapers at ends) ===== */}
      <group ref={beamRef} position={[0, 1.68, 0]}>
        {/* Left taper beam */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.01, 1.0, 32]} />
          <meshStandardMaterial {...goldProps} />
        </mesh>
        {/* Right taper beam */}
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.01, 1.0, 32]} />
          <meshStandardMaterial {...goldProps} />
        </mesh>

        {/* Decorative central collar */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.028, 0.012, 16, 32]} />
          <meshStandardMaterial {...brightGoldProps} />
        </mesh>

        {/* End caps spheres */}
        <mesh position={[-1.0, 0, 0]}>
          <sphereGeometry args={[0.038, 24, 24]} />
          <meshStandardMaterial {...brightGoldProps} />
        </mesh>
        <mesh position={[1.0, 0, 0]}>
          <sphereGeometry args={[0.038, 24, 24]} />
          <meshStandardMaterial {...brightGoldProps} />
        </mesh>

        {/* ===== left hanging pan assembly ===== */}
        <group ref={leftPanRef} position={[-1.0, 0, 0]}>
          {/* Triple-chain suspension threads */}
          {[0, 120, 240].map((angle, idx) => (
            <group key={idx} rotation={[0, (angle * Math.PI) / 180, 0]}>
              <mesh position={[0.13, -0.275, 0]} rotation={[0, 0, 0.46]}>
                <cylinderGeometry args={[0.003, 0.003, 0.61, 8]} />
                <meshStandardMaterial {...goldProps} />
              </mesh>
            </group>
          ))}

          {/* Pan dish - Beveled rim plate */}
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.012, 64]} />
            <meshStandardMaterial {...brightGoldProps} />
          </mesh>
          <mesh position={[0, -0.542, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26, 0.008, 12, 64]} />
            <meshStandardMaterial {...goldProps} />
          </mesh>

          {/* Detailed Gavel resting on pan */}
          <group position={[0, -0.52, 0]} rotation={[0.2, 0.6, 0]}>
            {/* Gavel head */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.12, 24]} />
              <meshStandardMaterial color="#3E1F0A" roughness={0.4} />
            </mesh>
            {/* Gold accents on head */}
            <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.026, 0.004, 8, 24]} />
              <meshStandardMaterial {...brightGoldProps} />
            </mesh>
            <mesh position={[0, 0, -0.045]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.026, 0.004, 8, 24]} />
              <meshStandardMaterial {...brightGoldProps} />
            </mesh>
            {/* Gavel shaft */}
            <mesh position={[0, -0.005, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.009, 0.006, 0.12, 12]} />
              <meshStandardMaterial color="#3E1F0A" roughness={0.4} />
            </mesh>
          </group>
        </group>

        {/* ===== right hanging pan assembly ===== */}
        <group ref={rightPanRef} position={[1.0, 0, 0]}>
          {/* Triple-chain suspension threads */}
          {[0, 120, 240].map((angle, idx) => (
            <group key={idx} rotation={[0, (angle * Math.PI) / 180, 0]}>
              <mesh position={[0.13, -0.275, 0]} rotation={[0, 0, 0.46]}>
                <cylinderGeometry args={[0.003, 0.003, 0.61, 8]} />
                <meshStandardMaterial {...goldProps} />
              </mesh>
            </group>
          ))}

          {/* Pan dish - Beveled rim plate */}
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.012, 64]} />
            <meshStandardMaterial {...brightGoldProps} />
          </mesh>
          <mesh position={[0, -0.542, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26, 0.008, 12, 64]} />
            <meshStandardMaterial {...goldProps} />
          </mesh>

          {/* Detailed Legal Codex resting on pan */}
          <group position={[0, -0.52, 0]} rotation={[0, 0.4, 0]}>
            {/* Cover */}
            <mesh>
              <boxGeometry args={[0.12, 0.038, 0.16]} />
              <meshStandardMaterial color="#112217" roughness={0.5} />
            </mesh>
            {/* Pages insert */}
            <mesh position={[0.004, 0, 0]}>
              <boxGeometry args={[0.11, 0.028, 0.14]} />
              <meshStandardMaterial color="#E8E4DC" roughness={0.7} />
            </mesh>
            {/* Cover gold emblem decoration */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.02, 16]} />
              <meshStandardMaterial {...brightGoldProps} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

// Floating gold particle dust
function Particles({ count = 80 }) {
  const points = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const distance = THREE.MathUtils.randFloat(1.4, 2.8);

      arr[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta) + 0.1;
      arr[i * 3 + 2] = distance * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#D4B896"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Interactive cursor highlight pointlight
function CursorPointLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      const targetX = state.pointer.x * 2.2;
      const targetY = state.pointer.y * 2.2 + 0.3;
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.08);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.08);
    }
  });

  return <pointLight ref={lightRef} position={[0, 0.3, 1.2]} intensity={1.8} color="#D4B896" distance={3.2} decay={1.8} />;
}

export default function LegalSeal3D() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="absolute w-[240px] h-[240px] rounded-full border border-[#C5A880]/15 flex items-center justify-center animate-[spin_100s_linear_infinite]">
          <svg className="w-full h-full text-[#C5A880]/30" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.25" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
              <line
                key={idx}
                x1="50"
                y1="10"
                x2="50"
                y2="90"
                transform={`rotate(${angle} 50 50)`}
                stroke="currentColor"
                strokeWidth="0.3"
              />
            ))}
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[500px] relative">
      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          performance={{ min: 0.5 }}
          className="outline-none focus:outline-none"
          style={{ outline: 'none', pointerEvents: 'auto' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0.2, 4.0]} fov={42} />

          {/* Ambient & Directed Lighting Setup */}
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFFFFF" />
          <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#C5A880" />
          <pointLight position={[0, -2, 3]} intensity={0.4} color="#C5A880" />

          {/* High Resolution Models */}
          <ScalesOfJustice />
          <Particles count={80} />
          <CursorPointLight />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.3}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Canvas>
      </div>
    </div>
  );
}
