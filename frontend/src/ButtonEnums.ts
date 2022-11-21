import { ButtonElement } from "./types";

// Button element enums to be used to create buttons in the design studio.

// Themed Buttons
export const ThemeBtn1: ButtonElement = {
  id: null,
  type: "button",
  content: "Click Me",
  style: {
    desktop: {
      top: { value: 268 },
      left: { value: 58.8 },
      fontSize: { value: 16, default: true },
      fontWeight: { value: "normal", default: true },
      paddingTop: { value: 12 },
      paddingBottom: { value: 12 },
      paddingRight: { value: 20 },
      paddingLeft: { value: 20 },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "center", default: true },
      borderWidth: {
        value: 1,
        default: true,
      },
      borderStyle: {
        value: "solid",
        default: true,
      },
      borderRadius: {
        value: 0,
        default: true,
      },
      lineHeight: { value: 1.2, default: true },
      width: { value: 142 },
      height: { value: 40 },
      zIndex: { value: 2 },
      opacity: { value: 1 },
      boxShadow: {
        value: "none",
        key: "none",
        default: true,
      },

      hover: {
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderWidth: {
          value: 1,
          default: true,
        },
        borderRadius: {
          value: 0,
          default: true,
        },
        boxShadow: {
          value: "none",
          key: "none",
          default: true,
        },
      },
    },

    mobile: {
      top: { value: 268 },
      left: { value: 58.8 },
      fontSize: { value: 16, default: true },
      fontWeight: { value: "normal", default: true },
      paddingTop: { value: 12 },
      paddingBottom: { value: 12 },
      paddingRight: { value: 20 },
      paddingLeft: { value: 20 },
      textDecoration: { value: "none", default: true },
      textAlign: { value: "center", default: true },
      borderWidth: {
        value: 1,
        default: true,
      },
      borderStyle: {
        value: "solid",
        default: true,
      },
      borderRadius: {
        value: 0,
        default: true,
      },
      lineHeight: { value: 1.2, default: true },
      width: { value: 142 },
      height: { value: 40 },
      zIndex: { value: 2 },
      opacity: { value: 1 },
      boxShadow: {
        value: "none",
        key: "none",
        default: true,
      },

      hover: {
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderWidth: {
          value: 1,
          default: true,
        },
        borderRadius: {
          value: 0,
          default: true,
        },
        boxShadow: {
          value: "none",
          key: "none",
          default: true,
        },
      },
    },
  },
  link: {
    url: "",
    options: "_blank",
  },
};

export const ThemeBtn2 = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      borderStyle: {
        value: "none",
        default: true,
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        borderStyle: {
          value: "solid",
          default: true,
        },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,
      borderStyle: {
        value: "none",
        default: true,
      },
      hover: {
        ...ThemeBtn1.style.mobile.hover,
        borderStyle: {
          value: "solid",
          default: true,
        },
      },
    },
  },
};

export const ThemeBtn3 = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      borderStyle: {
        value: "solid",
        default: true,
      },
      fontSize: { value: 13, default: true },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        borderStyle: {
          value: "solid",
          default: true,
        },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,
      borderStyle: {
        value: "solid",
        default: true,
      },
      fontSize: { value: 13, default: true },
      hover: {
        ...ThemeBtn1.style.mobile.hover,
        borderStyle: {
          value: "solid",
          default: true,
        },
      },
    },
  },
};

export const ThemeBtn4 = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      borderStyle: {
        value: "solid",
        default: true,
      },
      fontSize: { value: 13, default: true },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        borderStyle: {
          value: "solid",
          default: true,
        },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,
      borderStyle: {
        value: "solid",
        default: true,
      },
      fontSize: { value: 13, default: true },
      hover: {
        ...ThemeBtn1.style.mobile.hover,
        borderStyle: {
          value: "solid",
          default: true,
        },
      },
    },
  },
};

// ==================================
// Text & Icon Buttons

export const TextBtn1: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      background: {
        value: "#000000",
        default: true,
      },
      borderColor: {
        value: "#000000",
        default: true,
      },
      color: {
        value: "#ffffff",
        default: true,
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: {
          value: "#ffffff",
          default: true,
        },
        color: {
          value: "#000000",
          default: true,
        },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,
      background: {
        value: "#000000",
        default: true,
      },
      borderColor: {
        value: "#000000",
        default: true,
      },
      color: {
        value: "#ffffff",
        default: true,
      },
      hover: {
        ...ThemeBtn1.style.mobile.hover,
        background: {
          value: "#ffffff",
          default: true,
        },
        color: {
          value: "#000000",
          default: true,
        },
      },
    },
  },
};

export const TextBtn2: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      background: {
        value: "rgb(255, 255, 255)",
        default: true,
      },
      borderStyle: {
        value: "none",
        default: true,
      },
      color: {
        value: "#000000",
        default: true,
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        letterSpacing: { value: 1.6, default: true },
        textDecoration: { value: "underline", default: true },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,

      background: {
        value: "#FFFFFF",
        default: true,
      },
      borderStyle: {
        value: "none",
        default: true,
      },
      color: {
        value: "#000000",
        default: true,
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        letterSpacing: { value: 1.6, default: true },
        textDecoration: { value: "underline", default: true },
      },
    },
  },
};

export const TextBtn3: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      background: { value: "#214eb7", default: true },
      color: { value: "#FFFFFF", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      borderRadius: { value: 5, default: true },
      boxShadow: {
        value: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        default: true,
        key: "",
      },

      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#FFFFFF", default: true },
        color: { value: "#214eb7", default: true },
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        boxShadow: {
          value: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          default: true,
          key: "",
        },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,
      background: { value: "#214eb7", default: true },
      color: { value: "#FFFFFF", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      borderRadius: { value: 5, default: true },
      boxShadow: {
        value: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        default: true,
        key: "",
      },

      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#FFFFFF", default: true },
        color: { value: "#214eb7", default: true },
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        boxShadow: {
          value: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
          default: true,
          key: "",
        },
      },
    },
  },
};

export const TextBtn4: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      background: { value: "#ffffff", default: true },
      color: { value: "#214eb7", default: true },
      borderStyle: {
        value: "solid",
        default: true,
      },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 2, default: true },
      fontWeight: { value: "normal", default: true },
      borderColor: { value: "#214eb7", default: true },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#214eb7", default: true },
        color: { value: "#FFFFFF", default: true },
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        borderWidth: { value: 2, default: true },
        fontWeight: { value: "normal", default: true },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,
      background: { value: "#ffffff", default: true },
      color: { value: "#214eb7", default: true },
      borderStyle: {
        value: "solid",
        default: true,
      },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 2, default: true },
      borderColor: { value: "#214eb7", default: true },
      fontWeight: { value: "normal", default: true },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#214eb7", default: true },
        color: { value: "#FFFFFF", default: true },
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        borderWidth: { value: 2, default: true },
        fontWeight: { value: "normal", default: true },
      },
    },
  },
};

export const TextBtn5: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      backgroundImage: {
        value: "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
      },

      color: { value: "#ffffff", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 2, default: true },
      fontWeight: { value: "normal", default: true },
      borderColor: { value: "#214eb7", default: true },
      boxShadow: {
        value:
          "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#214eb7", default: true },
        color: { value: "#FFFFFF", default: true },
        backgroundImage: {
          value:
            "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
        },
        borderStyle: {
          value: "none",
          default: true,
        },
        boxShadow: {
          value:
            "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset",
          default: true,
          key: "custom",
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        borderWidth: { value: 2, default: true },
        fontWeight: { value: "normal", default: true },
        transform: { value: "scale(1.1)", default: true },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,

      color: { value: "#ffffff", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      backgroundImage: {
        value: "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
      },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 2, default: true },
      borderColor: { value: "#214eb7", default: true },
      fontWeight: { value: "normal", default: true },
      boxShadow: {
        value:
          "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#214eb7", default: true },
        color: { value: "#FFFFFF", default: true },
        borderStyle: {
          value: "none",
          default: true,
        },
        backgroundImage: {
          value:
            "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        borderWidth: { value: 2, default: true },
        fontWeight: { value: "normal", default: true },
        transform: { value: "translateY(-2px)", default: true },
        boxShadow: {
          value:
            "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset",
          default: true,
          key: "custom",
        },
      },
    },
  },
};

export const TextBtn6: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      backgroundImage: {
        value: "linear-gradient(-180deg, #FF7E31, #E62C03)",
      },

      color: { value: "#ffffff", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 2, default: true },
      fontWeight: { value: "normal", default: true },
      borderColor: { value: "#214eb7", default: true },
      boxShadow: {
        value: "rgba(0, 0, 0, 0.1) 0 2px 4px",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#214eb7", default: true },
        color: { value: "#FFFFFF", default: true },
        backgroundImage: {
          value: "linear-gradient(-180deg, #FF7E31, #E62C03)",
        },
        borderStyle: {
          value: "none",
          default: true,
        },
        boxShadow: {
          value: "rgba(253, 76, 0, 0.5) 0 3px 8px",
          default: true,
          key: "custom",
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        borderWidth: { value: 2, default: true },
        fontWeight: { value: "normal", default: true },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,

      color: { value: "#ffffff", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      backgroundImage: {
        value: "linear-gradient(-180deg, #FF7E31, #E62C03)",
      },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 2, default: true },
      borderColor: { value: "#214eb7", default: true },
      fontWeight: { value: "normal", default: true },
      boxShadow: {
        value: "rgba(0, 0, 0, 0.1) 0 2px 4px",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "#214eb7", default: true },
        color: { value: "#FFFFFF", default: true },
        borderStyle: {
          value: "none",
          default: true,
        },
        backgroundImage: {
          value: "linear-gradient(-180deg, #FF7E31, #E62C03)",
        },
        borderRadius: { value: 5, default: true },
        borderColor: { value: "#214eb7", default: true },
        borderWidth: { value: 2, default: true },
        fontWeight: { value: "normal", default: true },

        boxShadow: {
          value: "rgba(253, 76, 0, 0.5) 0 3px 8px",
          default: true,
          key: "custom",
        },
      },
    },
  },
};

export const TextBtn7: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      color: { value: "#111827", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      background: { value: "#ffffff", default: true },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 1, default: true },
      fontWeight: { value: "normal", default: true },
      borderColor: { value: "#ffffff", default: true },
      boxShadow: {
        value:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "rgb(249,250,251)", default: true },

        color: { value: "#111827", default: true },
        borderStyle: {
          value: "none",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderWidth: { value: 1, default: true },
        fontWeight: { value: "normal", default: true },
        borderColor: { value: "#ffffff", default: true },
        boxShadow: {
          value:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          default: true,
          key: "custom",
        },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,
      color: { value: "#111827", default: true },
      borderStyle: {
        value: "none",
        default: true,
      },
      background: { value: "#ffffff", default: true },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 1, default: true },
      fontWeight: { value: "normal", default: true },
      borderColor: { value: "#ffffff", default: true },
      boxShadow: {
        value:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.mobile.hover,
        background: { value: "rgb(249,250,251)", default: true },

        color: { value: "#111827", default: true },
        borderStyle: {
          value: "none",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderWidth: { value: 1, default: true },
        fontWeight: { value: "normal", default: true },
        borderColor: { value: "#ffffff", default: true },
        boxShadow: {
          value:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          default: true,
          key: "custom",
        },
      },
    },
  },
};

export const TextBtn8: ButtonElement = {
  ...ThemeBtn1,
  style: {
    desktop: {
      ...ThemeBtn1.style.desktop,
      color: { value: "#111827", default: true },
      borderStyle: {
        value: "solid",
        default: true,
      },
      background: { value: "#ffffff", default: true },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 1, default: true },
      fontWeight: { value: "normal", default: true },
      borderColor: { value: "rgb(209,213,219)", default: true },
      boxShadow: {
        value:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.desktop.hover,
        background: { value: "rgb(249,250,251)", default: true },

        color: { value: "#111827", default: true },
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderWidth: { value: 1, default: true },
        fontWeight: { value: "normal", default: true },
        borderColor: { value: "rgb(209,213,219)", default: true },
        boxShadow: {
          value:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          default: true,
          key: "custom",
        },
      },
    },

    mobile: {
      ...ThemeBtn1.style.mobile,

      color: { value: "#111827", default: true },
      borderStyle: {
        value: "solid",
        default: true,
      },
      background: { value: "#ffffff", default: true },
      borderRadius: { value: 5, default: true },
      borderWidth: { value: 1, default: true },
      fontWeight: { value: "normal", default: true },
      borderColor: { value: "rgb(209,213,219)", default: true },
      boxShadow: {
        value:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        default: true,
        key: "custom",
      },
      hover: {
        ...ThemeBtn1.style.mobile.hover,
        background: { value: "rgb(249,250,251)", default: true },

        color: { value: "#111827", default: true },
        borderStyle: {
          value: "solid",
          default: true,
        },
        borderRadius: { value: 5, default: true },
        borderWidth: { value: 1, default: true },
        fontWeight: { value: "normal", default: true },
        borderColor: { value: "rgb(209,213,219)", default: true },
        boxShadow: {
          value:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          default: true,
          key: "custom",
        },
      },
    },
  },
};
