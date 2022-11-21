import React, { memo } from "react";
import { getButtonStyles } from "../../util/functions";
import ResizeHandles from "./ResizeHandles";
import styled from "styled-components";
import { Style, Pos } from "../../types";

interface Props {
  content: string;
  id: string;
  style?: React.CSSProperties;
  elstyle: Style;
  onClick: React.MouseEventHandler<Element>;
  editable: React.RefObject<HTMLDivElement>;
  cursor: "text" | "move";
  handleKeyDown: React.KeyboardEventHandler;
  myRef: any;
  setPos: (value: Pos | ((prevVar: Pos) => Pos)) => void;
  handleBlur: React.FocusEventHandler;
  handleDoubleClick: React.MouseEventHandler;
  ref: any;
  pos: Pos;
  isSelected: boolean;
  setBounds: any;
  rect: any;
}

const Button: React.FC<Props> = memo(
  React.forwardRef(({ ...props }, ref) => {
    return (
      <ButtonStyles
        data-testid="button"
        {...props}
        hover={props.elstyle.hover}
        id={props.id}
        cursor={props.cursor}
        elstyle={props.elstyle}
        isSelected={props.isSelected}
        style={{
          ...getButtonStyles(props.elstyle, props.style?.transform),
        }}
        onKeyDown={props.handleKeyDown}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
        ref={ref as React.RefObject<HTMLButtonElement>}
        className="resizable"
      >
        <div
          onBlur={props.handleBlur}
          onDoubleClick={props.handleDoubleClick}
          ref={props.editable}
          suppressContentEditableWarning={true}
        >
          {props.content}
        </div>

        <ResizeHandles
          setPos={props.setPos}
          pos={props.pos}
          myRef={props.myRef}
          id={props.id}
          setBounds={props.setBounds}
          rect={props.rect}
        />
      </ButtonStyles>
    );
  })
);

export default Button;

const ButtonStyles = styled.button<{
  elstyle: Style;
  cursor: string;
  hover: Style["hover"];
  isSelected: boolean;
}>`
  position: absolute;
  background-image: ${(props) => props.elstyle.backgroundImage?.value};
  font-family: ${(props) => props.elstyle.fontFamily?.value};
  background: ${(props) => props.elstyle.background?.value};
  border-color: ${(props) => props.elstyle.borderColor?.value};
  border-radius: ${(props) => props.elstyle.borderRadius?.value}px;
  border-width: ${(props) => props.elstyle.borderWidth?.value}px;
  border-style: ${(props) => props.elstyle.borderStyle?.value};
  color: ${(props) => props.elstyle.color?.value};
  font-size: ${(props) => props.elstyle.fontSize?.value}px;
  font-weight: ${(props) => props.elstyle.fontWeight?.value};
  font-style: ${(props) => props.elstyle.fontStyle?.value};
  text-transform: ${(props) => props.elstyle.textTransform?.value};
  height: ${(props) =>
    typeof props.elstyle.height?.value !== "undefined"
      ? props.elstyle.height?.value + "px"
      : props.elstyle.height?.value};
  line-height: ${(props) => props.elstyle.lineHeight?.value};
  padding-top: ${(props) => props.elstyle.paddingTop?.value}px;
  padding-bottom: ${(props) => props.elstyle.paddingBottom?.value}px;
  padding-left: ${(props) => props.elstyle.paddingLeft?.value}px;
  padding-right: ${(props) => props.elstyle.paddingRight?.value}px;
  position: ${(props) => props.elstyle.position?.value};
  text-align: ${(props) => props.elstyle.textAlign?.value};
  text-decoration: ${(props) => props.elstyle.textDecoration?.value};
  width: ${(props) =>
    typeof props.elstyle.width?.value !== "undefined"
      ? `${props.elstyle.width?.value}px`
      : props.elstyle.width?.value};
  letter-spacing: ${(props) => props.elstyle.letterSpacing?.value}px;
  z-index: ${(props) => props.elstyle.zIndex?.value};
  cursor: ${(props) => (props.cursor === "move" ? "move" : "text")};
  user-select: none;
  box-shadow: ${(props) => props.elstyle?.boxShadow?.value};
  transition: background 200ms ease-in-out, color 200ms ease-in-out,
    border-color 200ms ease-in-out, box-shadow 200ms ease-in-out,
    border-radius 200ms ease-in-out, letter-spacing 200ms ease-in-out;

  &:hover {
    background: ${(props) => props.hover?.background?.value};
    color: ${(props) => props.hover?.color?.value};
    border-color: ${(props) => props.hover?.borderColor?.value};
    border-radius: ${(props) => props.hover?.borderRadius?.value}px;
    box-shadow: ${(props) => props.hover?.boxShadow?.value};
    text-decoration: ${(props) => props.hover?.textDecoration?.value};
    letter-spacing: ${(props) => props.hover?.letterSpacing?.value}px;
    border-width: ${(props) => props.hover?.borderWidth?.value}px;
    border-style: ${(props) => props.hover?.borderStyle?.value};
    background-image: ${(props) => props.elstyle.backgroundImage?.value};
    letter-spacing: ${(props) => props.hover?.letterSpacing?.value}px;
  }

  &::before {
    content: "";
    position: absolute;
    border-radius: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border: 2px solid
      ${(props) => (props.isSelected ? "#4980f7" : "transparent")};
  }
`;
