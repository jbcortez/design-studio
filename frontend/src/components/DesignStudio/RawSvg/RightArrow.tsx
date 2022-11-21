import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const RightArrow: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={"auto"}
      width={"100%"}
      viewBox="0 0 521.34 425.68"
      preserveAspectRatio={"none"}
    >
      <g
        fill={svgStyle.fill}
        opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
      >
        <polygon points="309 284.84 .5 284.84 .5 140.84 309 140.84 309 1.21 520.63 212.84 309 424.47 309 284.84" />
        <path d="M309.5,2.41l210.43,210.43-210.43,210.43v-138.93H1V141.34H309.5V2.41m-1-2.41V140.34H0v145H308.5v140.34l212.84-212.84L308.5,0Z" />
      </g>
    </svg>
  );
};

export default RightArrow;
