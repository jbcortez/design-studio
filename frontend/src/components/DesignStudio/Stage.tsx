import React, { useCallback, useEffect, useRef, useState } from "react";
import CTA from "./Canvas";
import TopBar from "./TopBar";
import styled from "styled-components";
import useGetStatusAlert from "../../hooks/useGetStatusAlert";
import useGetCurrentCanvas from "../../hooks/useGetCurrentCanvas";
import useSidebarView from "../../hooks/useSidebarView";
import useShowSidebar from "../../hooks/useShowSidebar";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import useZoom from "../../hooks/useZoom";
import StatusAlert from "./StatusAlert";
import ManageDesigns from "./ManageDesigns";

const Stage: React.FC = () => {
  const currentViewId = useSidebarView();
  const status = useGetStatusAlert();
  const contentRef = useRef(null);
  const showSidebar = useShowSidebar();
  const editingMode = useGetEditingMode();
  const currentContent = useGetCurrentCanvas();

  // Stage rect.width & height. Used for automatically settings zoom value based on available space
  const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);
  const [windowInnerHeight, setWindowInnerHeight] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useZoom(contentWidth, contentHeight, windowInnerWidth, windowInnerHeight);

  // Set window width and height on load and when window is resized.
  const resizeEvent = useCallback(() => {
    if (showSidebar) {
      setWindowInnerWidth(window.innerWidth - 350);
    } else {
      setWindowInnerWidth(window.innerWidth);
    }
    setWindowInnerHeight(window.innerHeight);
  }, [showSidebar]);

  // Trigger resize event when showSidebar changes
  useEffect(() => {
    resizeEvent();
  }, [showSidebar, resizeEvent]);

  // Trigger resize event on window resize
  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  });

  // Set ctaHeight and ctaWidth based on currentContent
  useEffect(() => {
    if (currentContent) {
      switch (editingMode) {
        case "desktop":
          if (typeof currentContent.style.desktop.width?.value === "string") {
            setContentWidth(parseInt(currentContent.style.desktop.width.value));
          } else if (
            typeof currentContent.style.desktop.width?.value === "number"
          ) {
            setContentWidth(currentContent.style.desktop.width.value);
          }
          if (typeof currentContent.style.desktop.height?.value === "string") {
            setContentHeight(
              parseInt(currentContent.style.desktop.height.value)
            );
          } else if (
            typeof currentContent.style.desktop.height?.value === "number"
          ) {
            setContentHeight(currentContent.style.desktop.height.value);
          }
          break;

        case "mobile":
          if (typeof currentContent.style.mobile.width?.value === "string") {
            setContentWidth(parseInt(currentContent.style.mobile.width.value));
          } else if (
            typeof currentContent.style.mobile.width?.value === "number"
          ) {
            setContentWidth(currentContent.style.mobile.width.value);
          }
          if (typeof currentContent.style.mobile.height?.value === "string") {
            setContentHeight(
              parseInt(currentContent.style.mobile.height.value)
            );
          } else if (
            typeof currentContent.style.mobile.height?.value === "number"
          ) {
            setContentHeight(currentContent.style.mobile.height.value);
          }
          break;
        default:
          return;
      }
    }
  }, [currentContent, editingMode]);

  const renderView = () => {
    switch (currentViewId) {
      case 7:
        return <ManageDesigns />;
      default:
        return (
          <>
            <TopBar />
            {status.message && <StatusAlert />}
            <BackdropStyles data-testid="backdrop">
              {currentContent && currentContent.id && <CTA ref={contentRef} />}
            </BackdropStyles>
          </>
        );
    }
  };

  return (
    <StageStyles view={currentViewId} data-testid="stage">
      {renderView()}
    </StageStyles>
  );
};

export default Stage;

const StageStyles = styled.div<{ view: number }>`
  height: calc(100vh - 4.8rem);
  width: 100%;
  position: relative;
  z-index: 0;
  overflow: ${(props) => (props.view === 9 ? "auto" : "hidden")};
`;

const BackdropStyles = styled.div`
  background-color: ${({ theme }) => theme.color.backdrop};
  height: calc(100% - 4rem);
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
