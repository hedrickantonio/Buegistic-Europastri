'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedLogo = () => {
  const animationRef = useRef<anime.AnimeTimelineInstance | null>(null);

  useEffect(() => {
    animationRef.current = anime.timeline({
      easing: 'easeInOutSine',
      duration: 800,
    });

    animationRef.current
      .add({
        targets: '#bluegistics-logo path',
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: anime.stagger(100),
      })
      .add({
        targets: '#bluegistics-logo',
        opacity: [0, 1],
        duration: 500,
      }, '-=800');

    return () => {
      animationRef.current?.pause();
    };
  }, []);

  return (
    <div className="mb-6">
      <svg
        id="bluegistics-logo"
        width="100"
        height="100"
        viewBox="-60 -60 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-0"
      >
        <style>
          {`
            #bluegistics-logo path {
              stroke: hsl(var(--primary));
              stroke-width: 3;
              fill: none;
              stroke-linecap: round;
            }
          `}
        </style>
        {/* Pentagon shape composed of 5 lines */}
        <path d="M0 -52 L49.5 -16.0" />
        <path d="M49.5 -16.0 L30.6 42.0" />
        <path d="M30.6 42.0 L-30.6 42.0" />
        <path d="M-30.6 42.0 L-49.5 -16.0" />
        <path d="M-49.5 -16.0 L0 -52" />
        
        {/* Lines from vertices to center */}
        <path d="M0 0 L0 -52" />
        <path d="M0 0 L49.5 -16.0" />
        <path d="M0 0 L30.6 42.0" />
        <path d="M0 0 L-30.6 42.0" />
        <path d="M0 0 L-49.5 -16.0" />
      </svg>
    </div>
  );
};

export default AnimatedLogo;
