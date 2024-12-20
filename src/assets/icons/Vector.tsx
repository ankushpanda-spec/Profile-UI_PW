import * as React from "react";
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={229}
    height={251}
    viewBox="0 0 229 251"
    fill="none"
    {...props}
  >
    <path
      opacity={0.6}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M228.865 125.83C227.441 152.578 210.723 174.002 193.63 194.598C173.963 218.297 155.749 251.278 124.989 250.998C94.2811 250.719 79.2575 215.154 57.58 193.363C35.9697 171.639 4.07272 156.287 0.474665 125.83C-3.35299 93.428 16.5422 63.3245 39.4825 40.1651C62.5206 16.9068 92.334 -1.7188 124.989 0.126201C156.401 1.90102 181.301 25.0319 201.365 49.3116C219.303 71.0192 230.363 97.688 228.865 125.83Z"
      fill="#D2CCFF"
    />
  </svg>
);
export default SVGComponent;