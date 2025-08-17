'use client';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, MeshReflectorMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Luxury blade component with premium materials
function Blade() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Elegant slow rotation showcasing the blade
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* Premium blade geometry */}
        <boxGeometry args={[0.08, 2.5, 0.02]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={2}
          transmission={0.1}
          thickness={0.5}
        />
      </mesh>
    </Float>
  );
}

// Premium environment and lighting
function SceneSetup() {
  const { camera } = useThree();
  
  React.useEffect(() => {
    camera.position.set(0, 0, 4);
  }, [camera]);

  return (
    <>
      {/* HDRI Environment for realistic reflections */}
      <Environment preset="studio" />
      
      {/* Premium lighting setup */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-5, 10, -5]}
        intensity={0.5}
        angle={0.6}
        penumbra={0.5}
        castShadow
      />
      <pointLight position={[0, 5, 0]} intensity={0.3} />
      
      {/* Luxury ground reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={100}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#000000"
          metalness={1}
          roughness={0}
          mirror={0.8}
        />
      </mesh>
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 5, 20]} />
    </>
  );
}

interface ThreeSceneProps {
  onCreated?: () => void;
}

export default function ThreeScene({ onCreated }: ThreeSceneProps) {
  const [error, setError] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleContextLost = React.useCallback((event: Event) => {
    event.preventDefault();
    console.warn('WebGL context lost, attempting to restore...');
    setError(true);
    // Attempt to restore context after a short delay
    setTimeout(() => {
      setError(false);
    }, 100);
  }, []);

  const handleContextRestored = React.useCallback(() => {
    console.log('WebGL context restored');
    setError(false);
  }, []);

  const handleCreated = React.useCallback((state: any) => {
    // Add event listeners for context loss/restoration
    const gl = state.gl;
    const canvas = gl.domElement;
    
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    // Force initial render
    state.gl.render(state.scene, state.camera);
    
    // Notify parent component
    onCreated?.();
    
    // Cleanup function
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [onCreated, handleContextLost, handleContextRestored]);

  if (error) {
    return (
      <div className="absolute inset-0 bg-dlc-bg flex items-center justify-center">
        <div className="text-dlc-text-secondary">Loading 3D scene...</div>
      </div>
    );
  }

  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [0, 0, 4], fov: 50 }}
      onCreated={handleCreated}
      style={{ background: '#0a0a0a' }}
      gl={{ 
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
        alpha: true
      }}
      frameloop="always"
      dpr={[1, 2]}
    >
      <SceneSetup />
      <Blade />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
