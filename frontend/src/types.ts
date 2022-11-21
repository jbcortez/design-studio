export type Content = {
  id: string;
  title: string;
  elements: Elements;
  style: {
    desktop: Style;
    mobile: Style;
  };
  backgroundImg: {
    desktop: {
      src: string;
      top: number;
      left: number;
    };
    mobile: {
      src: string;
      top: number;
      left: number;
    };
  };
  createdAt: number;
  updatedAt: number;
};

export type ContentUpdate = {
  id: string;
  title?: string;
  elements?: Elements;
  style?: {
    desktop: Style;
    mobile: Style;
  };
  backgroundImg?: {
    desktop: {
      src: string;
      top: number;
      left: number;
    };
    mobile: {
      src: string;
      top: number;
      left: number;
    };
  };
  createdAt?: number;
  updatedAt?: number;
};

export interface CurrentComponent {
  id: string | null;
  type:
    | "image"
    | "typography"
    | "button"
    | "cta"
    | "svg"
    | "rawSvg"
    | "imageSvg"
    | "shape"
    | null;
}

export type ContentList = Content[];

export interface Style {
  fontFamily?: { value: string };
  objectFit?: { value: string };
  background?: {
    value: string;
    default: boolean;
  };
  backgroundImage?: {
    value: string;
  };
  display?: { value: string };
  position?: { value: string };
  top?: { value: number };
  left?: { value: number };
  lastTop?: { value: number };
  lastLeft?: { value: number };
  borderRadius?: { value: number; default: true };
  borderTopLeftRadius?: { value: number | undefined };
  borderTopRightRadius?: { value: number | undefined };
  borderBottomRightRadius?: { value: number | undefined };
  borderBottomLeftRadius?: { value: number | undefined };
  paddingTop?: { value: number };
  paddingLeft?: { value: number };
  paddingBottom?: { value: number };
  paddingRight?: { value: number };
  letterSpacing?: {
    value: number;
    default: boolean;
  };
  color?: {
    value: string;
    default: boolean;
  };

  fontSize?: {
    value: number;
    default: boolean;
  };
  fontStyle?: {
    value: string;
    default: boolean;
  };
  fontWeight?: {
    value: string;
    default: boolean;
  };
  textDecoration?: {
    value: string;
    default: boolean;
  };
  textTransform?: {
    value: string;
    default: boolean;
  };
  textAlign?: {
    value: string;
    default: boolean;
  };
  borderWidth?: {
    value: number;
    default: boolean;
  };
  borderStyle?: {
    value: string;
    default: boolean;
  };

  borderColor?: {
    value: string;
    default: boolean;
  };

  boxShadow?: {
    value: string;
    key: string;
    default: boolean;
  };

  lineHeight?: {
    value: number;
    default: boolean;
  };
  width?: { value: number | string };
  height?: { value: number | string };
  transform?: {
    value: string;
    default: boolean;
  };
  transition?: { value: string };
  zIndex?: { value: number };
  opacity?: { value: number };

  hover?: {
    background?: {
      value: string;
      default: boolean;
    };
    backgroundImage?: {
      value: string;
    };
    letterSpacing?: {
      value: number;
      default: boolean;
    };
    color?: {
      value: string;
      default: boolean;
    };

    fontSize?: {
      value: number;
      default: boolean;
    };
    fontStyle?: {
      value: string;
      default: boolean;
    };
    fontWeight?: {
      value: string;
      default: boolean;
    };
    textDecoration?: {
      value: string;
      default: boolean;
    };
    textTransform?: {
      value: string;
      default: boolean;
    };
    textAlign?: {
      value: string;
      default: boolean;
    };
    borderWidth?: {
      value: number;
      default: boolean;
    };
    borderStyle?: {
      value: string;
      default: boolean;
    };

    borderColor?: {
      value: string;
      default: boolean;
    };

    borderRadius?: {
      value: number;
      default: boolean;
    };

    boxShadow?: {
      value: string;
      key: string;
      default: boolean;
    };

    lineHeight?: {
      value: number;
      default: boolean;
    };
    transform?: {
      value: string;
      default: boolean;
    };
  };
  after?: {
    height?: { value: number };
    width?: { value: number };
    borderStyle?: {
      value: string;
    };
    borderWidth?: {
      value: number;
    };
    borderColor?: {
      value: string;
    };
  };
}

export interface Target {
  x: number;
  y: number;
  id: null | string;
}

export interface ResponsiveStyles {
  desktop: Style;
  mobile: Style;
}

export interface Element {
  id: string;
  type: "image" | "button" | "typography" | "cta" | "rawSvg" | "imageSvg";
  content?: string;
  title?: string;
  variation?: SVGVariation;
  style: {
    desktop: Style;

    mobile: Style;
  };
  src?: string;
  alt?: string;
  backgroundImg?: {
    desktop: { src: string; top: number; left: number };
    mobile: { src: string; top: number; left: number };
  };
  link?: {
    url: string;
    options: string;
  };
}

export interface ButtonElement {
  id: string | null;
  type: "button";
  content: string;
  style: {
    desktop: Style;

    mobile: Style;
  };
  link: {
    url: string;
    options: string;
  };
}

export interface TypographyElement {
  id: string;
  type: "typography";
  content: string;
  style: {
    desktop: Style;

    mobile: Style;
  };
}

export interface ShapeElement {
  id: string;
  type: "shape";
  style: {
    desktop: Style;
    mobile: Style;
  };
}

export interface ImageElement {
  id: string;
  type: "image";
  style: {
    desktop: Style;

    mobile: Style;
  };
  src: string;
  alt: string;
}

export interface SvgElement extends Omit<ImageElement, "type"> {
  type: "svg";
}

export interface TargetStartPos {
  x: number;
  y: number;
  id: string | null;
}

export interface Pos {
  x: number;
  y: number;
}

export interface Delta extends Pos {}

export type ElementIds = string[];

export type Template = Element[];

export type Elements = Element[];

export interface Rect {
  height: number;
  width: number;
}

export interface Bounds {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface Color {
  id: string;
  value: string;
}

export type Colors = Color[];

export interface Theme {
  theme: Colors;
  custom: Colors;
}

export type SVGVariation =
  | "fullCircle"
  | "rectangle"
  | "squareFrame"
  | "circleFrameSmall"
  | "circleFrameMedium"
  | "circleFrameLarge"
  | "rhombus"
  | "stylishFrame"
  | "rightArrow"
  | "offsetSquareRight"
  | "clipmaskBG1"
  | "wavyMobile"
  | "pumpkins"
  | null
  | undefined;

export type Fonts = { items: string[] };

export interface BackgroundImg {
  desktop: {
    top: number;
    left: number;
    src: string;
  };
  mobile: {
    top: number;
    left: number;
    src: string;
  };
}

export type EditingMode = "desktop" | "mobile";

export interface Link {
  url: string;
  options: string;
}

export interface SvgRawElement {
  id: string;
  type: "rawSvg";
  variation: SVGVariation;
  title: string;
  style: {
    desktop: Style;
    mobile: Style;
  };
}

export interface KeyVal {
  key: string;
  value: string;
}
