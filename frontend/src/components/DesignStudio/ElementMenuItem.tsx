import React from "react";
import styled from "styled-components";
import { addElement } from "../../redux/elementSlice";
import { SHAPE } from "../../enums";
import { useAppDispatch } from "../../redux/reduxHooks";
import useElements from "../../hooks/useElements";
import { SVGVariation } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  svg: string;
  alt: string;
  variant: SVGVariation;
}

const ElementMenuItem: React.FC<Props> = ({ svg, alt, variant }) => {
  const dispatch = useAppDispatch();
  const elements = useElements().present;

  const handleAddElement = (elementType: SVGVariation) => {
    switch (elementType) {
      case "rectangle":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "rectangle",
                title: "Rectangle graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "fullCircle":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "fullCircle",
                title: "Circle graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "squareFrame":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "squareFrame",
                title: "Square frame graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "circleFrameSmall":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "circleFrameSmall",
                title: "Small circle frame graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "circleFrameMedium":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "circleFrameMedium",
                title: "Medium circle frame graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "circleFrameLarge":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "circleFrameLarge",
                title: "Large circle frame graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "rhombus":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "rhombus",
                title: "Rhombus frame graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "stylishFrame":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "stylishFrame",
                title: "Stylish frame graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "rightArrow":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "rightArrow",
                title: "Right arrow graphic",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "offsetSquareRight":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "offsetSquareRight",
                title:
                  "Square with right side at an angle from top to lower right corner",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "clipmaskBG1":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "clipmaskBG1",
                title: "Square with angled, textured left side",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "wavyMobile":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "wavyMobile",
                title: "Wavy background",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
      case "pumpkins":
        dispatch(
          addElement({
            selected: [
              {
                ...SHAPE,
                id: uuidv4(),
                variation: "pumpkins",
                title: "Pumpkins",
                style: {
                  desktop: {
                    ...SHAPE.style.desktop,
                    zIndex: {
                      value: elements.length + 2,
                    },
                  },
                  mobile: {
                    ...SHAPE.style.mobile,
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
        break;
    }
  };

  return (
    <Container onClick={() => handleAddElement(variant)}>
      <Icon src={svg} alt={alt} aria-label={alt} title={alt} />
    </Container>
  );
};

export default ElementMenuItem;

const Container = styled.button`
  cursor: pointer;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  transition: all 0.1s ease-in-out;
  position: relative;
  background: #fff;
  border: none;

  &:hover {
    background: ${(props) => props.theme.color.gray100};
  }
`;

const Icon = styled.img`
  max-width: 5rem;
  max-height: 5rem;
  min-width: 5rem;
  min-width: 5rem;
`;
