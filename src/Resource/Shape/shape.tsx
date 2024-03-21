import React from "react";

const shapes = {
  cicle: (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14.5" cy="14.5" r="11.5" stroke="black" stroke-width="6" />
    </svg>
  ),
  square: (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="19"
        height="19"
        stroke="black"
        stroke-width="6"
      />
    </svg>
  ),
  triangle: (
    <svg
      width="32"
      height="27"
      viewBox="0 0 32 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.6077 24L16 6L26.3923 24H5.6077Z"
        stroke="black"
        stroke-width="6"
      />
    </svg>
  ),
  start: (
    <svg
      width="37"
      height="34"
      viewBox="0 0 37 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 6.47214L20.7514 13.4012L21.2004 14.7832H22.6535H29.9392L24.0449 19.0656L22.8694 19.9197L23.3184 21.3017L25.5698 28.2307L19.6756 23.9483L18.5 23.0942L17.3244 23.9483L11.4302 28.2307L13.6816 21.3017L14.1306 19.9197L12.9551 19.0656L7.06082 14.7832H14.3465H15.7996L16.2486 13.4012L18.5 6.47214Z"
        stroke="black"
        stroke-width="4"
      />
    </svg>
  ),
  pentagon: (
    <svg
      width="31"
      height="29"
      viewBox="0 0 31 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.28534 11.8561L15.5 3.7082L26.7147 11.8561L22.431 25.0398H8.56896L4.28534 11.8561Z"
        stroke="black"
        stroke-width="6"
      />
    </svg>
  ),
  hexagon: (
    <svg
      width="27"
      height="31"
      viewBox="0 0 27 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.07661 9.48205L13.5 3.4641L23.9234 9.48205V21.518L13.5 27.5359L3.07661 21.518V9.48205Z"
        stroke="black"
        stroke-width="6"
      />
    </svg>
  ),
};

export default shapes;
