'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Highly detailed, beautiful 3D Legal Codex Book
function CodexModel() {
  const groupRef = useRef<THREE.Group>(null);
  const coverRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Slow atmospheric floating & rotation to showcase the book structure
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.05 - 0.05;
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.5 - 0.4; // Tilted back and forth
      groupRef.current.rotation.x = 0.25 + Math.cos(time * 0.15) * 0.05; // Constant tilt to show top pages
    }

    if (coverRef.current && coverRef.current.material instanceof THREE.MeshStandardMaterial) {
      const dist = Math.sqrt(state.pointer.x * state.pointer.x + state.pointer.y * state.pointer.y);
      coverRef.current.material.roughness = THREE.MathUtils.lerp(0.3, 0.12, dist);
    }
  });

  const goldProps = {
    color: '#C5A880',
    metalness: 0.9,
    roughness: 0.22,
    emissive: '#C5A880' as const,
    emissiveIntensity: 0.02,
  };

  const brightGoldProps = {
    color: '#D4B896',
    metalness: 0.95,
    roughness: 0.15,
  };

  const paperProps = {
    color: '#E8E4DC', // warm aged papyrus color
    metalness: 0.05,
    roughness: 0.8,
  };

  const coverProps = {
    color: '#131922', // deep lapis blue/black leather
    metalness: 0.3,
    roughness: 0.45,
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      
      {/* ===== BACK COVER ===== */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[0.65, 0.85, 0.025]} />
        <meshStandardMaterial {...coverProps} />
      </mesh>
      
      {/* Back Cover Outer Gold Corners */}
      <mesh position={[-0.26, 0.36, -0.04]}>
        <boxGeometry args={[0.15, 0.15, 0.03]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>
      <mesh position={[0.26, 0.36, -0.04]}>
        <boxGeometry args={[0.15, 0.15, 0.03]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>
      
      {/* ===== FRONT COVER ===== */}
      <mesh ref={coverRef} position={[0, 0, 0.04]}>
        <boxGeometry args={[0.65, 0.85, 0.025]} />
        <meshStandardMaterial {...coverProps} />
      </mesh>

      {/* Front Cover Gold Outer Corners */}
      <mesh position={[-0.26, 0.36, 0.04]}>
        <boxGeometry args={[0.14, 0.14, 0.03]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>
      <mesh position={[0.26, 0.36, 0.04]}>
        <boxGeometry args={[0.14, 0.14, 0.03]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>
      <mesh position={[-0.26, -0.36, 0.04]}>
        <boxGeometry args={[0.14, 0.14, 0.03]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>
      <mesh position={[0.26, -0.36, 0.04]}>
        <boxGeometry args={[0.14, 0.14, 0.03]} />
        <meshStandardMaterial {...goldProps} />
      </mesh>

      {/* ===== BOOK SPINE (Obsidian binding cylinder) ===== */}
      <mesh position={[-0.32, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.052, 0.052, 0.85, 32]} />
        <meshStandardMaterial color="#0A0B0E" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Gold bands on Spine */}
      {[0.3, 0.1, -0.1, -0.3].map((yOffset, idx) => (
        <mesh key={idx} position={[-0.32, yOffset, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.054, 0.054, 0.015, 32]} />
          <meshStandardMaterial {...goldProps} />
        </mesh>
      ))}

      {/* ===== INNER BOOK PAGES (Stepped layered effect) ===== */}
      {/* Page Layer 1 */}
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[0.56, 0.78, 0.058]} />
        <meshStandardMaterial {...paperProps} />
      </mesh>
      {/* Page Layer 2 (Slightly inset) */}
      <mesh position={[0.03, 0, 0]}>
        <boxGeometry args={[0.54, 0.76, 0.06]} />
        <meshStandardMaterial {...paperProps} />
      </mesh>

      {/* ===== EMBOSSED FRONT EMBLEM (Sovereign Star Crest & Scales) ===== */}
      <group position={[0.02, 0, 0.054]}>
        {/* Gold medallion backing */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.005, 32]} />
          <meshStandardMaterial {...goldProps} />
        </mesh>
        {/* Inner medallion ring */}
        <mesh position={[0, 0, 0.003]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.005, 32]} />
          <meshStandardMaterial {...brightGoldProps} />
        </mesh>
        
        {/* Stylized Balance scale inside medallion */}
        {/* Pillar */}
        <mesh position={[0, 0, 0.006]}>
          <boxGeometry args={[0.012, 0.16, 0.004]} />
          <meshStandardMaterial color="#0A0B0E" metalness={0.5} />
        </mesh>
        {/* Crossbar */}
        <mesh position={[0, 0.05, 0.006]}>
          <boxGeometry args={[0.16, 0.01, 0.004]} />
          <meshStandardMaterial color="#0A0B0E" metalness={0.5} />
        </mesh>
        {/* Left Pan */}
        <mesh position={[-0.07, -0.02, 0.006]}>
          <boxGeometry args={[0.04, 0.006, 0.004]} />
          <meshStandardMaterial color="#0A0B0E" metalness={0.5} />
        </mesh>
        {/* Right Pan */}
        <mesh position={[0.07, -0.02, 0.006]}>
          <boxGeometry args={[0.04, 0.006, 0.004]} />
          <meshStandardMaterial color="#0A0B0E" metalness={0.5} />
        </mesh>
      </group>

    </group>
  );
}

// Sparkle particle field
function SparkleField({ count = 30 }) {
  const points = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 2.2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 1.8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }
    return arr;
  });

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C5A880"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function LegalBook3D() {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const placeholder = (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-[140px] h-[180px] border border-[#C5A880]/20 bg-[#0F0F11] rounded-[4px] shadow-2xl flex items-center justify-center animate-pulse">
        <div className="w-12 h-12 rounded-full border border-[#C5A880]/30 flex items-center justify-center bg-[#050506]">
          <span className="text-[10px] font-mono text-[#C5A880]">3D</span>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="w-full h-full min-h-[280px] relative">
      {!isClient ? placeholder : (
        <div className="absolute inset-0">
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
            performance={{ min: 0.5 }}
            className="outline-none focus:outline-none"
            style={{ outline: 'none', pointerEvents: 'auto' }}
          >
            {/* Adjusted camera position further back to prevent screen cropping */}
            <PerspectiveCamera makeDefault position={[0, 0.05, 1.85]} fov={40} />

            {/* Ambient & Directed Light Setup */}
            <ambientLight intensity={0.45} />
            <directionalLight position={[4, 5, 4]} intensity={2.0} color="#FFFFFF" />
            <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#C5A880" />
            <spotLight position={[0, 4, 1.5]} intensity={1.5} angle={0.4} penumbra={1} color="#C5A880" />

            {/* Models */}
            <CodexModel />
            <SparkleField count={30} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.3}
              maxPolarAngle={Math.PI / 1.7}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
}

