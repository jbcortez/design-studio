import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const ClipmaskBG1: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 551.88 491"
      fill={svgStyle.fill}
      opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
      height="100%"
      width="100%"
      preserveAspectRatio={"none"}
    >
      <g>
        <path d="M.88,.5C11.78,18.82,25.18,46.89,28.88,82.5c5.67,54.6-17.19,71.88-11,127,5.72,50.97,26.35,45.85,31,97,4.52,49.65-13.7,67.88-6,118,4.44,28.93,14.91,51.51,23,66h485.5V1L.88,.5Z" />
      </g>
    </svg>
  );
};

export default ClipmaskBG1;
