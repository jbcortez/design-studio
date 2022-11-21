import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const CircleFrameMedium: React.FC<Props> = ({ svgStyle }) => {
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
          d="M645,122a238.18,238.18,0,1,1-93,18.77A237.35,237.35,0,0,1,645,122m0-40C490.91,82,366,206.91,366,361S490.91,640,645,640,924,515.09,924,361,799.09,82,645,82Z"
          transform="translate(-366 -82)"
        />
      </g>
    </svg>
  );
};

export default CircleFrameMedium;
