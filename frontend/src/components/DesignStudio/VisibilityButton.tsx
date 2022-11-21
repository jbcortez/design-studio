import React, { useCallback, useLayoutEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Cover } from "../../styles/util";
import styled from "styled-components";
import useTargetElement from "../../hooks/useTargetElement";
import { useAppDispatch } from "../../redux/reduxHooks";
import { desktopDisplay, mobileDisplay } from "../../redux/elementSlice";

interface Props {
  style?: React.CSSProperties;
}

const VisibilityButton: React.FC<Props> = ({ style }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [desktopChecked, setDesktopChecked] = useState(true);
  const [mobileChecked, setMobileChecked] = useState(true);
  const [disableDesktop, setDisableDesktop] = useState(false);
  const [disableMobile, setDisableMobile] = useState(false);
  const targetElement = useTargetElement();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (
      targetElement?.style?.desktop?.display?.value === "block" ||
      typeof targetElement?.style?.desktop?.display?.value === "undefined"
    ) {
      setDesktopChecked(true);
    } else {
      setDesktopChecked(false);
    }
  }, [targetElement]);

  useLayoutEffect(() => {
    if (
      targetElement?.style?.mobile?.display?.value === "block" ||
      typeof targetElement?.style?.mobile?.display?.value === "undefined"
    ) {
      setMobileChecked(true);
    } else {
      setMobileChecked(false);
    }
  }, [targetElement]);

  const handleDesktopCheck = useCallback(() => {
    if (desktopChecked && targetElement) {
      dispatch(
        desktopDisplay({ id: targetElement.id, undo: true, display: "none" })
      );
    } else if (targetElement) {
      dispatch(
        desktopDisplay({ id: targetElement.id, undo: true, display: "block" })
      );
    }

    setDesktopChecked(!desktopChecked);
  }, [dispatch, desktopChecked, targetElement]);

  const handleMobileCheck = useCallback(() => {
    if (mobileChecked && targetElement) {
      dispatch(
        mobileDisplay({ id: targetElement.id, undo: true, display: "none" })
      );
    } else if (targetElement) {
      dispatch(
        mobileDisplay({ id: targetElement.id, undo: true, display: "block" })
      );
    }

    setMobileChecked(!mobileChecked);
  }, [dispatch, targetElement, mobileChecked]);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useLayoutEffect(() => {
    if (desktopChecked) {
      setDisableMobile(false);
    } else {
      setDisableMobile(true);
    }
  }, [desktopChecked]);

  useLayoutEffect(() => {
    if (mobileChecked) {
      setDisableDesktop(false);
    } else {
      setDisableDesktop(true);
    }
  }, [mobileChecked]);

  return (
    <VisibilityButtonContainer
      aria-label={"Element Visibility"}
      title={"Element Visibility"}
      show={showMenu}
      style={style}
    >
      <VisibilityIcon onClick={handleShowMenu} fontSize={"large"} />
      {showMenu && (
        <>
          <Cover onClick={() => setShowMenu(false)} />
          <InputContainer>
            <Row>
              <input
                disabled={disableDesktop}
                id={"showOnDesktop"}
                type={"checkbox"}
                checked={desktopChecked}
                onChange={handleDesktopCheck}
              />
              <Label htmlFor={"showOnDesktop"}>Show on Desktop</Label>
            </Row>
            <Row>
              <input
                disabled={disableMobile}
                id={"showOnMobile"}
                type={"checkbox"}
                checked={mobileChecked}
                onChange={handleMobileCheck}
              />
              <Label htmlFor={"showOnMobile"}>Show on Mobile</Label>
            </Row>
          </InputContainer>
        </>
      )}
    </VisibilityButtonContainer>
  );
};

export default VisibilityButton;

const InputContainer = styled.div`
  position: absolute;
  top: 4.5rem;
  right: 0;
  padding: 2rem;
  border-radius: 3px;
  background: #fff;
  box-shadow: ${(props) => props.theme.shadow[2]};
  cursor: default;
  display: flex;
  flex-direction: column;
  z-index: 100;

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing[3]};
  }
`;

const VisibilityButtonContainer = styled.button<{ show: boolean }>`
  -webkit-transition: background-color 0.1s ease-in-out;
  transition: background-color 0.1s ease-in-out;
  border-radius: 2px;
  padding: 0.6rem;
  cursor: pointer;
  position: relative;
  border: none;
  background-color: ${(props) =>
    props.show ? props.theme.color.gray200 : "#FFF"};

  &:hover {
    background-color: ${(props) =>
      props.show ? props.theme.color.gray200 : props.theme.color.gray100};
  }
`;

const Row = styled.div`
  display: flex;
  white-space: nowrap;
`;

const Label = styled.label`
  margin-left: ${(props) => props.theme.spacing[3]};
`;
