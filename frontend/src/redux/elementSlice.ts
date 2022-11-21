import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Content,
  EditingMode,
  Element,
  ElementIds,
  Pos,
  Template,
} from "../types";

const copyState = (state: Element[]): Element[] => {
  let copy: Element[] = [];

  for (let el of state) {
    copy.push(JSON.parse(JSON.stringify(el)));
  }
  return copy;
};

// Applies style to desktop/tablet/mobile. Not compatible with button elements.
const applyStyle = (
  el: Element,
  styleProp: string,
  styleValue: string | number
): void => {
  if (styleProp in el.style.desktop && styleProp in el.style.mobile) {
    el.style.desktop[styleProp].value = styleValue;

    el.style.mobile[styleProp].value = styleValue;
  } else {
    el.style.desktop[styleProp] = {};
    el.style.desktop[styleProp].value = styleValue;

    el.style.mobile[styleProp] = {};
    el.style.mobile[styleProp].value = styleValue;
  }
};

// Applies normal/hover styles based on userState parameter ('normal' || 'hover')
const applyButtonStyle = (
  el: Element,
  styleProp: string,
  styleValue: string | number,
  userState: string
): void => {
  if ("hover" in el.style.desktop && "hover" in el.style.mobile) {
    if (!el.style.desktop.hasOwnProperty(styleProp)) {
      el.style.desktop[styleProp] = {};

      el.style.mobile[styleProp] = {};

      if (el.style.desktop.hover && el.style.mobile.hover) {
        el.style.desktop.hover[styleProp] = {};

        el.style.mobile.hover[styleProp] = {};
      }

      el.style.desktop[styleProp].default = true;
    } else if (
      !el.style.desktop.hover?.hasOwnProperty(styleProp) &&
      el.style.desktop.hover &&
      el.style.mobile.hover
    ) {
      el.style.desktop.hover[styleProp] = {};

      el.style.mobile.hover[styleProp] = {};
    }

    if (userState === "normal") {
      // If default is true, hover style hasn't been changed directly, so we apply the style to both normal and hover states. This is to prevent the user having to set hover styles for every element.
      if (el.style.desktop[styleProp].default === true) {
        if (el.style.desktop.hover && el.style.mobile.hover) {
          el.style.desktop[styleProp].value = styleValue;
          el.style.desktop.hover[styleProp].value = styleValue;

          el.style.mobile[styleProp].value = styleValue;
          el.style.mobile.hover[styleProp].value = styleValue;
        }
      } else {
        if (el.style.desktop[styleProp]) {
          el.style.desktop[styleProp].value = styleValue;
        } else {
          el.style.desktop[styleProp] = {};
          el.style.desktop[styleProp].value = styleValue;
          el.style.desktop[styleProp].default = false;
        }

        if (el.style.mobile[styleProp]) {
          el.style.mobile[styleProp].value = styleValue;
        } else {
          el.style.mobile[styleProp] = {};
          el.style.mobile[styleProp].value = styleValue;
          el.style.mobile[styleProp].default = false;
        }
      }
    } else if (
      userState === "hover" &&
      el.style.desktop.hover &&
      el.style.mobile.hover
    ) {
      el.style.desktop[styleProp].default = false;
      el.style.desktop.hover[styleProp].value = styleValue;

      el.style.mobile.hover[styleProp].value = styleValue;
    }
  }
};

// Applies styles that are responsive. Not compatible with button elements.
const applyResponsiveStyle = (
  el: Element,
  styleProp: string,
  styleValue: string | number,
  editingMode: string
): void => {
  switch (editingMode) {
    case "desktop":
      if (styleProp in el.style.desktop) {
        el.style.desktop[styleProp].value = styleValue;
      } else {
        el.style.desktop[styleProp] = {};
        el.style.desktop[styleProp].value = styleValue;
      }
      break;

    case "mobile":
      if (styleProp in el.style.mobile) {
        el.style.mobile[styleProp].value = styleValue;
      } else {
        el.style.mobile[styleProp] = {};
        el.style.mobile[styleProp].value = styleValue;
      }
      break;
    default:
      break;
  }
};

const findElement = (
  state: ElementState,
  action: PayloadAction<{ id: string }>
): Element | undefined => {
  return state.list.present.find((el) => el.id === action.payload.id);
};

const handleHistory = (state: ElementState) => {
  if (state.list.present && state.list.present.length > 0) {
    const presentCopy = copyState(state.list.present);
    if (state.list.past.length <= 20) {
      state.list.past = [...state.list.past, presentCopy];
    } else {
      state.list.past = state.list.past.slice(1).concat([presentCopy]);
    }
  } else if (state.list.present && state.list.present.length === 0) {
    state.list.past = [...state.list.past, []];
  }
};

interface ElementState {
  list: {
    past: Element[][];
    present: Element[];
    future: Element[][];
  };
  editingMode: EditingMode;
}

const initialState: ElementState = {
  list: {
    past: [],
    present: [],
    future: [],
  },
  editingMode: "desktop",
};

export const elementSlice = createSlice({
  name: "elementSlice",
  initialState,
  reducers: {
    setEditingMode: (
      state,
      action: PayloadAction<{ editingMode: EditingMode }>
    ) => {
      const { editingMode } = action.payload;
      if (editingMode) {
        state.editingMode = editingMode;
      }
    },
    initFromContent: (state, action: PayloadAction<{ content: Content }>) => {
      const { content } = action.payload;
      const elements = content.elements;

      if (elements.length > 0) {
        state.list.present = elements;
      }
    },
    undo: (state) => {
      // If past is an empty array, do nothing
      if (state.list.past.length > 0) {
        const previous = state.list.past[state.list.past.length - 1];
        let newPast;
        if (state.list.past.length > 1) {
          newPast = state.list.past.slice(0, state.list.past.length - 1);
        } else {
          newPast = [];
        }
        state.list.past = newPast;

        // If present contains a list of elements, create a copy of present and add it to the beginning of future
        // If present is empty, do nothing
        if (state.list.present && state.list.present.length > 0) {
          const presentCopy = copyState(state.list.present);

          if (state.list.future.length >= 20) {
            state.list.future = [
              presentCopy,
              ...state.list.future.slice(0, 20),
            ];
          } else {
            state.list.future = [presentCopy, ...state.list.future];
          }
        }

        state.list.present = previous;
      }
    },
    redo: (state) => {
      // If future is empty, do nothing
      if (state.list.future.length > 0) {
        let next;
        if (state.list.future.length > 0) {
          next = state.list.future[0];
        }
        const newFuture = state.list.future.slice(1);

        handleHistory(state);

        state.list.present = next;
        state.list.future = newFuture;
      }
    },
    setImageSrc: (
      state,
      action: PayloadAction<{ id: string; undo: boolean; src: string }>
    ) => {
      const { undo, src } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el && "src" in el) {
        el.src = src;
      }
    },
    setImageAlt: (
      state,
      action: PayloadAction<{ undo: boolean; alt: string; id: string }>
    ) => {
      if (action.payload.undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el && "alt" in el) {
        el.alt = action.payload.alt;
      }
    },
    setTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { title } = action.payload;

      const el = findElement(state, action);

      if (el) {
        el.title = title;
      }
    },
    setButtonBackgroundColor: (
      state,
      action: PayloadAction<{
        color: string;
        buttonState: string;
        undo: boolean;
        id: string;
      }>
    ) => {
      const { buttonState, color, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyButtonStyle(el, "background", color, buttonState);
        applyButtonStyle(el, "backgroundImage", "none", buttonState);
      }
    },
    setBackgroundColor: (
      state,
      action: PayloadAction<{ id: string; undo: boolean; color: string }>
    ) => {
      const { undo, color } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyStyle(el, "background", color);
      }
    },

    setBackgroundImage: (
      state,
      action: PayloadAction<{
        id: string;
        src: string;
      }>
    ) => {
      const { src } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        el.backgroundImg = {
          desktop: {
            src,
            left: 0,
            top: 0,
          },
          mobile: {
            src,
            left: 0,
            top: 0,
          },
        };
      }
    },
    clearBackgroundImage: (state, action: PayloadAction<{ undo: boolean }>) => {
      const { undo } = action.payload;
      if (undo) {
        handleHistory(state);
      }
      const cta = state.list.present.find((el) => el.type === "cta");
      if (cta) {
        cta.backgroundImg = {
          desktop: {
            src: "",
            top: 0,
            left: 0,
          },
          mobile: {
            src: "",
            top: 0,
            left: 0,
          },
        };
      }
    },
    setContent: (
      state,
      action: PayloadAction<{ id: string; undo: boolean; content: string }>
    ) => {
      const { undo, content } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        el.content = content;
      }
    },
    setLink: (
      state,
      action: PayloadAction<{
        id: string;
        undo: boolean;
        link: { options: string; url: string };
      }>
    ) => {
      const { undo, link } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);
      if (el) {
        el.link = link;
      }
    },

    setPosition: (
      state,
      action: PayloadAction<{
        delta: Pos;
        selected: ElementIds;
        editingMode: string;
        undo: boolean;
        stop: boolean;
      }>
    ) => {
      const { delta, selected, editingMode, undo, stop } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      switch (editingMode) {
        case "desktop":
          if (stop) {
            selected.forEach((elID) => {
              const comp = state.list.present.find((el) => el.id === elID);

              if (
                typeof comp?.style?.desktop?.left?.value !== "undefined" &&
                typeof comp?.style?.desktop?.top?.value !== "undefined"
              ) {
                comp.style.desktop.left.value = Math.round(
                  comp.style.desktop.left.value + delta.x
                );
                comp.style.desktop.top.value = Math.round(
                  comp.style.desktop.top.value + delta.y
                );
              }
            });
          }

          break;

        case "mobile":
          if (stop) {
            selected.forEach((elID) => {
              const comp = state.list.present.find((el) => el.id === elID);

              if (
                typeof comp?.style?.mobile?.left?.value !== "undefined" &&
                typeof comp?.style?.mobile?.top?.value !== "undefined"
              ) {
                comp.style.mobile.left.value = Math.round(
                  comp.style.mobile.left.value + delta.x
                );
                comp.style.mobile.top.value = Math.round(
                  comp.style.mobile.top.value + delta.y
                );
              }
            });
          }

          break;
        default:
          return;
      }
    },

    moveElementUp: (
      state,
      action: PayloadAction<{ id: string; editingMode: string }>
    ) => {
      const { editingMode } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        switch (editingMode) {
          case "desktop":
            if (el.style.desktop.top?.value)
              el.style.desktop.top.value = el.style.desktop.top.value - 1;
            break;

          case "mobile":
            if (el.style.mobile.top?.value)
              el.style.mobile.top.value = el.style.mobile.top.value - 1;
            break;
          default:
            return;
        }
      }
    },
    moveElementDown: (
      state,
      action: PayloadAction<{ id: string; editingMode: string }>
    ) => {
      const { editingMode } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (
        typeof el?.style?.desktop?.top?.value !== "undefined" &&
        typeof el?.style?.mobile?.top?.value !== "undefined"
      ) {
        switch (editingMode) {
          case "desktop":
            el.style.desktop.top.value = el.style.desktop.top.value + 1;
            break;

          case "mobile":
            el.style.mobile.top.value = el.style.mobile.top.value + 1;
            break;
          default:
            return;
        }
      }
    },
    moveElementLeft: (
      state,
      action: PayloadAction<{ id: string; editingMode: string }>
    ) => {
      const { editingMode } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (
        typeof el?.style?.desktop?.left?.value !== "undefined" &&
        typeof el?.style?.mobile?.left?.value !== "undefined"
      ) {
        switch (editingMode) {
          case "desktop":
            el.style.desktop.left.value = el.style.desktop.left.value - 1;
            break;

          case "mobile":
            el.style.mobile.left.value = el.style.mobile.left.value - 1;
            break;
          default:
            return;
        }
      }
    },
    moveElementRight: (
      state,
      action: PayloadAction<{ id: string; editingMode: string }>
    ) => {
      const { editingMode } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);
      if (
        typeof el?.style?.desktop?.left?.value !== "undefined" &&
        typeof el?.style?.mobile?.left?.value !== "undefined"
      ) {
        switch (editingMode) {
          case "desktop":
            el.style.desktop.left.value = el.style.desktop.left.value + 1;
            break;

          case "mobile":
            el.style.mobile.left.value = el.style.mobile.left.value + 1;
            break;
          default:
            return;
        }
      }
    },
    setFontColor: (
      state,
      action: PayloadAction<{
        id: string;
        color: string;
        undo: boolean;
      }>
    ) => {
      const { color, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyStyle(el, "color", color);
      }
    },
    setButtonFontColor: (
      state,
      action: PayloadAction<{
        id: string;
        buttonState: string;
        color: string;
        undo: boolean;
      }>
    ) => {
      const { buttonState, color, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyButtonStyle(el, "color", color, buttonState);
      }
    },
    setFontSize: (
      state,
      action: PayloadAction<{
        id: string;
        editingMode: string;
        fontSize: number;
        undo: boolean;
        userState?: string;
      }>
    ) => {
      const { fontSize, editingMode, undo, userState } = action.payload;
      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        if (userState) {
          applyButtonStyle(el, "fontSize", fontSize, userState);
        } else {
          applyResponsiveStyle(el, "fontSize", fontSize, editingMode);
        }
      }
    },
    setFontStyle: (
      state,
      action: PayloadAction<{
        id: string;
        fontStyle: string;
        userState?: string;
      }>
    ) => {
      const { fontStyle, userState } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        if (userState) {
          applyButtonStyle(el, "fontStyle", fontStyle, userState);
        } else {
          applyStyle(el, "fontStyle", fontStyle);
        }
      }
    },
    setFontWeight: (
      state,
      action: PayloadAction<{
        id: string;
        editingMode: string;
        fontWeight: string;
        userState?: string;
      }>
    ) => {
      const { editingMode, fontWeight, userState } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        if (userState) {
          applyButtonStyle(el, "fontWeight", fontWeight, userState);
        } else {
          applyResponsiveStyle(el, "fontWeight", fontWeight, editingMode);
        }
      }
    },
    setTextDecoration: (
      state,
      action: PayloadAction<{
        id: string;
        textDecoration: string;
        userState?: string;
      }>
    ) => {
      const { textDecoration, userState } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        if (userState) {
          applyButtonStyle(el, "textDecoration", textDecoration, userState);
        } else {
          applyStyle(el, "textDecoration", textDecoration);
        }
      }
    },
    setFontUppercase: (
      state,
      action: PayloadAction<{
        id: string;
        textTransform: string;
        userState?: string;
      }>
    ) => {
      const { textTransform, userState } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        if (userState) {
          applyButtonStyle(el, "textTransform", textTransform, userState);
        } else {
          applyStyle(el, "textTransform", textTransform);
        }
      }
    },
    setTextAlign: (
      state,
      action: PayloadAction<{
        id: string;
        editingMode: string;
        textAlign: string;
      }>
    ) => {
      const { textAlign, editingMode } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        applyResponsiveStyle(el, "textAlign", textAlign, editingMode);
      }
    },

    setBorderStyle: (
      state,
      action: PayloadAction<{
        id: string;
        borderStyle: string;
        undo: boolean;
      }>
    ) => {
      const { borderStyle } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        applyStyle(el, "borderStyle", borderStyle);
      }
    },
    setButtonBorderStyle: (
      state,
      action: PayloadAction<{
        id: string;
        borderStyle: string;
        buttonState: string;
      }>
    ) => {
      const { borderStyle, buttonState } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        applyButtonStyle(el, "borderStyle", borderStyle, buttonState);
      }
    },

    setBorderColor: (
      state,
      action: PayloadAction<{
        id: string;
        undo: boolean;
        color: string;
      }>
    ) => {
      const { undo, color } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyStyle(el, "borderColor", color);
      }
    },
    setButtonBorderColor: (
      state,
      action: PayloadAction<{
        id: string;
        undo: boolean;
        buttonState: string;
        color: string;
      }>
    ) => {
      const { buttonState, color, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyButtonStyle(el, "borderColor", color, buttonState);
      }
    },
    setBorderWidth: (
      state,
      action: PayloadAction<{ id: string; undo: boolean; borderWidth: number }>
    ) => {
      const { undo, borderWidth } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyStyle(el, "borderWidth", borderWidth);
      }
    },
    setButtonBorderWidth: (
      state,
      action: PayloadAction<{
        borderWidth: number;
        buttonState: string;
        undo: boolean;
        id: string;
      }>
    ) => {
      const { borderWidth, buttonState, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyButtonStyle(el, "borderWidth", borderWidth, buttonState);
      }
    },
    setBorderRadius: (
      state,
      action: PayloadAction<{
        id: string;
        borderRadius: number;
        position?: string;
        undo: boolean;
      }>
    ) => {
      const { borderRadius, position, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        if (position) {
          switch (position) {
            case "topLeft":
              el.style.desktop.borderTopLeftRadius = { value: borderRadius };

              el.style.mobile.borderTopLeftRadius = { value: borderRadius };
              break;
            case "topRight":
              el.style.desktop.borderTopRightRadius = { value: borderRadius };

              el.style.mobile.borderTopRightRadius = { value: borderRadius };
              break;
            case "bottomRight":
              el.style.desktop.borderBottomRightRadius = {
                value: borderRadius,
              };

              el.style.mobile.borderBottomRightRadius = { value: borderRadius };
              break;
            case "bottomLeft":
              el.style.desktop.borderBottomLeftRadius = { value: borderRadius };

              el.style.mobile.borderBottomLeftRadius = { value: borderRadius };
              break;
            default:
              return;
          }
        } else {
          el.style.desktop.borderTopLeftRadius = { value: borderRadius };

          el.style.mobile.borderTopLeftRadius = { value: borderRadius };

          el.style.desktop.borderTopRightRadius = { value: borderRadius };

          el.style.mobile.borderTopRightRadius = { value: borderRadius };

          el.style.desktop.borderBottomRightRadius = { value: borderRadius };

          el.style.mobile.borderBottomRightRadius = { value: borderRadius };

          el.style.desktop.borderBottomLeftRadius = { value: borderRadius };

          el.style.mobile.borderBottomLeftRadius = { value: borderRadius };
        }
      }
    },
    setButtonBorderRadius: (
      state,
      action: PayloadAction<{
        id: string;
        buttonState: string;
        borderRadius: number;
        undo: boolean;
      }>
    ) => {
      const { buttonState, borderRadius } = action.payload;

      if (action.payload.undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyButtonStyle(el, "borderRadius", borderRadius, buttonState);
      }
    },
    setLineHeight: (
      state,
      action: PayloadAction<{
        id: string;
        lineHeight: number;
        editingMode: string;
        undo: boolean;
      }>
    ) => {
      const { lineHeight, editingMode } = action.payload;

      if (action.payload.undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyResponsiveStyle(el, "lineHeight", lineHeight, editingMode);
      }
    },
    setLetterSpacing: (
      state,
      action: PayloadAction<{
        id: string;
        value: number;
        editingMode: string;
        undo: boolean;
      }>
    ) => {
      const { value, editingMode } = action.payload;

      if (action.payload.undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyResponsiveStyle(el, "letterSpacing", value, editingMode);
      }
    },

    resize: (
      state,
      action: PayloadAction<{
        width: number;
        height: number;
        top: number;
        left: number;
        editingMode: string;
        undo: boolean;
        id: string;
      }>
    ) => {
      const { width, height, top, left, editingMode, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        switch (editingMode) {
          case "desktop":
            el.style.desktop.width = { value: width };
            el.style.desktop.height = { value: height };

            if (top) el.style.desktop.top = { value: top };
            if (left) el.style.desktop.left = { value: left };
            break;

          case "mobile":
            el.style.mobile.width = { value: width };
            el.style.mobile.height = { value: height };
            if (top !== null) el.style.mobile.top = { value: top };
            if (left !== null) el.style.mobile.left = { value: left };
            break;
          default:
            return;
        }
      }
    },
    setHeight: (
      state,
      action: PayloadAction<{
        height: number;
        editingMode: string;
        undo: boolean;
        id: string;
      }>
    ) => {
      const { height, editingMode, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        switch (editingMode) {
          case "desktop":
            el.style.desktop.height = { value: height };
            break;
          case "mobile":
            el.style.mobile.height = { value: height };
            break;
          default:
            return;
        }
      }
    },
    addElement: (state, action: PayloadAction<{ selected: Element[] }>) => {
      const { selected } = action.payload;

      handleHistory(state);

      state.list.present = [...state.list.present, ...selected];
    },
    removeElement: (state, action: PayloadAction<{ selected: string[] }>) => {
      const { selected } = action.payload;

      handleHistory(state);

      state.list.present = state.list.present.filter(
        (el) => !selected.some((id) => id === el.id)
      );
    },

    setTemplate: (
      state,
      action: PayloadAction<{
        template: Template;
        undo: boolean;
      }>
    ) => {
      const { template, undo } = action.payload;
      if (undo) {
        handleHistory(state);
      }

      const cta = state.list.present.find((el) => el.type === "cta");
      const tempCtaElement = template.find((el) => el.type === "cta");

      if (tempCtaElement) {
        const tempCtaStyle = tempCtaElement.style;
        const backgroundImg = tempCtaElement.backgroundImg;
        if (cta) {
          cta.style = tempCtaStyle;
          cta.backgroundImg = backgroundImg;
        }
      }

      const temp = template.filter((el) => el.type !== "cta");
      if (temp && cta) state.list.present = [...temp, cta];
    },

    setOpacity: (
      state,
      action: PayloadAction<{ id: string; opacity: number; undo: boolean }>
    ) => {
      const { opacity, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyStyle(el, "opacity", opacity);
      }
    },
    setFontFamily: (
      state,
      action: PayloadAction<{ id: string; font: string }>
    ) => {
      const { font } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el) {
        applyStyle(el, "fontFamily", font);
      }
    },
    setShadow: (
      state,
      action: PayloadAction<{
        id: string;
        buttonState: string;
        undo: boolean;
        shadow: string;
      }>
    ) => {
      const { buttonState, shadow, undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        applyButtonStyle(el, "boxShadow", shadow, buttonState);
      }
    },
    incrementZIndex: (
      state,
      action: PayloadAction<{
        id: string;
        undo: boolean;
      }>
    ) => {
      const { undo } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el?.style.desktop.zIndex?.value && el?.style.mobile.zIndex?.value) {
        if (el.style.desktop.zIndex.value <= state.list.present.length + 1)
          el.style.desktop.zIndex.value = el.style.desktop.zIndex.value + 1;

        if (el.style.mobile.zIndex.value <= state.list.present.length + 1)
          el.style.mobile.zIndex.value = el.style.mobile.zIndex.value + 1;
      }
    },
    decrementZIndex: (
      state,
      action: PayloadAction<{ id: string; undo: boolean }>
    ) => {
      const { undo } = action.payload;
      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (
        typeof el?.style.desktop.zIndex?.value !== "undefined" &&
        typeof el?.style.mobile.zIndex?.value !== "undefined"
      ) {
        if (el.style.desktop.zIndex.value >= 3) {
          el.style.desktop.zIndex.value = el.style.desktop.zIndex.value - 1;
        }

        if (el.style.mobile.zIndex.value >= 3) {
          el.style.mobile.zIndex.value = el.style.mobile.zIndex.value - 1;
        }
      }
    },
    // sets 'display' CSS property
    desktopDisplay: (
      state,
      action: PayloadAction<{ id: string; undo: boolean; display: string }>
    ) => {
      const { undo, display } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        if (el.style.desktop.display) {
          el.style.desktop.display.value = display;
        } else {
          el.style.desktop.display = { value: display };
        }
      }
    },
    mobileDisplay: (
      state,
      action: PayloadAction<{ id: string; undo: boolean; display: string }>
    ) => {
      const { undo, display } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el) {
        if (el.style.mobile.display) {
          el.style.mobile.display.value = display;
        } else {
          el.style.mobile.display = { value: display };
        }
      }
    },
    setTypographyLink: (
      state,
      action: PayloadAction<{ id: string; url: string; options: boolean }>
    ) => {
      const { url, options } = action.payload;

      handleHistory(state);

      const el = findElement(state, action);

      if (el?.link) {
        el.link.url = url;
        el.link.options = options ? "_blank" : "";
      } else if (el) {
        el.link = {
          url,
          options: options ? "_blank" : "",
        };
      }
    },
    setBackgroundImagePosition: (
      state,
      action: PayloadAction<{
        id: string;
        undo: boolean;
        pos: Pos;
        media: "desktop" | "mobile";
      }>
    ) => {
      const { undo, pos, media } = action.payload;

      if (undo) {
        handleHistory(state);
      }

      const el = findElement(state, action);

      if (el?.backgroundImg) {
        if (media === "desktop") {
          el.backgroundImg.desktop.top = pos.y;
          el.backgroundImg.desktop.left = pos.x;
        } else if (media === "mobile") {
          el.backgroundImg.mobile.top = pos.y;
          el.backgroundImg.mobile.left = pos.x;
        }
      }
    },
  },
});

export const {
  setEditingMode,
  initFromContent,
  undo,
  redo,
  setImageSrc,
  setImageAlt,
  setFontFamily,
  setTitle,
  setButtonBackgroundColor,
  setButtonFontColor,
  setButtonBorderStyle,
  setButtonBorderColor,
  setButtonBorderWidth,
  setButtonBorderRadius,
  setBackgroundColor,
  setBackgroundImage,
  clearBackgroundImage,
  setContent,
  setLink,
  setPosition,
  setFontColor,
  setFontSize,
  setFontUppercase,
  setFontStyle,
  setFontWeight,
  setTextDecoration,
  setTextAlign,
  setBorderStyle,
  setBorderColor,
  setBorderWidth,
  setBorderRadius,
  setLineHeight,
  setLetterSpacing,
  addElement,
  removeElement,
  resize,
  setHeight,
  setTemplate,
  incrementZIndex,
  decrementZIndex,
  moveElementUp,
  moveElementDown,
  moveElementLeft,
  moveElementRight,
  setOpacity,
  setShadow,
  desktopDisplay,
  mobileDisplay,
  setBackgroundImagePosition,
  setTypographyLink,
} = elementSlice.actions;

export default elementSlice.reducer;
