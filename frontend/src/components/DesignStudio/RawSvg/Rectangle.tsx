import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const Rectangle: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 178 91"
      preserveAspectRatio={"none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height={"100%"}
        width={"100%"}
        opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
        fill={svgStyle.fill}
      />
    </svg>
  );
};

export default Rectangle;
