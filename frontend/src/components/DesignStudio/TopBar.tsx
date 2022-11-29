import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import NumberInput from "./NumberInput";
import CustomColorPicker from "./ColorPicker";
import LineHeightInput from "./LineHeightInput";
import LetterSpacing from "./LetterSpacing";
import FontFormat from "./FontFormat";
import TextAlign from "./TextAlign";
import DeleteIcon from "./DeleteIcon";
import DuplicateIcon from "./DuplicateIcon";
import SendLayerBackIcon from "./SendLayerBackIcon";
import SendLayerForwardIcon from "./SendLayerForwardIcon";
import UppercaseButton from "./UppercaseButton";
import BordersMenu from "./BordersMenu";
import OpacityMenu from "./OpacityMenu";
import MenuButton from "./MenuButton";
import MoreOptions from "./MoreOptions";
import useMediaQuery from "@mui/material/useMediaQuery";
import TopBarMenu from "./TopBarMenu";
import { Cover } from "../../styles/util";
import FontPickerWrapper from "./FontPicker/FontPickerWrapper";
import useElements from "../../hooks/useElements";
import VisibilityButton from "./VisibilityButton";
import LinkIconBtn from "./LinkIconBtn";
import useGetSelectedItems from "../../hooks/useGetSelectedItems";

const TopBar: React.FC = () => {
  const currentComponent = useCurrentComponent();
  const [showBordersMenu, setShowBordersMenu] = useState<boolean>(false);
  const [showOpacityMenu, setShowOpacityMenu] = useState<boolean>(false);

  const [showResponsiveMenu, setShowResponsiveMenu] = useState<boolean>(false);
  const [backgroundImgExists, setBackgroundImgExists] =
    useState<boolean>(false);
  const [media, setMedia] = useState<string>("desktop");
  const elements = useElements().present;
  const selected = useGetSelectedItems();

  // Holds Icons that are placed into drop menu when screen is too small to fit all of them
  const [items, setItems] = useState<React.ReactElement[]>([]);

  const xs = useMediaQuery("(max-width: 835px)");
  const sm = useMediaQuery("(max-width: 1008px)");
  const md = useMediaQuery("(max-width: 1090px)");
  const lg = useMediaQuery("(max-width: 1138px)");
  const xl = useMediaQuery("(max-width: 1298px)");
  const xxl = useMediaQuery("(max-width: 1343px)");
  const desktop = useMediaQuery("(min-width: 1343px)");

  // Set backgroundImg in state if it exists
  useEffect(() => {
    if (elements) {
      const cta = elements.find((element) => element.type === "canvas");
      if (cta?.backgroundImg?.desktop.src || cta?.backgroundImg?.mobile.src) {
        setBackgroundImgExists(true);
      }
    }
  }, [elements]);

  useEffect(() => {
    if (xs) {
      setMedia("xs");
    } else if (sm) {
      setMedia("sm");
    } else if (md) {
      setMedia("md");
    } else if (lg) {
      setMedia("lg");
    } else if (xl) {
      setMedia("xl");
    } else if (xxl) {
      setMedia("xxl");
    } else if (desktop) {
      setMedia("desktop");
    }
  }, [xs, sm, md, lg, xl, xxl, desktop]);

  // Set items[] for TopBarMenu based on media query
  useEffect(() => {
    switch (media) {
      case "desktop":
        setItems([]);
        break;
      case "xxl":
        setItems([
          <DuplicateIcon key={"duplicate-icon"} />,
          <DeleteIcon key={"delete-icon"} />,
        ]);
        break;
      case "xl":
        if (currentComponent.type === "typography") {
          setItems([
            <LinkIconBtn />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        } else {
          setItems([
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        }

        break;
      case "lg":
        if (currentComponent.type === "typography") {
          setItems([
            <UppercaseButton key={"uppercase-button"} />,
            <LinkIconBtn />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        } else {
          setItems([
            <UppercaseButton key={"uppercase-button"} />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        }

        break;
      case "md":
        if (currentComponent.type === "typography") {
          setItems([
            <LineHeightInput
              id="lineHeight"
              label="Line Spacing"
              key={"line-height-input"}
            />,
            <LetterSpacing
              id="letterSpacing"
              key={"letterSpacing"}
              label="Letter Spacing"
            />,
            <UppercaseButton key={"uppercase-button"} />,
            <LinkIconBtn />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        } else {
          setItems([
            <LineHeightInput
              id="lineHeight"
              label="Line Spacing"
              key={"line-height-input"}
            />,
            <LetterSpacing
              id="letterSpacing"
              key={"letterSpacing"}
              label="Letter Spacing"
            />,
            <UppercaseButton key={"uppercase-button"} />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        }

        break;
      case "sm":
        if (currentComponent.type === "button") {
          setItems([
            <LineHeightInput
              id="lineHeight"
              label="Line Spacing"
              key={"line-height-input"}
            />,
            <LetterSpacing
              id="letterSpacing"
              key={"letterSpacing"}
              label="Letter Spacing"
            />,
            <UppercaseButton key={"uppercase-button"} />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        } else if (currentComponent.type === "typography") {
          setItems([
            <TextAlign key="text-align" />,
            <LineHeightInput
              id="lineHeight"
              label="Line Spacing"
              key={"line-height-input"}
            />,
            <LetterSpacing
              id="letterSpacing"
              key={"letterSpacing"}
              label="Letter Spacing"
            />,
            <UppercaseButton key={"uppercase-button"} />,
            <LinkIconBtn />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        } else {
          setItems([
            <TextAlign key="text-align" />,
            <LineHeightInput
              id="lineHeight"
              label="Line Spacing"
              key={"line-height-input"}
            />,
            <LetterSpacing
              id="letterSpacing"
              key={"letterSpacing"}
              label="Letter Spacing"
            />,
            <UppercaseButton key={"uppercase-button"} />,
            <VisibilityButton key={"visibility-icon"} />,
            <SendLayerBackIcon key={"send-layer-back-icon"} />,
            <SendLayerForwardIcon key={"send-layer-forward-icon"} />,
            <DuplicateIcon key={"duplicate-icon"} />,
            <DeleteIcon key={"delete-icon"} />,
          ]);
        }

        break;
      default:
        return;
    }
  }, [media, currentComponent]);

  // Close TopBarMenu when screen is full width
  useEffect(() => {
    if (media === "desktop") {
      setShowResponsiveMenu(false);
    }
  }, [media]);

  // Show/hide borders menu
  const handleBorders = () => {
    if (showOpacityMenu) {
      setShowOpacityMenu(false);
    }

    setShowBordersMenu(!showBordersMenu);
  };

  if (currentComponent.type === "typography" && selected.length < 2) {
    return (
      <TopBarStyles data-testid="top-bar">
        <FontPickerWrapper />
        <NumberInput
          id="fontSize"
          style={{ maxWidth: "7rem", minWidth: "7rem" }}
        />
        <CustomColorPicker id={"fontColor"} style={{ marginBottom: "0" }} />
        <FontFormat />
        {(media === "desktop" ||
          media === "xxl" ||
          media === "xl" ||
          media === "lg" ||
          media === "md") && <TextAlign />}

        {(media === "desktop" ||
          media === "xxl" ||
          media === "xl" ||
          media === "lg") && (
          <>
            <LineHeightInput id="lineHeight" label="Line Spacing" />
            <LetterSpacing id="letterSpacing" label="Letter Spacing" />
          </>
        )}
        {(media === "desktop" || media === "xxl" || media === "xl") && (
          <UppercaseButton />
        )}

        {(media === "desktop" || media === "xxl") && (
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <LinkIconBtn />
            <VisibilityButton style={{ marginRight: "14px" }} />
            <SendLayerBackIcon />
            <SendLayerForwardIcon />
          </div>
        )}

        {media === "desktop" && (
          <>
            <Divider />
            <div style={{ display: "flex" }}>
              <DuplicateIcon />
              <DeleteIcon />
            </div>
          </>
        )}
        {media !== "desktop" && (
          <Flex
            style={{
              justifyContent: "flex-end",
              width: "100%",
              marginRight: "0 ",
            }}
          >
            <MoreOptions
              active={showResponsiveMenu}
              onClick={() => setShowResponsiveMenu(!showResponsiveMenu)}
            />
          </Flex>
        )}
        {showResponsiveMenu && (
          <>
            <TopBarMenu items={items} />
            <Cover onClick={() => setShowResponsiveMenu(false)} />
          </>
        )}
      </TopBarStyles>
    );
  } else if (currentComponent.type === "canvas" && selected.length < 2) {
    return (
      <TopBarStyles data-testid="top-bar">
        <CustomColorPicker id={"background"} style={{ marginBottom: "0" }} />
        <MenuButton
          variant="text"
          label="Opacity"
          active={showOpacityMenu}
          onClick={() => setShowOpacityMenu(!showOpacityMenu)}
        />
        {showOpacityMenu && (
          <>
            <OpacityMenu setShowOpacityMenu={setShowOpacityMenu} />
          </>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {backgroundImgExists && <DeleteIcon />}
        </div>
      </TopBarStyles>
    );
  } else if (
    (currentComponent.type === "image" ||
      currentComponent.type === "imageSvg") &&
    selected.length < 2
  ) {
    return (
      <TopBarStyles data-testid="top-bar">
        <MenuButton
          id="bordersButton"
          label="Borders"
          variant="text"
          active={showBordersMenu}
          onClick={handleBorders}
        />
        {showBordersMenu && (
          <>
            <BordersMenu setShowBordersMenu={setShowBordersMenu} />
          </>
        )}
        <MenuButton
          variant="text"
          label="Opacity"
          active={showOpacityMenu}
          onClick={() => setShowOpacityMenu(!showOpacityMenu)}
        />

        {showOpacityMenu && (
          <>
            <OpacityMenu setShowOpacityMenu={setShowOpacityMenu} />
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",

            width: "100%",
          }}
        >
          {/*<LinkIconBtn onClick={() => {}} id="linkButton" />*/}
          <Divider />
        </div>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <VisibilityButton style={{ marginRight: "14px" }} />
          <SendLayerBackIcon />
          <SendLayerForwardIcon />
        </div>
        <Divider />
        <div style={{ display: "flex" }}>
          <DuplicateIcon />
          <DeleteIcon />
        </div>
      </TopBarStyles>
    );
  } else if (currentComponent.type === "rawSvg" && selected.length < 2) {
    return (
      <TopBarStyles data-testid="top-bar">
        <CustomColorPicker id={"background"} style={{ marginBottom: "0" }} />
        {/*<MenuButton*/}
        {/*  id="bordersButton"*/}
        {/*  label="Borders"*/}
        {/*  variant="text"*/}
        {/*  active={showBordersMenu}*/}
        {/*  onClick={handleBorders}*/}
        {/*/>*/}
        {showBordersMenu && (
          <>
            <BordersMenu setShowBordersMenu={setShowBordersMenu} />
          </>
        )}
        <MenuButton
          id="effectsButton"
          variant="text"
          label="Opacity"
          active={showOpacityMenu}
          onClick={() => setShowOpacityMenu(!showOpacityMenu)}
        />

        {showOpacityMenu && (
          <>
            <OpacityMenu setShowOpacityMenu={setShowOpacityMenu} />
          </>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: "auto",

            width: "100%",
          }}
        >
          {/*<LinkIconBtn onClick={() => {}} id="linkButton" />*/}
          <Divider />
        </div>
        <div style={{ display: "flex", marginLeft: "auto" }}>
          <VisibilityButton style={{ marginRight: "14px" }} />
          <SendLayerBackIcon />
          <SendLayerForwardIcon />
        </div>
        <Divider />
        <div style={{ display: "flex" }}>
          <DuplicateIcon />
          <DeleteIcon />
        </div>
      </TopBarStyles>
    );
  } else if (currentComponent.type === "button" && selected.length < 2) {
    return (
      <TopBarStyles data-testid="top-bar">
        <FontPickerWrapper />
        <NumberInput
          id="fontSize"
          style={{ maxWidth: "7rem", minWidth: "7rem" }}
        />

        <FontFormat />

        {media === "desktop" ||
          media === "xxl" ||
          media === "xl" ||
          media === "lg" ||
          media === "md"}
        {(media === "desktop" ||
          media === "xxl" ||
          media === "xl" ||
          media === "lg") && (
          <>
            <LineHeightInput id="lineHeight" label="Line Spacing" />
            <LetterSpacing id="letterSpacing" label="Letter Spacing" />
          </>
        )}
        {(media === "desktop" || media === "xxl" || media === "xl") && (
          <UppercaseButton />
        )}
        {(media === "desktop" || media === "xxl") && (
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <VisibilityButton style={{ marginRight: "14px" }} />
            <SendLayerBackIcon />
            <SendLayerForwardIcon />
          </div>
        )}

        {media === "desktop" && (
          <>
            <Divider />
            <div style={{ display: "flex" }}>
              <DuplicateIcon />
              <DeleteIcon />
            </div>
          </>
        )}
        {media !== "desktop" && (
          <Flex
            style={{
              justifyContent: "flex-end",
              width: "100%",
              marginRight: "0 ",
            }}
          >
            <MoreOptions
              active={showResponsiveMenu}
              onClick={() => setShowResponsiveMenu(!showResponsiveMenu)}
            />
          </Flex>
        )}
        {showResponsiveMenu && (
          <>
            <TopBarMenu items={items} />
            <Cover onClick={() => setShowResponsiveMenu(false)} />
          </>
        )}
      </TopBarStyles>
    );
  } else {
    return <TopBarStyles data-testid="top-bar"></TopBarStyles>;
  }
};

export default TopBar;

const TopBarStyles = styled.div<{ showMenu?: boolean }>`
  //position: absolute;
  //top: 0;
  //left: 0;

  height: 4rem;
  width: 100%;

  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  padding: 1rem 1.8rem;
  z-index: 10;

  & > *:not(:last-child) {
    margin-right: ${(props) => (props.showMenu ? "0" : props.theme.spacing[3])};
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  height: 100%;
  background: ${(props) => props.theme.color.gray200};
  width: 2px;
`;
