import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const StylishFrame: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={"auto"}
      width={"100%"}
      viewBox="0 0 423.95 192.05"
      preserveAspectRatio={"none"}
    >
      <g id="c">
        <path
          fill={svgStyle.fill}
          opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
          className="d"
          d="M22.45,192c-.29-12.28-10.17-22.16-22.45-22.45V22.5c12.3-.29,22.19-10.2,22.45-22.5H401.55c.26,12.28,10.12,22.18,22.4,22.5V169.6c-12.28,.29-22.16,10.17-22.45,22.45l-379.05-.05Z"
        />
      </g>
    </svg>
  );
};

export default StylishFrame;
