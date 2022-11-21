import React, { memo } from "react";
import ResizeHandles from "./ResizeHandles";
import styled from "styled-components";
import { getImageStyles } from "../../util/functions";
import { Pos, Style } from "../../types";

interface Props {
  src: string;
  id: string;
  style?: React.CSSProperties;
  elstyle: Style;
  alt: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  cursor: "move" | "text";
  setCursor: (value: string | ((prevVar: string) => string)) => void;
  handleKeyDown: React.KeyboardEventHandler;
  myRef: any;
  setPos: (value: Pos | ((prevVar: Pos) => Pos)) => void;
  ref: any;
  pos: Pos;
  isSelected: boolean;
  setBounds: any;
  rect: any;
}

const Image: React.FC<Props> = memo(
  React.forwardRef(({ ...props }, ref) => {
    const handleMouseOver: React.MouseEventHandler = () => {
      props.setCursor("move");
    };

    const handleMouseLeave: React.MouseEventHandler = () => {
      props.setCursor("pointer");
    };

    return (
      <ImageContainer
        {...props}
        data-testid="image"
        id={props.id}
        className="resizable"
        onKeyDown={props.handleKeyDown}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        isSelected={props.isSelected}
        tabIndex={-1}
        ref={ref as React.RefObject<HTMLDivElement>}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
        cursor={props.cursor}
        style={{
          ...(getImageStyles(
            props.elstyle,
            props.style?.transform
          ) as React.CSSProperties),
        }}
      >
        <ImageStyles
          draggable={false}
          src={props.src}
          alt={props.alt}
          style={{
            opacity: props.elstyle.opacity?.value,

            borderTopLeftRadius: props.elstyle.borderTopLeftRadius?.value + "%",
            borderTopRightRadius:
              props.elstyle.borderTopRightRadius?.value + "%",
            borderBottomLeftRadius:
              props.elstyle.borderBottomLeftRadius?.value + "%",
            borderBottomRightRadius:
              props.elstyle.borderBottomRightRadius?.value + "%",
          }}
        />

        <ResizeHandles
          setPos={props.setPos}
          pos={props.pos}
          myRef={props.myRef}
          id={props.id}
          setBounds={props.setBounds}
          rect={props.rect}
        />
      </ImageContainer>
    );
  })
);

export default Image;

const ImageContainer = styled.div<{ cursor: string; isSelected: boolean }>`
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

const ImageStyles = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
`;
