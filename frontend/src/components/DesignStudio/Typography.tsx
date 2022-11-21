import React, { memo } from "react";
import { getStyles } from "../../util/functions";
import ResizeHandles from "./ResizeHandles";
import styled from "styled-components";
import { Link, Pos, Style } from "../../types";

interface Props {
  content: string;
  id: string;
  elstyle: Style;
  link?: Link;
  style?: React.CSSProperties;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  editable: React.RefObject<HTMLDivElement>;
  cursor: "text" | "move";
  handleKeyDown: React.KeyboardEventHandler;
  setPos: (value: Pos | ((prevVar: Pos) => Pos)) => void;
  pos: Pos;
  handleBlur: React.FocusEventHandler;
  handleDoubleClick: React.MouseEventHandler;
  myRef: any;
  ref: any;
  isSelected: boolean;
  setBounds: any;
  rect: any;
  setDisabled: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Typography: React.FC<Props> = memo(
  React.forwardRef(({ ...props }, ref) => {
    const handleKeyDown = (e) => {
      props.handleKeyDown(e);
    };

    return (
      <TypographyStyles
        data-testid="typography"
        {...props}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={ref as React.RefObject<HTMLDivElement>}
        cursor={props.cursor}
        isSelected={props.isSelected}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
        id={props.id}
        style={{
          ...(getStyles(
            props.elstyle,
            props.style?.transform,
            true
          ) as React.CSSProperties),
        }}
        className="resizable"
      >
        <Content
          onBlur={props.handleBlur}
          onDoubleClick={props.handleDoubleClick}
          ref={props.editable}
          // onKeyDown={handleClientHeight}
        >
          {props.content}
        </Content>

        <ResizeHandles
          type={"typography"}
          setPos={props.setPos}
          pos={props.pos}
          myRef={props.myRef}
          id={props.id}
          setBounds={props.setBounds}
          rect={props.rect}
          setDisabled={props.setDisabled}
        />
      </TypographyStyles>
    );
  })
);

export default Typography;

const TypographyStyles = styled.div<{
  cursor: string;
  isSelected: boolean;
}>`
  padding: 0;
  margin: 0;
  cursor: ${(props) => (props.cursor === "move" ? "move" : "text")};
  user-select: text;
  position: relative;
  outline: none;

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

const Content = styled.p`
  margin-bottom: 0;
`;
