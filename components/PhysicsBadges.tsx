'use client';

import React, { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

export interface PhysicsBadgesProps {
  children: React.ReactNode;
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  restitution?: number;
  className?: string;
}

export default function PhysicsBadges({
  children,
  trigger = 'scroll',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  restitution = 0.7,
  className = ''
}: PhysicsBadgesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const [resizeKey, setResizeKey] = useState(0);

  // Handle Resize to reset and adapt bounds
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setResizeKey(prev => prev + 1);
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle Trigger Activation
  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }

    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, resizeKey]);

  // Matter.js Physics Engine Loop
  useEffect(() => {
    if (!effectStarted || !containerRef.current || !badgesContainerRef.current || !canvasContainerRef.current) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    // Create Engine and World
    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    // Create Renderer
    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    // Boundaries
    // Boundaries with padding offset to prevent badges from clipping or touching container borders
    const paddingOffset = 40; // px
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height - paddingOffset + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(paddingOffset - 25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width - paddingOffset + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, paddingOffset - 25, width, 50, boundaryOptions);

    // Grab all rendered badge elements
    const badgeElems = badgesContainerRef.current.querySelectorAll('.physics-badge');
    const badgeBodies = Array.from(badgeElems).map(elem => {
      const htmlElem = elem as HTMLElement;
      const rect = htmlElem.getBoundingClientRect();

      // Calculate initial X & Y relative to container
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      // Create high-fidelity physics body mapping the dimensions of the pill
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution,
        frictionAir: 0.02,
        friction: 0.1
      });

      // Give a tiny random initial velocity for a organic, playful drop
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 2 - 2 // slight pop upward
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

      return { elem: htmlElem, body };
    });

    // Switch badges to absolute positioning to allow the simulation to control them
    badgeBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = 'translate(-50%, -50%)';
      elem.style.margin = '0';
      elem.style.transition = 'none'; // prevent CSS transitions from conflicting with loop
    });

    // Add Mouse Dragging Constraints
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    // Add everything to World
    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...badgeBodies.map(wb => wb.body)
    ]);

    // Start Matter Runner
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Sync loop: Updates DOM coordinates to match Matter.js physics coordinates
    let animationId: number;
    const updateLoop = () => {
      badgeBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      animationId = requestAnimationFrame(updateLoop);
    };
    animationId = requestAnimationFrame(updateLoop);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, resizeKey, gravity, wireframes, backgroundColor, mouseConstraintStiffness, restitution]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative z-[1] w-full h-[380px] md:h-[480px] cursor-grab active:cursor-grabbing overflow-hidden p-8 bg-transparent ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      {/* Badges Container - Flex wrapper during initial render/SSR, then absolute positioned by physics */}
      <div
        ref={badgesContainerRef}
        className="flex flex-wrap justify-center items-center gap-6 w-full h-full relative z-10"
      >
        {children}
      </div>

      {/* Transparent canvas for mouse/renderer capture */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none w-full h-full" ref={canvasContainerRef} />
    </div>
  );
}
