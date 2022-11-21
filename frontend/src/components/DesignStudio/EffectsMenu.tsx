import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Cover, Label } from "../../styles/util";
import { Slider, InputNumber } from "antd";
import useTargetElement from "../../hooks/useTargetElement";
import { setOpacity } from "../../redux/elementSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import useGetElStyle from "../../hooks/useGetElStyle";
import PropTypes from "prop-types";

interface Props {
  setShowEffectsMenu: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
}

const EffectsMenu: React.FC<Props> = ({ setShowEffectsMenu }) => {
  const [value, setValue] = useState<number>(0);

  const target = useTargetElement();
  const dispatch = useAppDispatch();
  const elStyle = useGetElStyle();

  // Initialize the slider value with the target's opacity
  useEffect(() => {
    if (target && elStyle && typeof elStyle.opacity?.value !== "undefined") {
      setValue(elStyle.opacity.value * 100);
    }
  }, [target, elStyle]);

  const handleChange = (val: number) => {
    if (target)
      dispatch(setOpacity({ id: target.id, opacity: val / 100, undo: false }));
  };

  const handleChangeComplete = (val: number) => {
    if (target)
      dispatch(setOpacity({ id: target.id, opacity: val / 100, undo: true }));
  };

  return (
    <>
      <Cover onClick={() => setShowEffectsMenu(false)} />
      <MenuContainer>
        <FormControl>
          <Label htmlFor="imageOpacity">Opacity</Label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Slider
              id={"imageOpacity"}
              aria-valuenow={value}
              value={value}
              onChange={handleChange}
              onAfterChange={handleChangeComplete}
              step={1}
              min={0}
              max={100}
              style={{ width: "150px", marginRight: "14px", marginBottom: "0" }}
            />
            <InputNumber
              id="imageOpacity"
              onChange={handleChangeComplete}
              value={value}
              style={{ width: "70px" }}
            />
          </div>
        </FormControl>
      </MenuContainer>
    </>
  );
};

EffectsMenu.propTypes = {
  setShowEffectsMenu: PropTypes.func.isRequired,
};

export default EffectsMenu;

const MenuContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow[2]};
  position: absolute;
  top: 45px;
  left: 118px;
  padding: ${({ theme }) => theme.spacing[3]};
  z-index: 100;
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
`;
