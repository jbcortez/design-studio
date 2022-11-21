import React, { memo, useLayoutEffect, useState } from "react";
import ResizeHandles from "./ResizeHandles";
import styled from "styled-components";
import { Pos, Style, SVGVariation } from "../../types";
import { getShapeStyles } from "../../util/functions";
import FullCircle from "./RawSvg/FullCircle";
import Rectangle from "./RawSvg/Rectangle";
import SquareFrame from "./RawSvg/SquareFrame";
import CircleFrameSmall from "./RawSvg/CircleFrameSmall";
import CircleFrameMedium from "./RawSvg/CircleFrameMedium";
import CircleFrameLarge from "./RawSvg/CircleFrameLarge";
import Rhombus from "./RawSvg/Rhombus";
import StylishFrame from "./RawSvg/StylishFrame";
import RightArrow from "./RawSvg/RightArrow";
import OffsetSquareRight from "./RawSvg/OffsetSquareRight";
import ClipmaskBG1 from "./RawSvg/ClipmaskBG1";
import WavyMobile from "./RawSvg/WavyMobile";
import Pumpkins from "./RawSvg/Pumpkins";

interface Props {
  id: string;
  style?: React.CSSProperties;
  elstyle: Style;
  variation: SVGVariation;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  cursor: "move" | "text";
  setCursor: (value: string | ((prevVar: string) => string)) => void;
  handleKeyDown: React.KeyboardEventHandler;
  myRef: any;
  setPos: (value: Pos | ((prevVar: Pos) => Pos)) => void;
  ref: any;
  isSelected: boolean;
  pos: Pos;
  setBounds: any;
  rect: any;
}

const RawSvg: React.FC<Props> = memo(
  React.forwardRef(({ ...props }, ref) => {
    const [svgStyle, setSvgStyle] = useState<{
      fill: string | undefined;
      opacity?: number;
    }>({
      fill: "#222222",
      opacity: 1,
    });

    useLayoutEffect(() => {
      if (props.elstyle) {
        setSvgStyle({
          fill: props.elstyle?.background?.value,
          opacity: props.elstyle?.opacity?.value,
        });
      }
    }, [props.elstyle]);
    const handleMouseOver: React.MouseEventHandler = () => {
      props.setCursor("move");
    };

    const handleMouseLeave: React.MouseEventHandler = () => {
      props.setCursor("pointer");
    };

    const renderShape = () => {
      switch (props.variation) {
        case "fullCircle":
          return <FullCircle svgStyle={svgStyle} />;
        case "rectangle":
          return <Rectangle svgStyle={svgStyle} />;
        case "squareFrame":
          return <SquareFrame svgStyle={svgStyle} />;
        case "circleFrameSmall":
          return <CircleFrameSmall svgStyle={svgStyle} />;
        case "circleFrameMedium":
          return <CircleFrameMedium svgStyle={svgStyle} />;
        case "circleFrameLarge":
          return <CircleFrameLarge svgStyle={svgStyle} />;
        case "rhombus":
          return <Rhombus svgStyle={svgStyle} />;
        case "stylishFrame":
          return <StylishFrame svgStyle={svgStyle} />;
        case "rightArrow":
          return <RightArrow svgStyle={svgStyle} />;
        case "offsetSquareRight":
          return <OffsetSquareRight svgStyle={svgStyle} />;
        case "clipmaskBG1":
          return <ClipmaskBG1 svgStyle={svgStyle} />;
        case "wavyMobile":
          return <WavyMobile svgStyle={svgStyle} />;
        case "pumpkins":
          return <Pumpkins svgStyle={svgStyle} />;
        default:
          return undefined;
      }
    };

    return (
      <SvgContainer
        {...props}
        data-testid="shape"
        aria-hidden={"true"}
        id={props.id}
        className="resizable"
        onKeyDown={props.handleKeyDown}
        tabIndex={-1}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        isSelected={props.isSelected}
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
        style={{
          ...(getShapeStyles(
            props.elstyle,
            false,
            props.style?.transform
          ) as React.CSSProperties),
        }}
        cursor={props.cursor}
      >
        {renderShape()}
        <ResizeHandles
          setPos={props.setPos}
          pos={props.pos}
          myRef={props.myRef}
          id={props.id}
          setBounds={props.setBounds}
          rect={props.rect}
        />
      </SvgContainer>
    );
  })
);

export default RawSvg;

const SvgContainer = styled.div<{ cursor: string; isSelected: boolean }>`
  cursor: ${(props) => (props.cursor === "move" ? "move" : "pointer")};

  &::before {
    content: "";
    position: absolute;
    border-radius: 0;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    border: 2px solid
      ${(props) => (props.isSelected ? "#4980f7" : "transparent")};
  }
`;
