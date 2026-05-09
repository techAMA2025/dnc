/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame, ThreeElement } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

const MeshLineGeometryTag = 'meshLineGeometry' as any;
const MeshLineMaterialTag = 'meshLineMaterial' as any;


function CardFallback({ nodes, materials, texture, isMobile, hover, drag, card, vec }: any) {
  if (nodes?.card) {
    return (
      <group
        scale={2.25}
        position={[0, -1.2, -0.05]}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onPointerUp={e => ((e.target as HTMLElement).releasePointerCapture(e.pointerId), drag(false))}
        onPointerDown={e => (
          (e.target as HTMLElement).setPointerCapture(e.pointerId),
          drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
        )}
      >
        <mesh geometry={nodes.card.geometry}>
          <meshPhysicalMaterial
            map={materials.base.map}
            map-anisotropy={16}
            clearcoat={isMobile ? 0 : 1}
            clearcoatRoughness={0.15}
            roughness={0.9}
            metalness={0.8}
          />
        </mesh>
        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
      </group>
    );
  }

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
      {/* Main Card Body */}
      <mesh>
        <boxGeometry args={[1.6, 2.25, 0.05]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          map={texture}
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
        />
      </mesh>
      {/* Clip at the top */}
      <mesh position={[0, 1.125, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>
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
  
  let nodes: any = null;
  let materials: any = null;
  try {
    const gltf = useGLTF('/assets/card.glb');
    nodes = gltf.nodes;
    materials = gltf.materials;
  } catch (e) {}

  const texture = useTexture('/assets/lanyard.png');
  const cardTexture = useTexture('/assets/card_front.png');
  
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  // Rope structure
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.125, 0] // Exact top of the card fallback
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
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* Positions are absolute to avoid group transformation issues */}
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
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <CardFallback 
          nodes={nodes} 
          materials={materials} 
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
          depthTest={true}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={0.15}
        />
      </mesh>
    </>
  );
}

function LanyardScene({ position = [0, 0, 15], gravity = [0, -40, 0], fov = 30, transparent = true }: { position?: [number, number, number]; gravity?: [number, number, number]; fov?: number; transparent?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        }}
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

export default function LanyardCTA() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#0439B8]/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="w-full h-full cursor-grab active:cursor-grabbing relative z-10">
        <LanyardScene />
      </div>
    </section>
  );
}
