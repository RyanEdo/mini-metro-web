import React from "react";

const GoToIcon = ({ className }: { className?: string }) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}

  >
    <mask
      id="mask0_863_607"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="50"
      height="50"
    >
      <rect
        x="49.5"
        y="24.749"
        width="35"
        height="35"
        transform="rotate(135 49.5 24.749)"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_863_607)">
      <path
        d="M21.665 15.4671L34.0394 15.4671L34.0394 27.8415L31.152 27.8415L31.152 20.4169L16.509 35.0599L14.4466 32.9975L29.0896 18.3545L21.665 18.3545L21.665 15.4671Z"
        fill="white"
      />
    </g>
  </svg>
);

export default GoToIcon;
