'use client';

import React, { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: 'right' | 'left' | 'up' | 'down';
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: React.ElementType;
  textAlign?: 'left' | 'center' | 'right';
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: 'evenodd' | 'random';
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

export interface ShuffleRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const Shuffle = forwardRef<ShuffleRef, ShuffleProps>(({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}, ref) => {
  const containerRef = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef<any>(null);
  const wrappersRef = useRef<HTMLSpanElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);

  const userHasFont = useMemo(
    () => (style && style.fontFamily) || (className && /font[-[]/i.test(className)),
    [style, className]
  );

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useEffect(() => {
    if ('fonts' in document) {
      if ((document as any).fonts.status === 'loaded') setFontsLoaded(true);
      else (document as any).fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  const teardown = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (wrappersRef.current.length) {
      wrappersRef.current.forEach(wrap => {
        const inner = wrap.firstElementChild;
        const orig = inner?.querySelector('[data-orig="1"]');
        if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);
      });
      wrappersRef.current = [];
    }
    try {
      splitRef.current?.revert();
    } catch {
      /* noop */
    }
    splitRef.current = null;
    playingRef.current = false;
  }, []);

  const build = useCallback(() => {
    if (!containerRef.current) return;
    teardown();

    const el = containerRef.current;
    let computedFont = '';
    if (userHasFont) {
      computedFont = (style.fontFamily as string) || getComputedStyle(el).fontFamily || '';
    } else {
      computedFont = `'Press Start 2P', sans-serif`;
    }

    splitRef.current = new GSAPSplitText(el, {
      type: 'chars',
      charsClass: 'shuffle-char',
      wordsClass: 'shuffle-word',
      linesClass: 'shuffle-line',
      smartWrap: true,
      reduceWhiteSpace: false
    });

    const chars = (splitRef.current.chars || []) as HTMLElement[];
    wrappersRef.current = [];

    const rolls = Math.max(1, Math.floor(shuffleTimes));
    const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || '';

    chars.forEach(ch => {
      const parent = ch.parentElement;
      if (!parent) return;

      const w = ch.getBoundingClientRect().width;
      const h = ch.getBoundingClientRect().height;
      if (!w) return;

      const wrap = document.createElement('span');
      wrap.className = 'inline-block overflow-hidden text-left';
      Object.assign(wrap.style, {
        width: w + 'px',
        height: shuffleDirection === 'up' || shuffleDirection === 'down' ? h + 'px' : 'auto',
        verticalAlign: 'bottom'
      });

      const inner = document.createElement('span');
      inner.className =
        'inline-block will-change-transform origin-left transform-gpu ' +
        (shuffleDirection === 'up' || shuffleDirection === 'down' ? 'whitespace-normal' : 'whitespace-nowrap');

      parent.insertBefore(wrap, ch);
      wrap.appendChild(inner);

      const firstOrig = ch.cloneNode(true) as HTMLElement;
      firstOrig.className =
        'text-left ' + (shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block');
      Object.assign(firstOrig.style, { width: w + 'px', fontFamily: computedFont });

      ch.setAttribute('data-orig', '1');
      ch.className =
        'text-left ' + (shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block');
      Object.assign(ch.style, { width: w + 'px', fontFamily: computedFont });

      inner.appendChild(firstOrig);
      for (let k = 0; k < rolls; k++) {
        const c = ch.cloneNode(true) as HTMLElement;
        if (scrambleCharset) c.textContent = rand(scrambleCharset);
        c.className =
          'text-left ' + (shuffleDirection === 'up' || shuffleDirection === 'down' ? 'block' : 'inline-block');
        Object.assign(c.style, { width: w + 'px', fontFamily: computedFont });
        inner.appendChild(c);
      }
      inner.appendChild(ch);

      const steps = rolls + 1;

      if (shuffleDirection === 'right' || shuffleDirection === 'down') {
        const firstCopy = inner.firstElementChild;
        const real = inner.lastElementChild;
        if (real) inner.insertBefore(real, inner.firstChild);
        if (firstCopy) inner.appendChild(firstCopy);
      }

      let startX = 0;
      let finalX = 0;
      let startY = 0;
      let finalY = 0;

      if (shuffleDirection === 'right') {
        startX = -steps * w;
        finalX = 0;
      } else if (shuffleDirection === 'left') {
        startX = 0;
        finalX = -steps * w;
      } else if (shuffleDirection === 'down') {
        startY = -steps * h;
        finalY = 0;
      } else if (shuffleDirection === 'up') {
        startY = 0;
        finalY = -steps * h;
      }

      if (shuffleDirection === 'left' || shuffleDirection === 'right') {
        gsap.set(inner, { x: startX, y: 0, force3D: true });
        inner.setAttribute('data-start-x', String(startX));
        inner.setAttribute('data-final-x', String(finalX));
      } else {
        gsap.set(inner, { x: 0, y: startY, force3D: true });
        inner.setAttribute('data-start-y', String(startY));
        inner.setAttribute('data-final-y', String(finalY));
      }

      if (colorFrom) inner.style.color = colorFrom;
      wrappersRef.current.push(wrap);
    });
  }, [userHasFont, style.fontFamily, shuffleTimes, shuffleDirection, scrambleCharset, colorFrom, teardown]);

  const randomizeScrambles = useCallback(() => {
    if (!scrambleCharset) return;
    wrappersRef.current.forEach(w => {
      const strip = w.firstElementChild;
      if (!strip) return;
      const kids = Array.from(strip.children);
      for (let i = 1; i < kids.length - 1; i++) {
        kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
      }
    });
  }, [scrambleCharset]);

  const cleanupToStill = useCallback(() => {
    wrappersRef.current.forEach(w => {
      const strip = w.firstElementChild as HTMLElement;
      if (!strip) return;
      const real = strip.querySelector('[data-orig="1"]');
      if (!real) return;
      strip.replaceChildren(real);
      strip.style.transform = 'none';
      strip.style.willChange = 'auto';
    });
  }, []);

  const play = useCallback(() => {
    const strips = wrappersRef.current.map(w => w.firstElementChild as HTMLElement);
    if (!strips.length) return;

    playingRef.current = true;
    const isVertical = shuffleDirection === 'up' || shuffleDirection === 'down';

    const tl = gsap.timeline({
      smoothChildTiming: true,
      repeat: loop ? -1 : 0,
      repeatDelay: loop ? loopDelay : 0,
      onRepeat: () => {
        if (scrambleCharset) randomizeScrambles();
        if (isVertical) {
          gsap.set(strips, { y: (i, t) => parseFloat(t.getAttribute('data-start-y') || '0') });
        } else {
          gsap.set(strips, { x: (i, t) => parseFloat(t.getAttribute('data-start-x') || '0') });
        }
        onShuffleComplete?.();
      },
      onComplete: () => {
        playingRef.current = false;
        if (!loop) {
          cleanupToStill();
          if (colorTo) gsap.set(strips, { color: colorTo });
          onShuffleComplete?.();
        }
      }
    });

    const addTween = (targets: HTMLElement[], at: number | string) => {
      const vars: any = {
        duration,
        ease,
        force3D: true,
        stagger: animationMode === 'evenodd' ? stagger : 0
      };
      if (isVertical) {
        vars.y = (i: number, t: HTMLElement) => parseFloat(t.getAttribute('data-final-y') || '0');
      } else {
        vars.x = (i: number, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0');
      }

      tl.to(targets, vars, at);
      if (colorFrom && colorTo) tl.to(targets, { color: colorTo, duration, ease }, at);
    };

    if (animationMode === 'evenodd') {
      const odd = strips.filter((_, i) => i % 2 === 1);
      const even = strips.filter((_, i) => i % 2 === 0);
      const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
      const evenStart = odd.length ? oddTotal * 0.7 : 0;
      if (odd.length) addTween(odd, 0);
      if (even.length) addTween(even, evenStart);
    } else {
      strips.forEach(strip => {
        const d = Math.random() * maxDelay;
        const vars: any = { duration, ease, force3D: true };
        if (isVertical) vars.y = parseFloat(strip.getAttribute('data-final-y') || '0');
        else vars.x = parseFloat(strip.getAttribute('data-final-x') || '0');
        tl.to(strip, vars, d);
        if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);
      });
    }

    tlRef.current = tl;
  }, [shuffleDirection, loop, loopDelay, scrambleCharset, randomizeScrambles, onShuffleComplete, cleanupToStill, colorTo, duration, ease, animationMode, stagger, colorFrom, maxDelay]);

  useImperativeHandle(ref, () => ({
    next: () => { /* logic for multiple texts would go here if needed */ },
    previous: () => { },
    jumpTo: () => { },
    reset: () => {
      if (playingRef.current) return;
      build();
      if (scrambleCharset) randomizeScrambles();
      play();
    }
  }), [build, scrambleCharset, randomizeScrambles, play]);

  useGSAP(() => {
    if (!containerRef.current || !text || !fontsLoaded) return;
    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onShuffleComplete?.();
      return;
    }

    const start = scrollTriggerStart;
    const el = containerRef.current;

    const armHover = () => {
      if (!triggerOnHover || !el) return;
      const handler = () => {
        if (playingRef.current) return;
        build();
        if (scrambleCharset) randomizeScrambles();
        play();
      };
      hoverHandlerRef.current = handler;
      el.addEventListener('mouseenter', handler);
    };

    const create = () => {
      build();
      if (scrambleCharset) randomizeScrambles();
      play();
      armHover();
      setReady(true);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: triggerOnce,
      onEnter: create
    });

    return () => {
      st.kill();
      if (hoverHandlerRef.current && el) {
        el.removeEventListener('mouseenter', hoverHandlerRef.current);
      }
      teardown();
      setReady(false);
    };
  }, {
    dependencies: [text, fontsLoaded, scrollTriggerStart, triggerOnce, triggerOnHover, respectReducedMotion, build, play, scrambleCharset, randomizeScrambles, teardown, onShuffleComplete],
    scope: containerRef
  });

  const baseTw = 'inline-block whitespace-normal break-words will-change-transform uppercase text-[4rem] leading-none';
  const classes = `${baseTw} ${ready ? 'visible' : 'invisible'} ${className}`.trim();
  const Tag = tag || 'p';
  const commonStyle = { textAlign, ...style };

  return React.createElement(Tag as string, { ref: containerRef as any, className: classes, style: commonStyle }, text);
});

Shuffle.displayName = 'Shuffle';

export default Shuffle;
