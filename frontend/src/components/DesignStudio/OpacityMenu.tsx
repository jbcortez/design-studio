import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputNumber, Slider } from "antd";
import useTargetElement from "../../hooks/useTargetElement";

import useCurrentComponent from "../../hooks/useCurrentComponent";
import { setOpacity } from "../../redux/elementSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { Cover, Label } from "../../styles/util";
import { Style } from "../../types";

interface Props {
  setShowOpacityMenu: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
}

const OpacityMenu: React.FC<Props> = ({ setShowOpacityMenu }) => {
  const [value, setValue] = useState<number>();
  const [elStyle, setElStyle] = useState<Style>({});

  const currentComponent = useCurrentComponent();
  const target = useTargetElement();
  const dispatch = useAppDispatch();

  const handleChange = (val: number) => {
    setValue(val);
  };

  const handleAfterChange = (val: number) => {
    if (
      typeof elStyle.opacity?.value !== "undefined" &&
      val !== elStyle.opacity.value * 100 &&
      currentComponent.id
    ) {
      dispatch(
        setOpacity({
          id: currentComponent.id,
          undo: true,
          opacity: val / 100,
        })
      );
    }
  };

  useEffect(() => {
    if (target) {
      setElStyle(target.style.desktop);
    }
  }, [target]);

  useEffect(() => {
    if (
      typeof value === "number" &&
      typeof elStyle.opacity?.value !== "undefined" &&
      value !== elStyle.opacity.value * 100 &&
      currentComponent.id
    ) {
      if (value === 0) {
        dispatch(
          setOpacity({
            id: currentComponent.id,
            undo: false,
            opacity: 0,
          })
        );
      } else {
        dispatch(
          setOpacity({
            id: currentComponent.id,
            undo: false,
            opacity: value / 100,
          })
        );
      }
    }
  }, [value, dispatch, currentComponent.id, elStyle]);

  useEffect(() => {
    if (typeof target?.style.desktop.opacity?.value !== "undefined") {
      setValue(target.style.desktop.opacity.value * 100);
    }
  }, [target]);

  return (
    <>
      <Cover onClick={() => setShowOpacityMenu(false)} />
      <MenuContainer>
        <LabelContainer>
          <Label
            htmlFor={"opacity"}
            style={{ fontWeight: "bold", marginBottom: "0" }}
          >
            Opacity
          </Label>
        </LabelContainer>
        <Row>
          <Slider
            id={"opacity"}
            value={value}
            min={0}
            max={100}
            onChange={handleChange}
            onAfterChange={handleAfterChange}
            style={{ width: "150px", margin: "0", marginRight: "1.4rem" }}
          />
          <InputNumber
            id={"opacity"}
            value={value}
            min={0}
            max={100}
            onChange={handleChange}
            style={{ width: "70px" }}
          />
        </Row>
      </MenuContainer>
    </>
  );
};

export default OpacityMenu;

const MenuContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow[2]};
  position: absolute;
  top: 45px;
  left: 62px;
  padding: ${({ theme }) => theme.spacing[4]};
  width: 28rem;
  z-index: 100;
  overflow: auto;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
