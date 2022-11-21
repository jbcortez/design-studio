import React from "react";

interface Props {
  svgStyle: { fill: string | undefined; opacity?: number };
}

const WavyMobile: React.FC<Props> = ({ svgStyle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 613 465.25"
      fill={svgStyle.fill}
      opacity={typeof svgStyle.opacity === "number" ? svgStyle.opacity : 1}
      height="100%"
      width="100%"
      preserveAspectRatio={"none"}
    >
      <g>
        <path d="M.5,16.75C23.76,8.61,60.53-1.2,105.5,.75c43.14,1.87,52.73,12.78,100,15,54.38,2.55,56.23-11.2,114-11,66.12,.23,64.78,18.26,120,14,43.12-3.33,57.12-15.34,107-16,27.81-.37,50.71,3,66,6V464.75H.5V16.75Z" />
      </g>
    </svg>
  );
};

export default WavyMobile;
