import React from "react";

interface Props {
  svgStyle: {
    fill: string | undefined;
    opacity?: number;
  };
}

const SquareFrame: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={"100%"}
      height={"100%"}
      viewBox="0 0 571 299"
      preserveAspectRatio={"none"}
    >
      <g
        fill={svgStyle.fill}
        opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
        id="Layer_8"
        data-name="Layer 8"
      >
        <path
          className="cls-1"
          d="M956,247V522H409V247H956m12-12H397V534H968V235Z"
          transform="translate(-397 -235)"
        />
      </g>
    </svg>
  );
};

export default SquareFrame;
