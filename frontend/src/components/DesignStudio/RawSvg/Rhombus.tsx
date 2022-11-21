import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const Rhombus: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="auto"
      viewBox="0 0 543.46 462"
      preserveAspectRatio={"none"}
    >
      <g fill={svgStyle.fill} opacity={svgStyle.opacity} id="d">
        <polygon
          className="e"
          points=".6 461.5 81.88 .5 542.87 .5 461.58 461.5 .6 461.5"
        />
        <path
          className="f"
          d="M542.27,1l-81.11,460H1.16L82.27,1h460m1.19-1H81.46L0,462H462L543.46,0h0Z"
        />
      </g>
    </svg>
  );
};

export default Rhombus;
