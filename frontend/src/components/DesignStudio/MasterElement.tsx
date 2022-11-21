import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { setActiveSidebarView } from "../../redux/sidebarViewSlice";
import { setCurrentComponent } from "../../redux/currentComponentSlice";
import {
  moveElementDown,
  moveElementLeft,
  moveElementRight,
  moveElementUp,
  removeElement,
  setContent,
  setPosition,
} from "../../redux/elementSlice";
import { handleBackspace, mergeRefs } from "../../util/functions";
import Draggable from "react-draggable";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import useSidebarView from "../../hooks/useSidebarView";
import useZoom from "../../hooks/useZoom";
import {
  Bounds,
  ElementIds,
  Link,
  Pos,
  Rect,
  Style,
  SVGVariation,
  TargetStartPos,
} from "../../types";
import useSetGuidelines from "../../hooks/useSetGuidelines";
import useSnapToCenter from "../../hooks/useSnapToCenter";
import Typography from "./Typography";
import Button from "./Button";
import Image from "./Image";
import Svg from "./Svg";

import useMultiDrag from "../../hooks/useMultiDrag";
import useCalculateGroupSize from "../../hooks/useCalculateGroupSize";
import useGuidelines from "../../hooks/useGuidelines";
import { showHorizCenter, showVertCenter } from "../../redux/guidelineSlice";
import useElements from "../../hooks/useElements";
import RawSvg from "./RawSvg";

interface Props {
  type: "typography" | "button" | "image" | "rawSvg" | "imageSvg" | null;
  content?: string;
  id: string;
  style: Style;
  onClick: React.MouseEventHandler<HTMLElement>;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  selected: ElementIds;
  setTarget: React.Dispatch<
    React.SetStateAction<{
      x: 0;
      y: 0;
      id: null | string;
    }>
  >;
  startEvent: (e: any, data: any) => void;
  targetStartPos: TargetStartPos;
  delta: Pos;
  rect: Rect;
  ctaRef: React.ForwardedRef<HTMLDivElement>;
  src?: string;
  alt?: string;
  variation: SVGVariation;
  setDelta: (value: Pos | ((prevVar: Pos) => Pos)) => void;
  link?: Link;
}

const MasterElement: React.FC<Props> = memo(
  ({
    type,
    ctaRef,
    id,
    onMouseDown,
    startEvent,
    content,
    selected,
    style,
    delta,
    targetStartPos,
    setTarget,
    rect,
    src,
    alt,
    onClick,
    variation,
    setDelta,
    link,
  }) => {
    const dispatch = useDispatch();
    const currentComponent = useCurrentComponent();

    const editingMode = useGetEditingMode();

    const [cursor, setCursor] = useState<"text" | "move">("move");
    const [disabled, setDisabled] = useState<boolean>(false);
    const [bounds, setBounds] = useState<Bounds>({} as Bounds);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [groupWidth, setGroupWidth] = useState<number>(0);
    const [groupHeight, setGroupHeight] = useState<number>(0);
    const [groupOffsetX, setGroupOffsetX] = useState<number>(0);
    const [groupOffsetY, setGroupOffsetY] = useState<number>(0);
    const [groupCenterX, setGroupCenterX] = useState<number | null>(null);
    const [groupCenterY, setGroupCenterY] = useState<number | null>(null);
    const [groupTop, groupRight, groupBottom, groupLeft] =
      useCalculateGroupSize();
    const [center, setCenter] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0,
    });

    const [elementWidth, setElementWidth] = useState<number>(0);
    const [elementHeight, setElementHeight] = useState<number>(0);

    // Used to track offset of element being dragged from left most element.
    const [elOffsetX, setElOffsetX] = useState<number | null>(null);
    const [elOffsetY, setElOffsetY] = useState<number | null>(null);

    const [centerOffsetX, centerOffsetY] = useSnapToCenter(
      center.x,
      center.y,
      elOffsetX,
      elOffsetY,
      groupCenterX,
      groupCenterY
    );
    const zoom = useZoom();
    const elements = useElements().present;

    const sidebarView = useSidebarView();
    const [pos, setPos] = useState<Pos>({ x: 0, y: 0 } as Pos);

    const myRef = useRef<HTMLDivElement | HTMLButtonElement>(null);
    const nodeRef = useRef(null);
    const editable = useRef<HTMLDivElement>(null);
    let callbackRef = useCallback(
      (element) => {
        mergeRefs([nodeRef, myRef], element);
      },
      [nodeRef, myRef]
    );

    useSetGuidelines(
      center,
      groupOffsetX,
      groupOffsetY,
      elOffsetX,
      elOffsetY,
      currentComponent,
      id
    );
    useMultiDrag(selected, id, targetStartPos, style, delta, setPos);
    const [showHorizGuideline, showVertGuideline] = useGuidelines();

    const handleMouseDown = useCallback(
      (e, data) => {
        e.stopPropagation();

        if (type === "typography" && sidebarView !== 3) {
          dispatch(setActiveSidebarView({ id: 3 }));
        } else if (type === "button" && sidebarView !== 6) {
          dispatch(setActiveSidebarView({ id: 6 }));
        } else if (type === "image" && sidebarView !== 2) {
          dispatch(setActiveSidebarView({ id: 2 }));
        } else if (type === "rawSvg" && sidebarView !== 8) {
          dispatch(setActiveSidebarView({ id: 8 }));
        }

        if (currentComponent.id !== id) {
          dispatch(setCurrentComponent({ id, type }));
        }

        // Set offset from left-most and top-most element
        if (selected.length > 1) {
          let minX = 9999;
          let minY = 9999;
          let leftMostElement;
          let topMostElement;
          let isCompleted = false;

          selected.forEach((elid, i) => {
            const element = elements.find((el) => el.id === elid);

            switch (editingMode) {
              case "desktop":
                if (
                  typeof element?.style.desktop.left?.value !== "undefined" &&
                  element.style.desktop.left.value < minX
                ) {
                  minX = element.style.desktop.left.value;
                  leftMostElement = element;
                }

                if (
                  typeof element?.style.desktop.top?.value !== "undefined" &&
                  element.style.desktop.top.value < minY
                ) {
                  minY = element.style.desktop.top.value;
                  topMostElement = element;
                }
                break;
              case "mobile":
                if (
                  typeof element?.style.mobile.left?.value !== "undefined" &&
                  element.style.mobile.left.value < minX
                ) {
                  minX = element.style.mobile.left.value;
                  leftMostElement = element;
                }

                if (
                  typeof element?.style.mobile.top?.value !== "undefined" &&
                  element.style.mobile.top.value < minY
                ) {
                  minY = element.style.mobile.top.value;
                  topMostElement = element;
                }
                break;
              default:
                break;
            }

            if (i === selected.length - 1) {
              isCompleted = true;
            }

            if (isCompleted) {
              if (leftMostElement.id !== id) {
                setElOffsetX(data.x - minX);
              } else {
                setElOffsetX(0);
              }

              if (topMostElement.id !== id) {
                setElOffsetY(data.y - minY);
              } else {
                setElOffsetY(0);
              }
            }
          });
        }

        onMouseDown(e);
        startEvent(e, data);
      },
      [
        currentComponent.id,
        onMouseDown,
        startEvent,
        dispatch,
        id,
        sidebarView,
        type,
        elements,
        selected,
        editingMode,
      ]
    );

    const handleDoubleClick = () => {
      if (editable.current) {
        editable.current.contentEditable = "true";

        setCursor("text");
        setDisabled(true);
      }
    };

    // Update text content in redux store on blur
    const handleBlur = useCallback(() => {
      if (editable.current) {
        editable.current.contentEditable = "false";
        setCursor("move");
        setDisabled(false);
        const textContent = editable.current.textContent;
        if (textContent !== content && textContent !== null) {
          dispatch(setContent({ undo: true, id, content: textContent }));
        }
      }
    }, [dispatch, editable, content, id]);

    // Calculate group width  and height
    useEffect(() => {
      if (
        selected.length > 1 &&
        typeof groupLeft === "number" &&
        typeof groupTop === "number" &&
        typeof groupRight === "number" &&
        typeof groupBottom === "number"
      ) {
        setGroupWidth(groupRight - groupLeft);
        setGroupHeight(groupBottom - groupTop);
      }
    }, [selected, groupLeft, groupTop, groupRight, groupBottom]);

    // Calculate offset of element center to group center
    useEffect(() => {
      if (selected.length > 1) {
        setGroupOffsetX(groupWidth / 2 - elementWidth / 2);
        setGroupOffsetY(groupHeight / 2 - elementHeight / 2);
      }
    }, [
      groupWidth,
      groupHeight,
      elementWidth,
      elementHeight,
      selected,
      currentComponent,
    ]);

    // Calculate group center position
    useEffect(() => {
      if (selected.length > 1) {
        setGroupCenterX(center.x + groupOffsetX);
        setGroupCenterY(center.y + groupOffsetY);
      }
    }, [center, groupOffsetX, groupOffsetY, selected]);

    // Set element width
    useEffect(() => {
      if (myRef.current) setElementWidth(myRef.current.offsetWidth);
    }, [myRef.current?.offsetWidth]);

    // Set element height
    useEffect(() => {
      if (myRef.current) setElementHeight(myRef.current.offsetHeight);
    }, [myRef.current?.offsetHeight]);

    // Set bounds
    useEffect(() => {
      if (typeof rect.height === "number" && typeof rect.width === "number")
        setBounds({
          top: 0 - elementHeight + 20,
          bottom: rect.height - 20,
          left: 0 - elementWidth + 20,
          right: rect.width - 20,
        });
    }, [setBounds, rect, elementHeight, elementWidth]);

    // If element is selected, give it a border.
    // Issue: This is interfering with our border styles.
    useEffect(() => {
      if (selected && selected.some((elID) => elID === id) && myRef.current) {
        setIsSelected(true);
      } else if (myRef.current) {
        setIsSelected(false);
      }
    }, [selected, id]);

    // Set starting position of element on render
    useLayoutEffect(() => {
      if (
        typeof style.left?.value !== "undefined" &&
        typeof style.top?.value !== "undefined"
      ) {
        setPos({ x: style.left.value, y: style.top.value });
      }
    }, [style]);

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
      useCallback(
        (e) => {
          console.log("key press", e.key);
          if (
            (editable.current && editable.current.contentEditable !== "true") ||
            type === "rawSvg" ||
            type === "image" ||
            type === "imageSvg"
          ) {
            handleBackspace(e, dispatch, selected);

            switch (e.key) {
              case "ArrowLeft":
                dispatch(moveElementLeft({ id: id, editingMode }));
                break;
              case "ArrowRight":
                dispatch(moveElementRight({ id: id, editingMode }));
                break;
              case "ArrowUp":
                dispatch(moveElementUp({ id: id, editingMode }));
                break;
              case "ArrowDown":
                dispatch(moveElementDown({ id: id, editingMode }));
                break;

              default:
                return;
            }
          } else {
            if (e.key === "Enter") {
              handleBlur();
            }
          }
        },
        [type, dispatch, selected, editingMode, handleBlur, id]
      );

    const handleDrag = (e, data) => {
      const { x, y } = data;

      if (elementWidth !== 0 && elementHeight !== 0) {
        setCenter({
          x: x + elementWidth / 2,
          y: y + elementHeight / 2,
        });
      }

      // This is used to set delta in parent component, which is used on stopEvent to set position of element.
      setTarget(() => ({
        x,
        y,
        id,
      }));
    };

    const stopEvent = useCallback(() => {
      if (delta.x !== 0 || delta.y !== 0) {
        dispatch(
          setPosition({
            delta: {
              x: Math.round(delta.x + centerOffsetX),
              y: Math.round(delta.y + centerOffsetY),
            },
            selected,
            editingMode,
            undo: true,
            stop: true,
          })
        );
        setDelta({ x: 0, y: 0 });
      }

      if (showHorizGuideline) {
        setTimeout(() => dispatch(showHorizCenter({ show: false })), 1000);
      }

      if (showVertGuideline) {
        setTimeout(() => dispatch(showVertCenter({ show: false })), 1000);
      }
    }, [
      dispatch,
      delta,
      selected,
      editingMode,
      centerOffsetX,
      centerOffsetY,
      showHorizGuideline,
      showVertGuideline,
      setDelta,
    ]);

    useEffect(() => {
      if (content?.length === 0 && currentComponent.id) {
        dispatch(removeElement({ selected: [currentComponent.id] }));
        dispatch(setCurrentComponent({ id: null, type: null }));
      }
    }, [content, dispatch, currentComponent]);

    const renderComponent = useCallback(
      (type) => {
        switch (type) {
          case "typography":
            return (
              <Typography
                id={id}
                content={content as string}
                onClick={onClick}
                elstyle={style}
                editable={editable}
                handleDoubleClick={handleDoubleClick}
                cursor={cursor}
                handleKeyDown={handleKeyDown}
                myRef={myRef}
                setPos={setPos}
                pos={pos}
                handleBlur={handleBlur}
                ref={callbackRef}
                isSelected={isSelected}
                setBounds={setBounds}
                rect={rect}
                setDisabled={setDisabled}
                link={link}
              />
            );

          case "button":
            return (
              <Button
                id={id}
                content={content as string}
                onClick={onClick}
                elstyle={style}
                editable={editable}
                handleDoubleClick={handleDoubleClick}
                cursor={cursor}
                handleKeyDown={handleKeyDown}
                myRef={myRef}
                pos={pos}
                setPos={setPos}
                handleBlur={handleBlur}
                ref={callbackRef}
                isSelected={isSelected}
                setBounds={setBounds}
                rect={rect}
              />
            );

          case "image":
            return (
              <Image
                id={id}
                onClick={onClick}
                src={src as string}
                alt={alt as string}
                elstyle={style}
                cursor={cursor}
                setCursor={setCursor}
                handleKeyDown={handleKeyDown}
                myRef={myRef}
                setPos={setPos}
                ref={callbackRef}
                pos={pos}
                isSelected={isSelected}
                setBounds={setBounds}
                rect={rect}
              />
            );
          case "imageSvg":
            return (
              <Svg
                id={id}
                onClick={onClick}
                src={src as string}
                alt={alt as string}
                elstyle={style}
                cursor={cursor}
                setCursor={setCursor}
                handleKeyDown={handleKeyDown}
                myRef={myRef}
                setPos={setPos}
                pos={pos}
                ref={callbackRef}
                isSelected={isSelected}
                setBounds={setBounds}
                rect={rect}
              />
            );
          case "rawSvg":
            return (
              <RawSvg
                id={id}
                onClick={onClick}
                variation={variation}
                elstyle={style}
                cursor={cursor}
                setCursor={setCursor}
                handleKeyDown={handleKeyDown}
                myRef={myRef}
                setPos={setPos}
                pos={pos}
                ref={callbackRef}
                isSelected={isSelected}
                setBounds={setBounds}
                rect={rect}
              />
            );

          default:
            break;
        }
      },
      [
        setPos,
        id,
        onClick,
        variation,
        style,
        cursor,
        setCursor,
        handleKeyDown,
        pos,
        isSelected,
        alt,
        callbackRef,
        content,
        handleBlur,
        link,
        rect,
        src,
      ]
    );

    return (
      <Draggable
        position={pos}
        onDrag={handleDrag}
        onStop={stopEvent}
        onStart={handleMouseDown}
        disabled={disabled}
        nodeRef={nodeRef}
        bounds={bounds}
        scale={zoom}
      >
        {renderComponent(type)}
      </Draggable>
    );
  }
);

export default MasterElement;
