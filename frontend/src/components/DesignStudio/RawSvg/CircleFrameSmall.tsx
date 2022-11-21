import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const CircleFrameSmall: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 558 558"
      height={"auto"}
      width={"100%"}
    >
      <g>
        <path
          fill={svgStyle.fill}
          opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
          className="cls-1"
          d="M645,94a266.2,266.2,0,1,1-103.92,21A265.25,265.25,0,0,1,645,94m0-12C490.91,82,366,206.91,366,361S490.91,640,645,640,924,515.09,924,361,799.09,82,645,82Z"
          transform="translate(-366 -82)"
        />
      </g>
    </svg>
  );
};

export default CircleFrameSmall;
