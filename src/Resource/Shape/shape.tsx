import React, { CSSProperties } from "react";
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
  cross: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 48 49"
      fill="none"
    >
      <path
        d="M14.0078 17.8038H17.0078V14.8038V7.80371V3.80371H24.0078H31.0078V7.80371V14.8038V17.8038H34.0078H41.0078H45.0078V24.8038V31.8038H41.0078H34.0078H31.0078V34.8038V41.8038V45.8038H24.0078H17.0078V41.8038V34.8038V31.8038H14.0078H7.0078H3.00781V24.8038V17.8038H7.0078H14.0078Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
  rhombus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 51 51"
      fill="none"
    >
      <path
        d="M15.513 15.7015L15.5133 15.7012C18.8428 12.3633 22.0048 9.32509 24.3359 7.12001C24.7553 6.72331 25.1476 6.35381 25.5088 6.01462C25.8574 6.3452 26.2365 6.70727 26.6436 7.09843C28.9315 9.29671 32.0289 12.3422 35.3794 15.7012C38.7441 19.0744 41.8032 22.1405 44.0212 24.3634L44.7901 25.1339L35.1213 34.7795L25.4463 44.4313L15.7714 34.7795L6.10233 25.1337L15.513 15.7015Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
  diamond: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 57 41"
      fill="none"
    >
      <path
        d="M43.7269 4.5L51.0098 9.65874L28.5264 34.5089L6.3981 9.61457L13.3178 4.5H43.7269Z"
        stroke="black"
        stroke-width="10"
      />
    </svg>
  ),
  leaf: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 45 45"
      fill="none"
    >
      <path
        d="M5.87643 20.7882C9.15211 13.6711 16.3212 7.23708 23.6396 4.84533C27.6724 3.52687 38.5667 3.8122 40.0294 5.27415C40.643 5.88746 41.0073 8.93024 40.9999 13.3891C40.99 19.582 40.689 21.094 38.7152 24.8567C35.4797 31.0259 31.5593 35.0313 25.6445 38.2126C20.9463 40.7388 19.8864 40.9799 13.3662 40.9996C8.5803 41.0135 5.87887 40.67 5.1627 39.955C3.3005 38.0954 3.77468 25.3536 5.87643 20.7882Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
  ginkgo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 45 45"
      fill="none"
    >
      <path
        d="M22.1354 7L5 27.2553C5 27.2553 9.375 41 22.1354 41C37.4479 41 40 27.2553 40 27.2553L22.1354 7Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
};
export const shapesWithStyle = (style?: CSSProperties, className?: string) => ({
  cicle: (
    <svg
      style={style}
      className={className}
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
      style={style}
      className={className}
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
      className={className}
      style={style}
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
      className={className}
      style={style}
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
      className={className}
      style={style}
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
      className={className}
      style={style}
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
  cross: (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 48 49"
      fill="none"
    >
      <path
        d="M14.0078 17.8038H17.0078V14.8038V7.80371V3.80371H24.0078H31.0078V7.80371V14.8038V17.8038H34.0078H41.0078H45.0078V24.8038V31.8038H41.0078H34.0078H31.0078V34.8038V41.8038V45.8038H24.0078H17.0078V41.8038V34.8038V31.8038H14.0078H7.0078H3.00781V24.8038V17.8038H7.0078H14.0078Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
  rhombus: (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 51 51"
      fill="none"
    >
      <path
        d="M15.513 15.7015L15.5133 15.7012C18.8428 12.3633 22.0048 9.32509 24.3359 7.12001C24.7553 6.72331 25.1476 6.35381 25.5088 6.01462C25.8574 6.3452 26.2365 6.70727 26.6436 7.09843C28.9315 9.29671 32.0289 12.3422 35.3794 15.7012C38.7441 19.0744 41.8032 22.1405 44.0212 24.3634L44.7901 25.1339L35.1213 34.7795L25.4463 44.4313L15.7714 34.7795L6.10233 25.1337L15.513 15.7015Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
  diamond: (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 57 41"
      fill="none"
    >
      <path
        d="M43.7269 4.5L51.0098 9.65874L28.5264 34.5089L6.3981 9.61457L13.3178 4.5H43.7269Z"
        stroke="black"
        stroke-width="10"
      />
    </svg>
  ),
  leaf: (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 45 45"
      fill="none"
    >
      <path
        d="M5.87643 20.7882C9.15211 13.6711 16.3212 7.23708 23.6396 4.84533C27.6724 3.52687 38.5667 3.8122 40.0294 5.27415C40.643 5.88746 41.0073 8.93024 40.9999 13.3891C40.99 19.582 40.689 21.094 38.7152 24.8567C35.4797 31.0259 31.5593 35.0313 25.6445 38.2126C20.9463 40.7388 19.8864 40.9799 13.3662 40.9996C8.5803 41.0135 5.87887 40.67 5.1627 39.955C3.3005 38.0954 3.77468 25.3536 5.87643 20.7882Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
  ginkgo: (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="31"
      viewBox="0 0 45 45"
      fill="none"
    >
      <path
        d="M22.1354 7L5 27.2553C5 27.2553 9.375 41 22.1354 41C37.4479 41 40 27.2553 40 27.2553L22.1354 7Z"
        stroke="black"
        stroke-width="8"
      />
    </svg>
  ),
});

export default shapes;
