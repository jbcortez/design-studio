import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import styled from "styled-components";
import { setCurrentComponent } from "../../redux/currentComponentSlice";
import { setSelected, setTargetStartPos } from "../../redux/dragSlice";
import { setActiveSidebarView } from "../../redux/sidebarViewSlice";
import useElements from "../../hooks/useElements";
import useGetCurrentCanvasId from "../../hooks/useGetCurrentCanvasId";
import useGetCurrentCanvas from "../../hooks/useGetCurrentCanvas";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import useGetSelectedItems from "../../hooks/useGetSelectedItems";
import Title from "./Title";
import BackgroundColor from "./BackgroundColor";
import useZoom from "../../hooks/useZoom";
import { Delta, Element, Rect, Style } from "../../types";
import useGuidelines from "../../hooks/useGuidelines";
import { elementMap } from "../../util/componentMaps";
import BackgroundImage from "./BackgroundImage";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import useSidebarView from "../../hooks/useSidebarView";
import useLoading from "../../hooks/useLoading";
import SkeletonComponent from "../General/SkeletonComponent";

interface Props {
  ref: React.ForwardedRef<HTMLDivElement>;
}

const Canvas: React.FC<Props> = React.forwardRef(({ ...props }, ref) => {
  const dispatch = useAppDispatch();
  const elements = useElements().present;
  const editingMode = useGetEditingMode();
  const selected = useGetSelectedItems();
  const zoom = useZoom();
  const currentComponent = useCurrentComponent();
  const sidebarView = useSidebarView();
  const loading = useLoading();

  // Passed to Styled Component to show/hide guidelines.
  const [showHorizontalGuideline, showVerticalGuideline] = useGuidelines();

  const canvasId = useGetCurrentCanvasId();

  const currentCanvas = useGetCurrentCanvas();
  const [delta, setDelta] = useState<Delta>({ x: 0, y: 0 });
  const [elStyle, setElStyle] = useState<Style>({} as Style);
  const [target, setTarget] = useState<{ x: 0; y: 0; id: null | string }>({
    x: 0,
    y: 0,
    id: null,
  });

  const targetStartPos = useAppSelector((state) => state.drag.targetStartPos);
  const [rect, setRect] = useState<Rect>({} as Rect);
  const [ctaElement, setCtaElement] = useState<Element>({} as Element);

  // Set delta of position of target
  useEffect(() => {
    if (target.id === targetStartPos.id && target.id !== null) {
      setDelta({
        x: target.x - targetStartPos.x,
        y: target.y - targetStartPos.y,
      });
    }
  }, [target, targetStartPos]);

  // Set Cta element in state
  useEffect(() => {
    let el: Element | undefined;

    if (canvasId && elements && elements.length > 0) {
      el = elements.find((el) => el.id === canvasId);
    }
    if (el) setCtaElement(el);
  }, [elements, canvasId]);

  // Passed to MasterElement to Draggable component onStart event. If not holding shift key, set targetStartPos to current position, and set target to current position.
  const startEvent = useCallback(
    (e, data) => {
      const { x, y, node } = data;
      const { id } = node;

      if (!e.shiftKey) {
        dispatch(setTargetStartPos({ pos: { x, y }, id }));

        setTarget({ x, y, id });
      }
    },
    [dispatch]
  );

  // CTAContainer onClick handler: Sets current component as CTA, sets sidebar view to BackgroundMenu, and clears selected array.
  const handleOnClick: React.MouseEventHandler = useCallback(() => {
    if (ctaElement !== null && currentComponent.type !== "canvas")
      dispatch(setCurrentComponent({ id: ctaElement.id, type: "canvas" }));

    if (sidebarView !== 5) dispatch(setActiveSidebarView({ id: 5 }));

    if (selected.length > 0) dispatch(setSelected({ selected: [] }));
  }, [dispatch, ctaElement, selected, sidebarView, currentComponent]);

  // To be passed to MasterElement as onClick. If shift key is pressed, and element is not already selected, add it to selected array. Otherwise, reset selected array and push selected element to array.
  const addSelected: React.MouseEventHandler<HTMLElement> = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      // Reset delta and return?
      if (delta.x !== 0 || delta.y !== 0) {
        setDelta({ x: 0, y: 0 });
        return;
      }

      if (e.shiftKey && !selected.some((elID) => elID === e.currentTarget.id)) {
        dispatch(
          setSelected({ selected: selected.concat(e.currentTarget.id) })
        );
      } else {
        dispatch(setSelected({ selected: [e.currentTarget.id] }));
      }
    },
    [dispatch, delta.x, delta.y, selected]
  );

  // To be passed to MasterElement as onMouseDown. If element being click is not already selected, and shift key is not pressed, select it by adding to selected array.
  const handleMouseDown: React.MouseEventHandler = useCallback(
    (e: React.MouseEvent) => {
      if (
        !selected.some((elID) => elID === e.currentTarget.id) &&
        !e.shiftKey
      ) {
        dispatch(setSelected({ selected: [e.currentTarget.id] }));
      }
    },
    [dispatch, selected]
  );

  // Set style of cta element to be passed as elStyle prop to CTAContainer
  useEffect(() => {
    if (ctaElement && Object.keys(ctaElement).length > 0 && editingMode) {
      switch (editingMode) {
        case "desktop":
          setElStyle((prev) => ({
            ...prev,
            ...(ctaElement.style.desktop as Style),
          }));
          break;

        case "mobile":
          setElStyle((prev) => ({
            ...prev,
            ...(ctaElement.style.mobile as Style),
          }));
          break;
        default:
          break;
      }
    }
  }, [ctaElement, editingMode]);

  // Set rect of cta element to be passed as rect prop to MasterElement. Used to set bounds of draggable component.
  useEffect(() => {
    if (
      typeof elStyle.width?.value === "number" &&
      typeof elStyle.height?.value === "number"
    )
      setRect({ width: elStyle.width.value, height: elStyle.height.value });
  }, [elStyle]);

  return (
    <Container zoom={zoom} data-testid="cta">
      <Title canvasId={canvasId} title={currentCanvas?.title || ""} />

      {!loading ? (
        <CTAContainer
          showHorizontalGuideline={showHorizontalGuideline}
          showVerticalGuideline={showVerticalGuideline}
          elStyle={elStyle}
          ref={ref}
          style={{ position: "relative", top: "0", left: "0" }}
          id={canvasId}
          onClick={handleOnClick}
        >
          <BackgroundColor color={elStyle.background?.value as string} />
          {(ctaElement?.backgroundImg?.desktop?.src ||
            ctaElement?.backgroundImg?.mobile?.src) && (
            <BackgroundImage
              img={ctaElement.backgroundImg}
              opacity={elStyle.opacity?.value as number}
              elStyle={elStyle}
              media={editingMode}
            />
          )}
          {elements &&
            elements.length > 0 &&
            elements
              .filter((el) => el.type !== "canvas")
              .map((el) =>
                elementMap(
                  el,
                  editingMode,
                  addSelected,
                  handleMouseDown,
                  selected,
                  setTarget,
                  startEvent,
                  targetStartPos,
                  delta,
                  rect,
                  ref,
                  setDelta,
                  el.variation,
                  el.title
                )
              )}
        </CTAContainer>
      ) : (
        <CTAContainer loading={loading} elStyle={elStyle}>
          {/*<LoadingSpinner />*/}
          <SkeletonComponent />
        </CTAContainer>
      )}
    </Container>
  );
});

export default Canvas;

const Container = styled.div.attrs<{ zoom: number }>((props) => ({
  style: {
    transform: `scale(${props.zoom})`,
  },
}))<{ zoom: number }>`
  margin-top: -30px;
  width: fit-content;
  height: fit-content;
`;

const CTAContainer = styled.div.attrs<{ elStyle: Style }>((props) => ({
  style: {
    height: props.elStyle?.height?.value || "40rem",
    width: props.elStyle?.width?.value || "98rem",
    boxShadow: props.elStyle?.boxShadow?.value || props.theme.shadow[2],
    opacity: "1",
  },
}))<{
  style?: React.CSSProperties;
  elStyle: Style;
  showVerticalGuideline?: boolean;
  showHorizontalGuideline?: boolean;
  loading?: boolean;
}>`
  border-radius: 0px;
  overflow: hidden;
  background: ${(props) =>
    props.loading ? "#FFFFFF" : props.elStyle.background?.value};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: red;
    transform: translate(0, -50%);
    display: ${(props) => (props.showHorizontalGuideline ? "auto" : "none")};
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 100;
    left: 50%;
    height: 100%;
    background: red;
    width: 2px;
    display: ${(props) => (props.showVerticalGuideline ? "auto" : "none")};
    transform: translate(-50%, 0);
  }
`;
