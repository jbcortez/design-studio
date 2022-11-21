import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/reduxHooks';
import useCurrentComponent from '../../hooks/useCurrentComponent';
import useGetEditingMode from '../../hooks/useGetEditingMode';
import useTargetElement from '../../hooks/useTargetElement';
import { setButtonBorderStyle } from '../../redux/elementSlice';
import styled from 'styled-components';
import { Radio } from 'antd';
import { Label } from '../../styles/util';

interface Props {
  params: { buttonState: string };
  id: string;
  label: string;
  options: string[];
}

const SelectInput: React.FC<Props> = ({ id, label, options, params }) => {
  const target = useTargetElement();
  const currentComponent = useCurrentComponent();
  const editingMode = useGetEditingMode();
  const { buttonState } = params;

  const [selected, setSelected] = useState<string>('none');

  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    setSelected(e.target.value);

    if (currentComponent.id) {
      dispatch(
        setButtonBorderStyle({
          id: currentComponent.id,
          borderStyle: e.target.value,
          buttonState,
        })
      );
    }
  };

  // Initialize the value of the select input
  useEffect(() => {
    if (target) {
      const desktop = target.style.desktop;

      const mobile = target.style.mobile;

      switch (editingMode) {
        case 'desktop':
          if (desktop.borderStyle?.value)
            setSelected(desktop.borderStyle.value);
          break;

        case 'mobile':
          if (mobile.borderStyle?.value) setSelected(mobile.borderStyle.value);
          break;
        default:
          break;
      }
    }
  }, [target, editingMode]);

  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <Radio.Group value={selected} onChange={handleChange}>
        {options &&
          options.map((option) => (
            <Radio.Button key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Radio.Button>
          ))}
      </Radio.Group>
    </InputContainer>
  );
};

export default SelectInput;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;
`;
