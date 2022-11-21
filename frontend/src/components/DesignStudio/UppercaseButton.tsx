import React, { useState, useEffect } from 'react';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/reduxHooks';
import { setFontUppercase } from '../../redux/elementSlice';
import useTargetElement from '../../hooks/useTargetElement';

const UppercaseButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const target = useTargetElement();

  const [isUppercase, setIsUppercase] = useState<boolean>(false);

  const handleClick = () => {
    if (!isUppercase && target) {
      dispatch(
        setFontUppercase({
          id: target.id,
          textTransform: 'uppercase',
        })
      );
    } else if (target) {
      dispatch(setFontUppercase({ id: target.id, textTransform: 'none' }));
    }
  };

  useEffect(() => {
    if (target) {
      if (target.style.desktop.textTransform?.value === 'uppercase') {
        setIsUppercase(true);
      } else {
        setIsUppercase(false);
      }
    }
  }, [target]);

  return (
    <IconStyles
        title={'Uppercase/Lowercase'}
      isUppercase={isUppercase}
      aria-label='Uppercase/lowercase'
      onClick={handleClick}>
      <FormatSizeIcon fontSize='large' />
    </IconStyles>
  );
};

export default UppercaseButton;

const IconStyles = styled.button<{ isUppercase: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease-in;
  border-radius: 2px;
  padding: 0.6rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.isUppercase ? props.theme.color.gray200 : '#FFF'};
  &:hover {
    background-color: ${(props) =>
      props.isUppercase
        ? props.theme.color.gray200
        : props.theme.color.gray100};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.gray200};
  }
`;
