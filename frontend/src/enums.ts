import {
  Canvas,
  ImageElement,
  KeyVal,
  SvgRawElement,
  SVGVariation,
  TypographyElement,
} from "./types";
import Circle from "./assets/CircleFull.svg";
import Rectangle from "./assets/rectangle.svg";
import SquareFrame from "./assets/squareframe.svg";
import CircleFrameSmall from "./assets/CircleSmallOpen.svg";
import CircleFrameMedium from "./assets/CircleMediumOpen.svg";
import CircleFrameLarge from "./assets/CircleLargeOpen.svg";
import OffsetSquareRightSvg from "./assets/offset_square_right.svg";
import RhombusSvg from "./assets/rhombus.svg";
import StylishFrame from "./assets/StylishFrame.svg";
import RightArrow from "./assets/RightArrow.svg";
import ClipMaskBG1 from "./assets/SVG/SVG/curved-edge.svg";
import WavyMobile from "./assets/SVG/SVG/background-wavy-top.svg";

export const HEADING: TypographyElement = {
  id: "",
  type: "typography",
  content: "Heading",
  style: {
    desktop: {
      background: { value: "transparent", default: true },
      position: { value: "absolute" },
      top: { value: 50 },
      left: { value: 20 },
      color: { value: "#333333", default: true },
      lineHeight: { value: 1, default: true },
      fontSize: { value: 50, default: true },
      fontStyle: { value: "normal", default: true },
      fontWeight: { value: "bold", default: true },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "left", default: true },
      borderWidth: { value: 1, default: true },
      borderStyle: { value: "solid", default: true },
      borderColor: { value: "transparent", default: true },
      borderRadius: { value: 0, default: true },
      paddingLeft: { value: 0 },
      paddingRight: { value: 0 },
      paddingTop: { value: 0 },
      paddingBottom: { value: 0 },
      width: { value: 220 },
      height: { value: 70 },
      zIndex: { value: 2 },
    },
    mobile: {
      background: { value: "transparent", default: true },
      position: { value: "absolute" },
      top: { value: 50 },
      left: { value: 20 },
      color: { value: "#333333", default: true },
      lineHeight: { value: 1, default: true },
      fontSize: { value: 50, default: true },
      fontStyle: { value: "normal", default: true },
      fontWeight: { value: "bold", default: true },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "left", default: true },
      borderWidth: { value: 1, default: true },
      borderStyle: { value: "solid", default: true },
      borderColor: { value: "transparent", default: true },
      borderRadius: { value: 0, default: true },
      paddingLeft: { value: 0 },
      paddingRight: { value: 0 },
      paddingTop: { value: 0 },
      paddingBottom: { value: 0 },
      width: { value: 220 },
      height: { value: 70 },
      zIndex: { value: 2 },
    },
  },
};

export const SUBHEADING: TypographyElement = {
  id: "",
  type: "typography",
  content: "Subheader",
  style: {
    desktop: {
      background: { value: "transparent", default: true },
      position: { value: "absolute" },
      top: { value: 50 },
      left: { value: 20 },
      color: { value: "#333333", default: true },
      lineHeight: { value: 1, default: true },
      fontSize: { value: 50, default: true },
      fontStyle: { value: "normal", default: true },
      fontWeight: { value: "normal", default: true },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "left", default: true },
      borderWidth: { value: 1, default: true },
      borderStyle: { value: "solid", default: true },
      borderColor: { value: "transparent", default: true },
      borderRadius: { value: 0, default: true },
      paddingLeft: { value: 0 },
      paddingRight: { value: 0 },
      paddingTop: { value: 0 },
      paddingBottom: { value: 0 },
      width: { value: 270 },
      height: { value: 70 },
      zIndex: { value: 2 },
    },

    mobile: {
      background: { value: "transparent", default: true },
      position: { value: "absolute" },
      top: { value: 50 },
      left: { value: 20 },
      color: { value: "#333333", default: true },
      lineHeight: { value: 1, default: true },
      fontSize: { value: 24, default: true },
      fontStyle: { value: "normal", default: true },
      fontWeight: { value: "normal", default: true },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "left", default: true },
      borderWidth: { value: 1, default: true },
      borderStyle: { value: "solid", default: true },
      borderColor: { value: "transparent", default: true },
      borderRadius: { value: 0, default: true },
      paddingLeft: { value: 0 },
      paddingRight: { value: 0 },
      paddingTop: { value: 0 },
      paddingBottom: { value: 0 },
      width: { value: 270 },
      height: { value: 70 },
      zIndex: { value: 2 },
    },
  },
};
export const BODYTEXT: TypographyElement = {
  id: "",
  type: "typography",
  content: "Body text",
  style: {
    desktop: {
      background: { value: "transparent", default: true },
      position: { value: "absolute" },
      top: { value: 50 },
      left: { value: 20 },
      color: { value: "#333333", default: true },
      lineHeight: { value: 1, default: true },
      fontSize: { value: 16, default: true },
      fontStyle: { value: "normal", default: true },
      fontWeight: { value: "normal", default: true },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "left", default: true },
      borderWidth: { value: 1, default: true },
      borderStyle: { value: "solid", default: true },
      borderColor: { value: "transparent", default: true },
      borderRadius: { value: 0, default: true },
      paddingLeft: { value: 0 },
      paddingRight: { value: 0 },
      paddingTop: { value: 0 },
      paddingBottom: { value: 0 },
      width: { value: 100 },
      height: { value: 70 },
      zIndex: { value: 2 },
    },

    mobile: {
      background: { value: "transparent", default: true },
      position: { value: "absolute" },
      top: { value: 50 },
      left: { value: 20 },
      color: { value: "#333333", default: true },
      lineHeight: { value: 1, default: true },
      fontSize: { value: 16, default: true },
      fontStyle: { value: "normal", default: true },
      fontWeight: { value: "normal", default: true },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "left", default: true },
      borderWidth: { value: 1, default: true },
      borderStyle: { value: "solid", default: true },
      borderColor: { value: "transparent", default: true },
      borderRadius: { value: 0, default: true },
      paddingLeft: { value: 0 },
      paddingRight: { value: 0 },
      paddingTop: { value: 0 },
      paddingBottom: { value: 0 },
      width: { value: 100 },
      height: { value: 70 },
      zIndex: { value: 2 },
    },
  },
};

export const NEW_CANVAS: Canvas = {
  id: "",
  title: "Untitled",
  elements: [],
  style: {
    desktop: {
      background: { value: "#FFF", default: true },
      opacity: { value: 1 },
      height: { value: 490 },
      width: { value: 980 },
    },

    mobile: {
      background: { value: "#FFF", default: true },
      opacity: { value: 1 },
      height: { value: 500 },
      width: { value: 320 },
    },
  },
  backgroundImg: {
    desktop: { src: "", top: 0, left: 0 },
    mobile: {
      src: "",
      top: 0,
      left: 0,
    },
  },
  updatedAt: new Date().getTime(),
  createdAt: new Date().getTime(),
};

export const IMAGE: ImageElement = {
  id: "",
  type: "image",
  style: {
    desktop: {
      width: { value: 320 },
      height: { value: 180 },
      objectFit: { value: "cover" },
      position: { value: "absolute" },
      top: { value: 10 },
      left: { value: 10 },
      zIndex: { value: 2 },
      opacity: { value: 1 },
      borderRadius: { value: 0, default: true },
      borderTopLeftRadius: { value: 0 },
      borderBottomLeftRadius: { value: 0 },
      borderTopRightRadius: { value: 0 },
      borderBottomRightRadius: { value: 0 },
    },

    mobile: {
      width: { value: 160 },
      height: { value: 90 },
      objectFit: { value: "cover" },
      position: { value: "absolute" },
      top: { value: 10 },
      left: { value: 10 },
      zIndex: { value: 2 },
      opacity: { value: 1 },
      borderRadius: { value: 0, default: true },
      borderTopLeftRadius: { value: 0 },
      borderBottomLeftRadius: { value: 0 },
      borderTopRightRadius: { value: 0 },
      borderBottomRightRadius: { value: 0 },
    },
  },
  src: "",
  alt: "",
};

export const SHAPE: SvgRawElement = {
  id: "",
  type: "rawSvg",
  variation: null,
  title: "",
  style: {
    desktop: {
      width: { value: 200 },
      height: { value: 150 },
      position: { value: "absolute" },
      top: { value: 10 },
      left: { value: 10 },
      zIndex: { value: 2 },
      opacity: { value: 1 },
      borderTopLeftRadius: { value: 0 },
      borderBottomLeftRadius: { value: 0 },
      borderTopRightRadius: { value: 0 },
      borderBottomRightRadius: { value: 0 },
      background: { value: "#000d30", default: true },
    },

    mobile: {
      width: { value: 200 },
      height: { value: 150 },
      position: { value: "absolute" },
      top: { value: 10 },
      left: { value: 10 },
      zIndex: { value: 2 },
      opacity: { value: 1 },
      borderTopLeftRadius: { value: 0 },
      borderBottomLeftRadius: { value: 0 },
      borderTopRightRadius: { value: 0 },
      borderBottomRightRadius: { value: 0 },
      background: { value: "#000d30", default: true },
    },
  },
};

// BOX SHADOW ========
const shadowOne: KeyVal = {
  key: "Tailwind 1",
  value: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
};
const shadowTwo: KeyVal = {
  key: "Tailwind 2",
  value:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
};
const shadowThree: KeyVal = {
  key: "Tailwind 3",
  value:
    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
};
const shadowFour: KeyVal = {
  key: "Tailwind 4",
  value:
    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
};
const shadowFive: KeyVal = {
  key: "Tailwind 5",
  value:
    "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
};
const shadowSix: KeyVal = {
  key: "Tailwind 6",
  value: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
};
const shadowInner: KeyVal = {
  key: "Tailwind inset",
  value: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
};
const shadowSeven: KeyVal = {
  key: "Material 1",
  value: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
};
const shadowEight: KeyVal = {
  key: "Material 2",
  value: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
};
const shadowNine: KeyVal = {
  key: "Material 3",
  value: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
};
const shadowTen: KeyVal = {
  key: "Material 4",
  value: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
};
const shadowEleven: KeyVal = {
  key: "Material 5",
  value: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
};
const none: KeyVal = {
  key: "None",
  value: "none",
};

export const shadows: KeyVal[] = [
  none,
  shadowOne,
  shadowTwo,
  shadowThree,
  shadowFour,
  shadowFive,
  shadowSix,
  shadowInner,
  shadowSeven,
  shadowEight,
  shadowNine,
  shadowTen,
  shadowEleven,
];

export const SVGVariants: {
  variant: SVGVariation;
  premium: boolean;
  svg: string;
  alt: string;
}[] = [
  { variant: "fullCircle", premium: false, svg: Circle, alt: "circle" },
  { variant: "rectangle", premium: false, svg: Rectangle, alt: "rectangle" },
  {
    variant: "squareFrame",
    premium: true,
    svg: SquareFrame,
    alt: "square frame",
  },
  {
    variant: "circleFrameSmall",
    premium: true,
    svg: CircleFrameSmall,
    alt: "small circle frame",
  },
  {
    variant: "circleFrameMedium",
    premium: true,
    svg: CircleFrameMedium,
    alt: "medium circle frame",
  },
  {
    variant: "circleFrameLarge",
    premium: true,
    svg: CircleFrameLarge,
    alt: "large circle frame",
  },
  { variant: "rhombus", premium: true, svg: RhombusSvg, alt: "rhombus" },
  {
    variant: "stylishFrame",
    premium: true,
    svg: StylishFrame,
    alt: "stylish frame",
  },
  { variant: "rightArrow", premium: true, svg: RightArrow, alt: "right arrow" },
  {
    variant: "offsetSquareRight",
    premium: true,
    svg: OffsetSquareRightSvg,
    alt: "square with side sloped to right",
  },
  {
    variant: "clipmaskBG1",
    premium: true,
    svg: ClipMaskBG1,
    alt: "clipmaskBG1",
  },
  {
    variant: "wavyMobile",
    premium: true,
    svg: WavyMobile,
    alt: "wavy rectangle",
  },
];
