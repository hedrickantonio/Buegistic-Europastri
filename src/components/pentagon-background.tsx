'use client';

import React, { useEffect } from 'react';
import anime from 'animejs';

const PentagonBackground = () => {
  useEffect(() => {
    const paths = document.querySelectorAll<SVGPathElement>("#bluegistics-pentagon .pent-edge");

    if (paths.length === 0) return;

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    anime({
      targets: "#bluegistics-pentagon .pent-edge",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1400,
      easing: "easeInOutSine",
      delay: anime.stagger(0),
    });
  }, []);

  return (
    <svg
      id="bluegistics-pentagon"
      viewBox="0 0 1000 1000"
      width="900"
      height="900"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <g
        fill="none"
        stroke="rgba(212, 175, 55, 0.95)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="pent-edge" id="edge-1" d="M 500 80 L 865 360" />
        <path className="pent-edge" id="edge-2" d="M 865 360 L 725 790" />
        <path className="pent-edge" id="edge-3" d="M 725 790 L 275 790" />
        <path className="pent-edge" id="edge-4" d="M 275 790 L 135 360" />
        <path className="pent-edge" id="edge-5" d="M 135 360 L 500 80" />
      </g>
    </svg>
  );
};

export default PentagonBackground;
