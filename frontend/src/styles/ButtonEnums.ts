import { Style } from "../types";

// Button styles used to style menu buttons in the design studio.

export const TextIconBtnOne: Style = {
  zIndex: { value: 2 },
  top: { value: 100 },
  left: { value: 100 },
  color: {
    value: "#FFF",
    default: true,
  },
  background: {
    value: "#000",
    default: true,
  },
  width: { value: 142 },
  height: { value: 40 },
  borderWidth: {
    value: 1,
    default: true,
  },
  borderStyle: {
    value: "solid",
    default: true,
  },
  borderColor: {
    value: "#000",
    default: true,
  },
  fontSize: { value: 16, default: true },
  hover: {
    color: {
      value: "#000",
      default: true,
    },
    background: {
      value: "#FFF",
      default: true,
    },
  },
};

export const TextIconBtnTwo: Style = {
  ...TextIconBtnOne,

  color: {
    value: "#000",
    default: true,
  },
  background: {
    value: "#FFF",
    default: true,
  },

  borderStyle: {
    value: "none",
    default: true,
  },

  hover: {
    color: {
      value: "#000",
      default: true,
    },
    background: {
      value: "#FFF",
      default: true,
    },
    textDecoration: { value: "underline", default: true },
    letterSpacing: { value: 1.6, default: true },
  },
};

export const TextIconBtnThree: Style = {
  ...TextIconBtnOne,
  background: { value: "#214eb7", default: true },
  color: { value: "#FFFFFF", default: true },
  borderRadius: { value: 5, default: true },
  borderStyle: { value: "none", default: true },
  boxShadow: {
    value: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    default: true,
    key: "",
  },

  hover: {
    background: { value: "#FFFFFF", default: true },
    color: { value: "#214eb7", default: true },
    borderStyle: { value: "solid", default: true },
    borderColor: { value: "#214eb7", default: true },
    boxShadow: {
      value: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      default: true,
      key: "",
    },
  },
};

export const TextIconBtnFour: Style = {
  ...TextIconBtnOne,
  background: { value: "#ffffff", default: true },
  color: { value: "#214eb7", default: true },
  borderRadius: { value: 5, default: true },
  borderStyle: { value: "solid", default: true },
  borderWidth: { value: 2, default: true },
  borderColor: { value: "#214eb7", default: true },
  fontWeight: { value: "normal", default: true },

  hover: {
    background: { value: "#214eb7", default: true },
    color: { value: "#ffffff", default: true },
    borderRadius: { value: 5, default: true },
    borderStyle: { value: "solid", default: true },
    borderWidth: { value: 2, default: true },
    borderColor: { value: "#214eb7", default: true },
    fontWeight: { value: "normal", default: true },
  },
};

export const TextIconBtnFive: Style = {
  ...TextIconBtnOne,
  background: { value: "#ffffff", default: true },
  color: { value: "#ffffff", default: true },
  borderRadius: { value: 5, default: true },
  borderStyle: { value: "none", default: true },
  borderWidth: { value: 2, default: true },
  borderColor: { value: "#ffffff", default: true },
  fontWeight: { value: "normal", default: true },
  backgroundImage: {
    value: "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  },
  boxShadow: {
    value:
      "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset",
    default: true,
    key: "custom",
  },
  hover: {
    backgroundImage: {
      value: "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
    },
    boxShadow: {
      value:
        "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset",
      default: true,
      key: "custom",
    },
    color: { value: "#ffffff", default: true },
    borderRadius: { value: 5, default: true },
    borderStyle: { value: "none", default: true },
    borderWidth: { value: 2, default: true },
    borderColor: { value: "#ffffff", default: true },
    fontWeight: { value: "normal", default: true },
  },
};

export const TextIconBtnSix: Style = {
  ...TextIconBtnOne,
  background: { value: "#ffffff", default: true },
  color: { value: "#ffffff", default: true },
  borderRadius: { value: 5, default: true },
  borderStyle: { value: "none", default: true },
  borderWidth: { value: 2, default: true },
  borderColor: { value: "#ffffff", default: true },
  fontWeight: { value: "normal", default: true },
  backgroundImage: {
    value: "linear-gradient(-180deg, #FF7E31, #E62C03)",
  },
  boxShadow: {
    value: "rgba(0, 0, 0, 0.1) 0 2px 4px",
    default: true,
    key: "custom",
  },
  hover: {
    backgroundImage: {
      value: "linear-gradient(-180deg, #FF7E31, #E62C03)",
    },
    boxShadow: {
      value: "rgba(253, 76, 0, 0.5) 0 3px 8px",
      default: true,
      key: "custom",
    },
    color: { value: "#ffffff", default: true },
    borderRadius: { value: 5, default: true },
    borderStyle: { value: "none", default: true },
    borderWidth: { value: 2, default: true },
    borderColor: { value: "#ffffff", default: true },
    fontWeight: { value: "normal", default: true },
  },
};

export const TextIconBtnSeven: Style = {
  ...TextIconBtnOne,
  background: { value: "#ffffff", default: true },
  color: { value: "#111827", default: true },
  borderRadius: { value: 5, default: true },
  borderStyle: { value: "none", default: true },
  borderWidth: { value: 1, default: true },
  borderColor: { value: "#ffffff", default: true },
  fontWeight: { value: "normal", default: true },
  boxShadow: {
    value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    default: true,
    key: "custom",
  },
  hover: {
    background: { value: "rgb(249,250,251)", default: true },
    boxShadow: {
      value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      default: true,
      key: "custom",
    },
    color: { value: "#111827", default: true },
    borderRadius: { value: 5, default: true },
    borderStyle: { value: "none", default: true },
    borderWidth: { value: 1, default: true },
    borderColor: { value: "#ffffff", default: true },
    fontWeight: { value: "normal", default: true },
  },
};

export const TextIconBtnEight: Style = {
  ...TextIconBtnOne,
  background: { value: "#ffffff", default: true },
  color: { value: "#111827", default: true },
  borderRadius: { value: 5, default: true },
  borderStyle: { value: "solid", default: true },
  borderWidth: { value: 1, default: true },
  borderColor: { value: "rgb(209,213,219)", default: true },
  fontWeight: { value: "normal", default: true },
  boxShadow: {
    value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    default: true,
    key: "custom",
  },
  hover: {
    background: { value: "rgb(249,250,251)", default: true },
    boxShadow: {
      value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      default: true,
      key: "custom",
    },
    color: { value: "#111827", default: true },
    borderRadius: { value: 5, default: true },
    borderStyle: { value: "solid", default: true },
    borderWidth: { value: 1, default: true },
    borderColor: { value: "rgb(209,213,219)", default: true },
    fontWeight: { value: "normal", default: true },
  },
};
