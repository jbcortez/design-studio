import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const OffsetSquareRight: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 450.5 320"
    >
      <g
        fill={svgStyle.fill}
        opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
      >
        <polygon points="450.5 320 .5 320 0 0 344.5 0 450.5 320" />
      </g>
    </svg>
  );
};

export default OffsetSquareRight;
