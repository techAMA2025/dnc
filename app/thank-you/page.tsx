/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Html } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, ArrowUpRight } from 'lucide-react';

// Extend Three.js elements for MeshLine
extend({ MeshLineGeometry, MeshLineMaterial });

// Compilation-safe JSX tags for TypeScript with MeshLine in Next.js
const MeshLineGeometryTag = 'meshLineGeometry' as any;
const MeshLineMaterialTag = 'meshLineMaterial' as any;

// Static asset URLs
const CARD_GLB_URL = '/assets/card.glb';
const LANYARD_PNG_URL = '/assets/lanyard.png';
const CARD_FRONT_PNG_URL = '/assets/card_front.png';

// Fallback component to render if GLB fails to load, or to combine materials
function CardFallback({ texture, isMobile, hover, drag, card, vec }: any) {
  return (
    <group
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      onPointerUp={e => ((e.target as HTMLElement).releasePointerCapture(e.pointerId), drag(false))}
      onPointerDown={e => (
        (e.target as HTMLElement).setPointerCapture(e.pointerId),
        drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
      )}
    >
      <mesh>
        <boxGeometry args={[1.6, 2.25, 0.05]} />
        {/* Right face */}
        <meshPhysicalMaterial attach="material-0" color="#f8fafc" roughness={0.5} />
        {/* Left face */}
        <meshPhysicalMaterial attach="material-1" color="#f8fafc" roughness={0.5} />
        {/* Top face */}
        <meshPhysicalMaterial attach="material-2" color="#f8fafc" roughness={0.5} />
        {/* Bottom face */}
        <meshPhysicalMaterial attach="material-3" color="#f8fafc" roughness={0.5} />
        {/* Front face (Solid White PVC) */}
        <meshPhysicalMaterial attach="material-4" color="#ffffff" roughness={0.15} metalness={0.05} clearcoat={1.0} clearcoatRoughness={0.05} />
        {/* Back face (Solid White PVC) */}
        <meshPhysicalMaterial attach="material-5" color="#ffffff" roughness={0.15} metalness={0.05} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>

      {/* Realistic metal clip at the top of the card */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.08]} />
        <meshStandardMaterial color="#dddddd" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <torusGeometry args={[0.07, 0.015, 16, 32]} />
        <meshStandardMaterial color="#dddddd" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Thank you message overlay using highly reliable HTML-in-WebGL integration */}
      <Html
        position={[0, 0, 0.03]}
        transform
        occlude
        pointerEvents="none"
        className="w-[50px] h-[50px] flex flex-col items-center justify-center p-2 select-none text-center"
      >
        <div className="text-[8px] font-extrabold text-zinc-950 leading-snug font-sans px-1 drop-shadow-sm">
          Thank you for filling the form!
        </div>
      </Html>
    </group>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef<any>(null),
    fixed = useRef<any>(null),
    j1 = useRef<any>(null),
    j2 = useRef<any>(null),
    j3 = useRef<any>(null),
    card = useRef<any>(null);
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps: any = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  // Textures
  const texture = useTexture(LANYARD_PNG_URL);
  const cardTexture = useTexture(CARD_FRONT_PNG_URL);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  // Rope joints with exact attachment offsets
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.125, 0] // Attached perfectly to the top of the card
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      // Smoothly damp angular velocity to stabilize card physics and stop jittering
      const angVel = card.current.angvel();
      card.current.setAngvel({
        x: angVel.x * 0.95,
        y: angVel.y * 0.92,
        z: angVel.z * 0.95
      });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* Positions are absolute to avoid parent group transformation issues with physics joints */}
      <RigidBody ref={fixed} {...segmentProps} type="fixed" position={[0, 4, 0]} />
      <RigidBody ref={j1} {...segmentProps} position={[0.5, 4, 0]}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j2} {...segmentProps} position={[1, 4, 0]}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j3} {...segmentProps} position={[1.5, 4, 0]}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'} position={[2, 4, 0]}>
        <CuboidCollider args={[0.8, 1.125, 0.05]} />
        <CardFallback
          texture={cardTexture}
          isMobile={isMobile}
          hover={hover}
          drag={drag}
          card={card}
          vec={vec}
        />
      </RigidBody>
      <mesh ref={band}>
        <MeshLineGeometryTag />
        <MeshLineMaterialTag
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={0.12}
        />
      </mesh>
    </>
  );
}

function Lanyard({ position = [0, 0, 15], gravity = [0, -40, 0], fov = 30, transparent = true }: { position?: [number, number, number]; gravity?: [number, number, number]; fov?: number; transparent?: boolean }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity as [number, number, number]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="w-full h-screen bg-[#020514] relative overflow-hidden flex items-center justify-center pt-20">
      {/* Background glow graphics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#002B9A]/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#4f46e5]/10 blur-[120px] rounded-full pointer-events-none" />

     

      {/* Interactive Pass Floating label */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-2 animate-bounce">
          <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
          Drag &amp; Swing the pass
        </div>
      </div>

      {/* Full screen Lanyard Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
        <Lanyard />
      </div>
    </main>
  );
}
