import React from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import styled from "styled-components";
import { addElement } from "../../redux/elementSlice";
import {
  TextBtn1,
  TextBtn2,
  TextBtn3,
  TextBtn4,
  TextBtn5,
  TextBtn6,
  TextBtn7,
  TextBtn8,
} from "../../ButtonEnums";
import { v4 as uuidv4 } from "uuid";
import { Style } from "../../types";
import useElements from "../../hooks/useElements";

interface Props {
  style: Style;
  children?: React.ReactNode;
  type: number;
}

const TextIconButton: React.FC<Props> = ({ style, children, type }) => {
  const dispatch = useAppDispatch();
  const elements = useElements().present;

  const handleAddButton = () => {
    switch (type) {
      case 1:
        dispatch(
          addElement({
            selected: [
              {
                ...TextBtn1,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn1.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn1.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
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
                ...TextBtn2,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn2.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn2.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
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
                ...TextBtn3,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn3.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn3.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
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
                ...TextBtn4,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn4.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn4.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                },
              },
            ],
          })
        );
        break;
      case 5:
        dispatch(
          addElement({
            selected: [
              {
                ...TextBtn5,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn5.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn5.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                },
              },
            ],
          })
        );
        break;
      case 6:
        dispatch(
          addElement({
            selected: [
              {
                ...TextBtn6,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn6.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn6.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                },
              },
            ],
          })
        );
        break;
      case 7:
        dispatch(
          addElement({
            selected: [
              {
                ...TextBtn7,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn7.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn7.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                },
              },
            ],
          })
        );
        break;
      case 8:
        dispatch(
          addElement({
            selected: [
              {
                ...TextBtn8,
                id: uuidv4(),
                style: {
                  desktop: {
                    ...TextBtn8.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...TextBtn8.style.mobile,
                    zIndex: {
                      value: elements.length + 2,
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

  return (
    <ButtonStyles onClick={handleAddButton} btnStyle={style}>
      {children}
    </ButtonStyles>
  );
};

const ButtonStyles = styled.button<{ btnStyle: Style }>`
  height: ${({ btnStyle }) => btnStyle.height?.value}px;
  width: ${({ btnStyle }) => btnStyle.width?.value}px;
  color: ${({ btnStyle }) => btnStyle.color?.value};
  background: ${({ btnStyle }) => btnStyle.background?.value};
  background-image: ${(props) => props.btnStyle.backgroundImage?.value};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.btnStyle.borderRadius?.value}px;
  border-style: ${(props) => props.btnStyle.borderStyle?.value};
  border-color: ${(props) => props.btnStyle.borderColor?.value};
  border-width: ${(props) => props.btnStyle.borderWidth?.value}px;
  font-weight: ${(props) => props.btnStyle.fontWeight?.value};
  font-size: ${(props) => props.btnStyle.fontSize?.value}px;
  transition: ${({ btnStyle }) =>
    btnStyle.transition || "all 200ms ease-in-out"};
  cursor: pointer;
  user-select: none;
  position: relative;
  box-shadow: ${(props) => props.btnStyle.boxShadow?.value};

  &:hover {
    color: ${({ btnStyle }) => btnStyle.hover?.color?.value};
    background-image: ${(props) => props.btnStyle.backgroundImage?.value};
    background: ${({ btnStyle }) => btnStyle.hover?.background?.value};
    border-style: ${(props) => props.btnStyle.hover?.borderStyle?.value};
    border-color: ${(props) => props.btnStyle.hover?.borderColor?.value};
    border-width: ${(props) => props.btnStyle.hover?.borderWidth?.value}px;
    border-radius: ${(props) => props.btnStyle.hover?.borderRadius?.value}px;
    text-decoration: ${({ btnStyle }) => btnStyle.hover?.textDecoration?.value};
    letter-spacing: ${({ btnStyle }) => btnStyle.hover?.letterSpacing?.value}px;
    font-weight: ${(props) => props.btnStyle.hover?.fontWeight?.value};
    box-shadow: ${(props) => props.btnStyle.hover?.boxShadow?.value};
  }

  &::after {
    position: absolute;
    content: "";
    top: -4px;
    left: -4px;
    height: ${({ btnStyle }) => btnStyle.after?.height}px;
    width: ${({ btnStyle }) => btnStyle.after?.width}px;
    border-style: ${(props) => props.btnStyle.after?.borderStyle?.value};
    border-color: ${(props) => props.btnStyle.after?.borderColor?.value};
    border-width: ${(props) => props.btnStyle.after?.borderWidth?.value}px;
  }
`;

export default TextIconButton;
