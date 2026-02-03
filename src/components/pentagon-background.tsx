'use client';

import React, { useEffect } from 'react';
import anime from 'animejs';

const PentagonBackground = () => {
  useEffect(() => {
    const all = document.querySelectorAll<SVGPathElement>("#bluegistics-pentagon .pent-edge");

    if (all.length === 0) return;

    all.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    anime({
      targets: "#bluegistics-pentagon .outer",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1200,
      easing: "easeInOutSine",
    });

    anime({
      targets: "#bluegistics-pentagon .inner",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1100,
      easing: "easeInOutSine",
      delay: 900,
    });
  }, []);

  return (
    <svg
      id="bluegistics-pentagon"
      viewBox="0 0 1000 1000"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="rgba(212, 175, 55, 0.95)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="pent-edge outer" d="M 500 80 L 865 360" />
        <path className="pent-edge outer" d="M 865 360 L 725 790" />
        <path className="pent-edge outer" d="M 725 790 L 275 790" />
        <path className="pent-edge outer" d="M 275 790 L 135 360" />
        <path className="pent-edge outer" d="M 135 360 L 500 80" />

        <path className="pent-edge inner" d="M 500 80 L 725 790" />
        <path className="pent-edge inner" d="M 865 360 L 275 790" />
        <path className="pent-edge inner" d="M 725 790 L 135 360" />
        <path className="pent-edge inner" d="M 275 790 L 500 80" />
        <path className="pent-edge inner" d="M 135 360 L 865 360" />
      </g>
    </svg>
  );
};

export default PentagonBackground;
