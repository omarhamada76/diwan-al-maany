'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Beautiful, animated 3D Scales of Justice
function ScalesOfJustice() {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Group>(null);
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);

  // Keep track of positions for smooth lerping
  const currentTilt = useRef(0);
  const currentGroupY = useRef(0);
  const currentGroupX = useRef(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer; // Mouse coords normalized between -1 and 1

    // 1. Smooth interactive group rotation (passive rotation + subtle mouse tilt)
    const targetGroupY = time * 0.15 + (pointer.x * 0.35);
    const targetGroupX = Math.sin(time * 0.08) * 0.04 - (pointer.y * 0.12);

    currentGroupY.current = THREE.MathUtils.lerp(currentGroupY.current, targetGroupY, 0.05);
    currentGroupX.current = THREE.MathUtils.lerp(currentGroupX.current, targetGroupX, 0.05);

    if (groupRef.current) {
      groupRef.current.rotation.y = currentGroupY.current;
      groupRef.current.rotation.x = currentGroupX.current;
    }

    // 2. Dynamic, smooth balancing motion for the beam (passive tilt + mouse pointer influence)
    const targetTilt = Math.sin(time * 1.2) * 0.07 + (pointer.x * 0.15);
    currentTilt.current = THREE.MathUtils.lerp(currentTilt.current, targetTilt, 0.07);
    const tilt = currentTilt.current;

    if (beamRef.current) {
      beamRef.current.rotation.z = tilt;
    }

    // 3. Keep pans hanging straight down (upright) despite the beam tilting
    if (leftPanRef.current) {
      leftPanRef.current.rotation.z = -tilt;
    }
    if (rightPanRef.current) {
      rightPanRef.current.rotation.z = -tilt;
    }
  });

  // Premium Luxury Materials
  const goldMaterial = (
    <meshPhysicalMaterial
      color="#E6C567" // Luxurious warm gold
      metalness={0.96}
      roughness={0.12}
      clearcoat={1.0}
      clearcoatRoughness={0.06}
      reflectivity={0.95}
      emissive="#B58D20"
      emissiveIntensity={0.06}
    />
  );

  const lightGoldMaterial = (
    <meshPhysicalMaterial
      color="#F3D075" // Shiniest accent gold
      metalness={0.96}
      roughness={0.08}
      clearcoat={1.0}
      clearcoatRoughness={0.04}
      reflectivity={0.95}
    />
  );

  const lightGoldMaterialDouble = (
    <meshPhysicalMaterial
      color="#F3D075"
      metalness={0.95}
      roughness={0.12}
      clearcoat={1.0}
      clearcoatRoughness={0.08}
      reflectivity={0.9}
      side={THREE.DoubleSide} // Needed for open thin bowls
    />
  );

  const darkBaseMaterial = (
    <meshPhysicalMaterial
      color="#151515" // Polished black obsidian
      roughness={0.15}
      metalness={0.2}
      clearcoat={1.0}
      clearcoatRoughness={0.1}
    />
  );

  const woodMaterial = (
    <meshPhysicalMaterial
      color="#653517" // Rich mahogany wood
      roughness={0.25}
      metalness={0.1}
      clearcoat={0.8}
      clearcoatRoughness={0.2}
    />
  );

  return (
    <group ref={groupRef} position={[0, -1.05, 0]}>
      {/* ================= 1. PEDESTAL BASE ================= */}
      {/* Bottom Gold Accent Rim */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.72, 0.75, 0.04, 32]} />
        {goldMaterial}
      </mesh>
      {/* Main Obsidian Stone Pedestal */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.65, 0.7, 0.12, 32]} />
        {darkBaseMaterial}
      </mesh>
      {/* Top Gold Polished Plate */}
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.02, 32]} />
        {lightGoldMaterial}
      </mesh>
      {/* Center Pillar Support Ring */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.08, 16]} />
        {goldMaterial}
      </mesh>

      {/* ================= 2. VERTICAL PILLAR ================= */}
      {/* Column Lower Shaft */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.7, 16]} />
        {goldMaterial}
      </mesh>
      {/* Lower Collar */}
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.09, 0.025, 8, 24]} />
        {lightGoldMaterial}
      </mesh>
      {/* Column Main Shaft */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.045, 0.06, 1.1, 16]} />
        {goldMaterial}
      </mesh>
      {/* Top Collar */}
      <mesh position={[0, 2.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 24]} />
        {lightGoldMaterial}
      </mesh>
      {/* Top Capital Hub */}
      <mesh position={[0, 2.15, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.12, 16]} />
        {goldMaterial}
      </mesh>
      {/* Top Spherical Crown Ornament */}
      <mesh position={[0, 2.26, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        {lightGoldMaterial}
      </mesh>

      {/* ================= 3. TILTING HORIZONTAL BEAM ================= */}
      <group ref={beamRef} position={[0, 2.15, 0]}>
        {/* Central Pivot Cover Cap */}
        <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
          {lightGoldMaterial}
        </mesh>
        
        {/* Main Tapered Horizontal Beam */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.035, 2.4, 16]} />
          {goldMaterial}
        </mesh>
        
        {/* Decorative rings on left and right sides of the beam */}
        <mesh position={[-0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.04, 0.015, 8, 16]} />
          {lightGoldMaterial}
        </mesh>
        <mesh position={[0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.04, 0.015, 8, 16]} />
          {lightGoldMaterial}
        </mesh>

        {/* Outer Beam Knobs */}
        <mesh position={[-1.2, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          {lightGoldMaterial}
        </mesh>
        <mesh position={[1.2, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          {lightGoldMaterial}
        </mesh>

        {/* ================= LEFT SCALE PAN ASSEMBLY ================= */}
        <group ref={leftPanRef} position={[-1.2, 0, 0]}>
          {/* Hanger Ring */}
          <mesh position={[0, -0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.045, 0.01, 8, 16]} />
            {lightGoldMaterial}
          </mesh>

          {/* 3 hanging support chains/rods in 3D triangular spacing */}
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
            <group key={idx} rotation={[0, angle, 0]}>
              <mesh position={[0.16, -0.345, 0]} rotation={[0, 0, -0.48]}>
                <cylinderGeometry args={[0.007, 0.007, 0.69, 6]} />
                {goldMaterial}
              </mesh>
            </group>
          ))}

          {/* Scale Pan Dish (Concave Bowl) */}
          <mesh position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, 0.3]} />
            {lightGoldMaterialDouble}
          </mesh>
          
          {/* Gavel (representing Law/Authority) resting on Left Pan */}
          <group position={[0, -0.63, 0]} rotation={[0.2, 0.4, 0.15]}>
            {/* Gavel Head */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.15, 16]} />
              {woodMaterial}
            </mesh>
            {/* Gavel Metal Bands on Head */}
            <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.047, 0.005, 8, 16]} />
              {lightGoldMaterial}
            </mesh>
            <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.047, 0.005, 8, 16]} />
              {lightGoldMaterial}
            </mesh>
            {/* Gavel Handle */}
            <mesh position={[0, -0.01, -0.11]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.009, 0.22, 12]} />
              {woodMaterial}
            </mesh>
          </group>
        </group>

        {/* ================= RIGHT SCALE PAN ASSEMBLY ================= */}
        <group ref={rightPanRef} position={[1.2, 0, 0]}>
          {/* Hanger Ring */}
          <mesh position={[0, -0.04, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.045, 0.01, 8, 16]} />
            {lightGoldMaterial}
          </mesh>

          {/* 3 hanging support chains/rods in 3D triangular spacing */}
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
            <group key={idx} rotation={[0, angle, 0]}>
              <mesh position={[0.16, -0.345, 0]} rotation={[0, 0, -0.48]}>
                <cylinderGeometry args={[0.007, 0.007, 0.69, 6]} />
                {goldMaterial}
              </mesh>
            </group>
          ))}

          {/* Scale Pan Dish (Concave Bowl) */}
          <mesh position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, 0.3]} />
            {lightGoldMaterialDouble}
          </mesh>
          
          {/* Rolled Legal Scroll resting on Right Pan */}
          <group position={[0, -0.63, 0]} rotation={[-0.15, -0.45, 0.05]}>
            {/* Spindle Rod in the center */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.26, 8]} />
              {lightGoldMaterial}
            </mesh>
            {/* Spindle Caps */}
            <mesh position={[0, 0, 0.13]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              {lightGoldMaterial}
            </mesh>
            <mesh position={[0, 0, -0.13]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              {lightGoldMaterial}
            </mesh>
            {/* Paper Scroll Cylinder */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.038, 0.038, 0.22, 12]} />
              <meshPhysicalMaterial
                color="#F8F3E5" // Aged luxury parchment
                roughness={0.55}
                clearcoat={0.1}
              />
            </mesh>
            {/* Scroll Ribbon Tie */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.04, 0.007, 8, 16]} />
              <meshPhysicalMaterial
                color="#B22222" // Deep Crimson Ribbon
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* Pedestal Shadow/Glow Disc for anchoring base */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.75, 1.4, 64]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Glowing Particle Field (Floating embers) surrounding the scale
function Particles({ count = 120 }) {
  const points = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const distance = THREE.MathUtils.randFloat(1.3, 3.3);
      
      arr[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta) + 0.25; // Centered vertically around the scales
      arr[i * 3 + 2] = distance * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = time * 0.035;
      points.current.rotation.x = Math.sin(time * 0.06) * 0.03;
      points.current.rotation.z = Math.cos(time * 0.04) * 0.03;
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
        size={0.045}
        color="#F4D279"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function LegalSeal3D() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Elegant luxury Scales of Justice placeholder for SSR
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="absolute w-[280px] h-[280px] rounded-full border border-[#D4AF37]/20 flex items-center justify-center animate-[spin_100s_linear_infinite]">
          <svg className="w-full h-full text-[#D4AF37]/40" viewBox="0 0 100 100">
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
        <div className="absolute w-[180px] h-[180px] rounded-full border border-[#D4AF37] bg-[#111111] shadow-[0_0_50px_rgba(212,175,55,0.15)] flex items-center justify-center">
          <ScaleIcon className="w-16 h-16 text-[#D4AF37] animate-[pulse_4s_infinite]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px]">
      <Canvas eventSource={typeof document !== 'undefined' ? document.getElementById('root') || undefined : undefined}>
        {/* Adjusted Camera Position: slightly higher and closer, creating a nice downward perspective to show the gavel & scroll inside the pans */}
        <PerspectiveCamera makeDefault position={[0, 0.35, 3.0]} fov={45} />
        
        {/* Professional 4-Point Cinematic Lighting Rig */}
        <ambientLight intensity={0.25} />
        
        {/* 1. Golden Key Light */}
        <directionalLight position={[-4, 5, 4]} intensity={2.2} color="#F3D075" />
        
        {/* 2. Soft Blue Fill Light (for luxury color depth) */}
        <directionalLight position={[4, 3, 2]} intensity={1.2} color="#8ab4f8" />
        
        {/* 3. Rim Light (White, from behind to highlight metallic edges) */}
        <directionalLight position={[0, 4, -6]} intensity={3.5} color="#ffffff" />
        
        {/* 4. Bottom Ambient bounce light */}
        <directionalLight position={[0, -4, 0]} intensity={0.4} color="#D4AF37" />

        {/* 5. Spotlight on the pedestal */}
        <spotLight position={[0, 7, 1]} intensity={2.5} angle={0.4} penumbra={1} color="#E6C567" />

        {/* Image environment reflections (standard preset for hyper-realistic gold reflections) */}
        <Environment preset="city" />

        {/* 3D Elements */}
        <ScalesOfJustice />
        <Particles count={120} />

        {/* Interaction controls constrained to keep model cinematic */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  );
}

// Custom inline SVG ScaleIcon for fallback / SSR
function ScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h18" />
    </svg>
  );
}
