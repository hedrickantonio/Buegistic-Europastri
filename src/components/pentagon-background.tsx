'use client';

import React, { useEffect } from 'react';
import anime from 'animejs';

const PentagonBackground = () => {
  useEffect(() => {
    const path = document.querySelector("#spiral-path");
    if (!path || !(path instanceof SVGPathElement)) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    
    // Looping drawing animation
    const animation = anime({
      targets: path,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3500,
      easing: "easeInOutSine",
      loop: true,
      direction: 'alternate', // Draws then "undraws"
    });

    return () => {
      // Clean up the animation on component unmount
      animation.pause();
    };
  }, []);

  return (
    <div className="pentagon-layer" aria-hidden="true">
      <svg
        id="pentagon-spiral-svg"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* A single continuous path that draws a pentagon and inner star */}
        <path
          id="spiral-path"
          d="M 500 80 L 865 360 L 725 790 L 275 790 L 135 360 L 500 80 L 725 790 L 135 360 L 865 360 L 275 790 L 500 80"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default PentagonBackground;
