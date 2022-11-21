import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import { handleResize } from "../../util/functions";
import { resize } from "../../redux/elementSlice";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import useZoom from "../../hooks/useZoom";
import styled from "styled-components";

interface Props {
  myRef: React.RefObject<HTMLDivElement | HTMLButtonElement>;
  id: string;
  setPos: (
    value: (prevPos: { x: number; y: number }) => { x: number; y: number }
  ) => void;
  pos: any;
  setBounds: any;
  rect: any;
  setClientHeight?: React.Dispatch<React.SetStateAction<number>>;
  setDisabled?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  type?: "typography";
}

const ResizeHandles: React.FC<Props> = ({
  myRef,
  id,
  setPos,
  pos,
  setBounds,
  rect,
  setClientHeight,

  type,
}) => {
  const dispatch = useAppDispatch();
  const currentComponent = useCurrentComponent();
  const editingMode = useGetEditingMode();
  const scale = useZoom();
  const [showHandles, setShowHandles] = useState<boolean>(false);

  useEffect(() => {
    if (currentComponent.id === id) {
      setShowHandles(true);
    } else {
      setShowHandles(false);
    }
  }, [currentComponent, id]);

  const resizeCallback = useCallback(
    (e) => {
      if (setClientHeight) setClientHeight(0);

      handleResize(
        e,
        myRef,
        dispatch,
        resize,
        id,
        editingMode,
        setPos,
        scale,
        pos,
        setBounds,
        rect,
        type === "typography"
      );
    },
    [
      dispatch,
      resize,
      id,
      editingMode,
      setPos,
      pos,
      scale,
      myRef,
      setBounds,
      rect,
      type,
      setClientHeight,
    ]
  );

  return (
    <>
      {type !== "typography" && (
        <SEHandle
          showHandle={showHandles}
          onMouseDown={(e) => resizeCallback(e)}
          className="se"
          contentEditable="false"
        ></SEHandle>
      )}
      {type === "typography" && (
        <SideHandle
          showHandle={showHandles}
          onMouseDown={(e) => resizeCallback(e)}
          contentEditable="false"
          className={"side-handle"}
        ></SideHandle>
      )}
      {/*<NEHandle*/}
      {/*  showHandle={showHandles}*/}
      {/*  onMouseDown={rotateCallback}*/}
      {/*  onMouseUp={handleMouseUp}*/}
      {/*  className="ne"*/}
      {/*>*/}
      {/*  <IconContainer>*/}
      {/*    <ScreenRotationIcon style={{ color: "blue", fontSize: "20px" }} />*/}
      {/*  </IconContainer>*/}
      {/*</NEHandle>*/}
      {/*<SWHandle*/}
      {/*  showHandle={showHandles}*/}
      {/*  onMouseDown={(e) =>*/}
      {/*    handleResize(*/}
      {/*      e,*/}
      {/*      myRef,*/}
      {/*      dispatch,*/}
      {/*      resize,*/}
      {/*      id,*/}
      {/*      editingMode,*/}
      {/*      setPos,*/}
      {/*      scale,*/}
      {/*      pos*/}
      {/*    )*/}
      {/*  }*/}
      {/*  className="sw"*/}
      {/*  contentEditable="false"*/}
      {/*></SWHandle>*/}
      {/*<NWHandle*/}
      {/*  showHandle={showHandles}*/}
      {/*  onMouseDown={(e) =>*/}
      {/*    handleResize(*/}
      {/*      e,*/}
      {/*      myRef,*/}
      {/*      dispatch,*/}
      {/*      resize,*/}
      {/*      id,*/}
      {/*      editingMode,*/}
      {/*      setPos,*/}
      {/*      scale,*/}
      {/*      pos*/}
      {/*    )*/}
      {/*  }*/}
      {/*  className="nw"*/}
      {/*  contentEditable="false"*/}
      {/*></NWHandle>*/}
    </>
  );
};

export default ResizeHandles;

const SEHandle = styled.div<{ showHandle: boolean }>`
  display: ${(props) => (props.showHandle ? "inline-block" : "none")};
  position: absolute;
  height: 12px;
  width: 12px;
  border: 1px solid ${(props) => props.theme.color.gray500};
  border-radius: 3px;
  bottom: -5px;
  right: -5px;
  z-index: 99;
  cursor: nwse-resize;
  opacity: 1 !important;
  background: ${(props) => props.theme.color.settings.blue300};

  &:hover {
    background: ${(props) => props.theme.color.btnPrimaryHover};
  }
`;

const NEHandle = styled.div<{ showHandle: boolean }>`
  display: ${(props) => (props.showHandle ? "inline-block" : "none")};
  position: absolute;
  height: 12px;
  width: 12px;
  border: 1px solid ${(props) => props.theme.color.gray600};
  cursor: grab;
  top: -15px;
  right: 0px;
  z-index: 99;
  opacity: 1 !important;
`;

const SWHandle = styled.div<{ showHandle: boolean }>`
  display: ${(props) => (props.showHandle ? "inline-block" : "none")};
  position: absolute;
  height: 12px;
  width: 12px;
  border: 1px solid ${(props) => props.theme.color.gray600};
  border-radius: 50%;
  bottom: -5px;
  left: -5px;
  z-index: 99;
  cursor: nesw-resize;
  opacity: 1 !important;
  background: #ffffff;

  &:hover {
    background: ${(props) => props.theme.color.btnPrimaryHover};
  }
`;

const NWHandle = styled.div<{ showHandle: boolean }>`
  display: ${(props) => (props.showHandle ? "inline-block" : "none")};
  position: absolute;
  height: 12px;
  width: 12px;
  border: 1px solid ${(props) => props.theme.color.gray600};
  border-radius: 50%;
  top: -5px;
  left: -5px;
  z-index: 99;
  cursor: nwse-resize;
  opacity: 1 !important;
  background: #ffffff;

  &:hover {
    background: ${(props) => props.theme.color.btnPrimaryHover};
  }
`;

const SideHandle = styled.div<{ showHandle: boolean }>`
  display: ${(props) => (props.showHandle ? "inline-block" : "none")};
  position: absolute;
  height: 32px;
  width: 9px;
  border: 1px solid ${(props) => props.theme.color.gray500};
  border-radius: 5px;
  top: 50%;
  right: -4px;
  transform: translateY(-50%);
  z-index: 99;
  cursor: e-resize;
  opacity: 1 !important;
  background: ${(props) => props.theme.color.settings.blue300};

  &:hover {
    background: ${(props) => props.theme.color.btnPrimaryHover};
  }
`;
