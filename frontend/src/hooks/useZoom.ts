import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";
import { useEffect } from "react";
import { setZoom } from "../redux/themeSlice";
import useShowSidebar from "./useShowSidebar";
import useSidebarView from "./useSidebarView";

const useZoom = (
  ctaWidth?: number,
  ctaHeight?: number,
  windowInnerWidth?: number,
  windowInnerHeight?: number
) => {
  const dispatch = useAppDispatch();
  const showSidebar = useShowSidebar();
  const sidebarView = useSidebarView();

  // Automatically set zoom value based on stage width/height.

  useEffect(() => {
    if (ctaWidth && ctaHeight) {
      // Set zoom value of canvas based on window width
      if (
        windowInnerWidth &&
        windowInnerHeight &&
        (windowInnerWidth - 120 < ctaWidth ||
          windowInnerHeight - 170 < ctaHeight)
      ) {
        let widthZoom: number;
        let heightZoom: number = (windowInnerHeight - 170) / ctaHeight;

        if (!showSidebar) {
          widthZoom = (windowInnerWidth - 120) / ctaWidth;
          if (widthZoom < heightZoom) {
            dispatch(
              setZoom({
                zoom: widthZoom,
              })
            );
          } else {
            dispatch(setZoom({ zoom: heightZoom }));
          }
        } else {
          widthZoom = (windowInnerWidth - 50) / ctaWidth;
          if (widthZoom < heightZoom) {
            if (sidebarView !== 4) {
              dispatch(
                setZoom({
                  zoom: (windowInnerWidth - 50) / ctaWidth,
                })
              );
            } else {
              dispatch(
                setZoom({
                  zoom: (windowInnerWidth - 100) / ctaWidth,
                })
              );
            }
          } else {
            dispatch(setZoom({ zoom: heightZoom }));
          }
        }
      } else {
        dispatch(setZoom({ zoom: 1 }));
      }
    }
  }, [
    windowInnerWidth,
    dispatch,
    windowInnerHeight,
    showSidebar,
    ctaHeight,
    ctaWidth,
    sidebarView,
  ]);

  return useAppSelector((state) => state.theme.zoom);
};

export default useZoom;
