import styled from "styled-components";
import { BackgroundImg, Bounds, Pos, Style } from "../../types";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import useZoom from "../../hooks/useZoom";
import useGetCurrentContentId from "../../hooks/useGetCurrentContentId";
import { useAppDispatch } from "../../redux/reduxHooks";
import { getImageStyles } from "../../util/functions";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import { setActiveSidebarView } from "../../redux/sidebarViewSlice";
import { setBackgroundImagePosition } from "../../redux/elementSlice";

interface Props {
  opacity: number | undefined;
  elStyle: Style;
  img: BackgroundImg;
  style?: React.CSSProperties;
  media: "desktop" | "mobile";
}

const BackgroundImage: React.FC<Props> = ({
  opacity,
  elStyle,
  img,
  style,
  media,
}) => {
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const [bounds, setBounds] = useState<Bounds>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const [verticalBounds, setVerticalBounds] = useState(0);
  const [horizontalBounds, setHorizontalBounds] = useState(0);
  const [heightProperty, setHeightProperty] = useState<null | string>(null);
  const [widthProperty, setWidthProperty] = useState<null | string>(null);

  const [image, setImage] = useState<{
    src: string;
    top: number;
    left: number;
  }>({ src: "", top: 0, left: 0 });
  const [imageDimensions, setImageDimensions] = useState<{
    height: number;
    width: number;
  } | null>(null);
  const zoom = useZoom();
  const nodeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const ctaId = useGetCurrentContentId();
  const dispatch = useAppDispatch();
  const currentComponent = useCurrentComponent();

  const stopEvent = (e, data) => {
    const { x, y } = data;
    dispatch(
      setBackgroundImagePosition({
        id: ctaId,
        pos: { x, y },
        undo: true,
        media,
      })
    );
  };

  const handleMouseDown = () => {
    if (currentComponent.type !== "cta") {
      dispatch(setActiveSidebarView({ id: 5 }));
    }
  };

  const handleDrag = (e, data) => {
    const { x, y } = data;
    setPos(() => ({ x, y }));
  };

  useLayoutEffect(() => {
    if (media === "desktop") {
      setImage(img.desktop);
    } else if (media === "mobile") {
      setImage(img.mobile);
    }
  }, [img, media]);

  useLayoutEffect(() => {
    if (media === "desktop") {
      if (verticalBounds > 0) {
        setBounds({
          left: 0,
          right: 0,
          top: -verticalBounds,
          bottom: 0,
        });
      } else {
        setBounds({ top: 0, left: 0, right: 0, bottom: 0 });
      }
    } else {
      if (horizontalBounds > 0) {
        setBounds({
          left: -horizontalBounds,
          right: 0,
          top: 0,
          bottom: 0,
        });
      } else {
        setBounds({ top: 0, left: 0, right: 0, bottom: 0 });
      }
    }
  }, [media, verticalBounds, horizontalBounds, image.src]);

  useLayoutEffect(() => {
    setPos({ y: image.top, x: image.left });
  }, [image]);

  useLayoutEffect(() => {
    let desktopRatio;
    let mobileRatio;
    if (typeof elStyle.width?.value === "number" && imageDimensions?.width) {
      desktopRatio = imageDimensions.width / elStyle.width.value;
    }

    if (typeof elStyle.height?.value === "number" && imageDimensions?.height) {
      mobileRatio = imageDimensions.height / elStyle.height.value;
    }

    if (imageDimensions) {
      if (typeof elStyle.height?.value === "number" && imageDimensions.height) {
        setVerticalBounds(
          imageDimensions.height / desktopRatio - elStyle.height.value
        );
      }

      if (typeof elStyle.width?.value === "number" && imageDimensions.width)
        setHorizontalBounds(
          imageDimensions.width / mobileRatio - elStyle.width.value
        );
    }
  }, [elStyle, imageDimensions]);

  useLayoutEffect(() => {
    if (imageDimensions) {
      if (imageDimensions.height && typeof elStyle.height?.value === "number") {
        if (imageDimensions.height <= elStyle.height.value) {
          setHeightProperty("100%");
        } else {
          setHeightProperty(null);
        }
      }

      if (imageDimensions.width && typeof elStyle.width?.value === "number") {
        if (imageDimensions.width <= elStyle.width.value) {
          setWidthProperty("100%");
        } else {
          setWidthProperty(null);
        }
      }
    }
  }, [elStyle, image.src, imageDimensions]);

  useEffect(() => {
    const img = new Image();
    img.src = image.src;

    img.onload = () => {
      setImageDimensions({ height: img.height, width: img.width });
    };
  }, [image.src]);

  return (
    <Draggable
      position={pos}
      onStop={stopEvent}
      onDrag={handleDrag}
      disabled={true}
      nodeRef={nodeRef}
      bounds={bounds}
      scale={zoom}
      onMouseDown={handleMouseDown}
    >
      <Container
        ref={nodeRef}
        style={{
          ...(getImageStyles(elStyle, style?.transform) as React.CSSProperties),
          height: "100%",
          width: "100%",
        }}
      >
        <BackgroundImageStyles
          draggable={false}
          ref={imageRef}
          opacity={opacity}
          elStyle={elStyle}
          src={image.src}
          media={media}
          heightProperty={heightProperty}
          widthProperty={widthProperty}
        />
      </Container>
    </Draggable>
  );
};

export default BackgroundImage;

const Container = styled.div``;

const BackgroundImageStyles = styled.img.attrs<{
  elStyle: Style;
  opacity: number | undefined;
  src: string;
  media: "desktop" | "mobile";
  heightProperty: null | string;
  widthProperty: null | string;
}>((props) => ({
  style: {
    width:
      (props.widthProperty
        ? props.widthProperty
        : props.media === "desktop" && props.elStyle.width?.value) + "px" ||
      "auto",
    opacity: typeof props.opacity === "number" ? props.opacity : 1,
  },
  src: props.src,
}))<{
  elStyle: Style;
  opacity: number | undefined;
  media: "desktop" | "mobile";
  heightProperty: null | string;
  widthProperty: null | string;
}>`
  z-index: 1;
  display: block;
  object-fit: cover;
  height: 100%;
`;
