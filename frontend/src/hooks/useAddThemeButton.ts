import { addElement } from "../redux/elementSlice";
import useGetTheme from "./useGetTheme";
import { v4 as uuidv4 } from "uuid";
import { ThemeBtn1, ThemeBtn2, ThemeBtn3, ThemeBtn4 } from "../ButtonEnums";
import { useAppDispatch } from "../redux/reduxHooks";
import { ensure } from "../util/functions";
import useElements from "./useElements";

const useAddThemeButton = () => {
  const theme = useGetTheme();
  const themeColors = theme.theme;
  const dispatch = useAppDispatch();
  const elements = useElements().present;

  return (id: number) => {
    switch (id) {
      case 1:
        dispatch(
          addElement({
            selected: [
              {
                ...ThemeBtn1,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...ThemeBtn1.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-5")?.value
                      ),
                      default: true,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-1")?.value
                      ),
                      default: true,
                    },
                    borderColor: {
                      default: true,
                      value: ensure(
                        themeColors.find((val) => val.id === "color-5")?.value
                      ),
                    },
                    hover: {
                      ...ThemeBtn1.style.desktop.hover,
                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-2")?.value
                        ),
                        default: true,
                      },
                      color: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-5")?.value
                        ),
                        default: true,
                      },
                    },
                  },

                  mobile: {
                    ...ThemeBtn1.style.mobile,
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-5")?.value
                      ),
                      default: true,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-1")?.value
                      ),
                      default: true,
                    },
                    borderColor: {
                      default: true,
                      value: ensure(
                        themeColors.find((val) => val.id === "color-5")?.value
                      ),
                    },
                    zIndex: {
                      value: elements.length + 2,
                    },
                    hover: {
                      ...ThemeBtn1.style.mobile.hover,
                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-2")?.value
                        ),
                        default: true,
                      },
                      color: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-5")?.value
                        ),
                        default: true,
                      },
                    },
                  },
                },
              },
            ],
          })
        );

        break;
      case 2:
        dispatch(
          addElement({
            selected: [
              {
                ...ThemeBtn2,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...ThemeBtn2.style.desktop,
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-2")?.value
                      ),
                      default: true,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-5")?.value
                      ),
                      default: true,
                    },
                    zIndex: {
                      value: elements.length + 2,
                    },

                    hover: {
                      ...ThemeBtn2.style.desktop.hover,

                      color: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-4")?.value
                        ),
                        default: true,
                      },
                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-2")?.value
                        ),
                        default: true,
                      },
                    },
                  },

                  mobile: {
                    ...ThemeBtn2.style.mobile,
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-2")?.value
                      ),
                      default: true,
                    },
                    zIndex: {
                      value: elements.length + 2,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-5")?.value
                      ),
                      default: true,
                    },
                    hover: {
                      ...ThemeBtn2.style.mobile.hover,
                      color: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-4")?.value
                        ),
                        default: true,
                      },
                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-2")?.value
                        ),
                        default: true,
                      },
                    },
                  },
                },
              },
            ],
          })
        );
        break;

      case 3:
        dispatch(
          addElement({
            selected: [
              {
                ...ThemeBtn3,

                id: uuidv4(),
                style: {
                  desktop: {
                    ...ThemeBtn3.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-2")?.value
                      ),
                      default: true,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-8")?.value
                      ),
                      default: true,
                    },
                    borderColor: {
                      default: true,
                      value: ensure(
                        themeColors.find((val) => val.id === "color-8")?.value
                      ),
                    },
                    hover: {
                      ...ThemeBtn3.style.desktop.hover,
                      borderColor: {
                        default: true,
                        value: ensure(
                          themeColors.find((val) => val.id === "color-8")?.value
                        ),
                      },
                      color: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-2")?.value
                        ),
                        default: true,
                      },
                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-8")?.value
                        ),
                        default: true,
                      },
                    },
                  },

                  mobile: {
                    ...ThemeBtn3.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
                    },
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-2")?.value
                      ),
                      default: true,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-8")?.value
                      ),
                      default: true,
                    },
                    borderColor: {
                      default: true,
                      value: ensure(
                        themeColors.find((val) => val.id === "color-8")?.value
                      ),
                    },
                    hover: {
                      ...ThemeBtn3.style.mobile.hover,
                      borderColor: {
                        default: true,
                        value: ensure(
                          themeColors.find((val) => val.id === "color-8")?.value
                        ),
                      },
                      color: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-2")?.value
                        ),
                        default: true,
                      },
                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-8")?.value
                        ),
                        default: true,
                      },
                    },
                  },
                },
              },
            ],
          })
        );
        break;
      case 4:
        dispatch(
          addElement({
            selected: [
              {
                ...ThemeBtn4,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...ThemeBtn4.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-8")?.value
                      ),
                      default: true,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-2")?.value
                      ),
                      default: true,
                    },

                    hover: {
                      ...ThemeBtn4.style.desktop.hover,

                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-7")?.value
                        ),
                        default: true,
                      },
                    },
                  },

                  mobile: {
                    ...ThemeBtn4.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
                    },
                    background: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-8")?.value
                      ),
                      default: true,
                    },
                    color: {
                      value: ensure(
                        themeColors.find((val) => val.id === "color-2")?.value
                      ),
                      default: true,
                    },

                    hover: {
                      ...ThemeBtn4.style.mobile.hover,
                      background: {
                        value: ensure(
                          themeColors.find((val) => val.id === "color-7")?.value
                        ),
                        default: true,
                      },
                    },
                  },
                },
              },
            ],
          })
        );
        break;
      default:
        return;
    }
  };
};

export default useAddThemeButton;
