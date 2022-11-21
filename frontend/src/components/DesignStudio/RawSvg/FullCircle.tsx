import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const FullCircle: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 558 558"
    >
      <g
        fill={svgStyle.fill}
        opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
        id="a"
      >
        <path d="M279,552c-150.77,.04-273.04-122.15-273.08-272.92C5.88,128.31,128.07,6.04,278.84,6c150.77-.04,273.04,122.15,273.08,272.92,.02,72.41-28.73,141.87-79.92,193.08-51.07,51.37-120.56,80.18-193,80Z" />
        <path d="M279,12c147.02,.16,266.07,119.47,265.91,266.49-.16,147.02-119.47,266.07-266.49,265.91S12.35,424.93,12.51,277.91c.12-106.87,64.13-203.31,162.57-244.91,32.87-13.92,68.22-21.06,103.92-21m0-12C124.91,0,0,124.91,0,279s124.91,279,279,279,279-124.91,279-279S433.09,0,279,0Z" />
      </g>
    </svg>
  );
};

export default FullCircle;
