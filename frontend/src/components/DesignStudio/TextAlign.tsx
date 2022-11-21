import React, { useEffect, useState, useRef } from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { setTextAlign } from '../../redux/elementSlice';
import { useAppDispatch } from '../../redux/reduxHooks';
import useCurrentComponent from '../../hooks/useCurrentComponent';
import useTargetElement from '../../hooks/useTargetElement';
import useGetEditingMode from '../../hooks/useGetEditingMode';
import styled from 'styled-components';

const TextAlign: React.FC = () => {
  const [active, setActive] = useState<string>('');

  const currentComponent = useCurrentComponent();
  const target = useTargetElement();
  const editingMode = useGetEditingMode();

  const dispatch = useAppDispatch();

  const leftRef = useRef<HTMLButtonElement | null>(null);
  const centerRef = useRef<HTMLButtonElement | null>(null);
  const rightRef = useRef<HTMLButtonElement | null>(null);
  const justifyRef = useRef<HTMLButtonElement | null>(null);

  const handleSetAlignLeft = () => {
    if (active !== 'left' && currentComponent.id) {
      setActive('left');
      dispatch(
        setTextAlign({
          id: currentComponent.id,
          textAlign: 'left',
          editingMode,
        })
      );
    }
  };

  const handleSetAlignCenter = () => {
    if (active !== 'center' && currentComponent.id) {
      setActive('center');
      dispatch(
        setTextAlign({
          id: currentComponent.id,
          textAlign: 'center',
          editingMode,
        })
      );
    }
  };

  const handleSetAlignRight = () => {
    if (active !== 'right' && currentComponent.id) {
      setActive('right');
      dispatch(
        setTextAlign({
          id: currentComponent.id,
          textAlign: 'right',
          editingMode,
        })
      );
    }
  };

  const handleSetAlignJustify = () => {
    if (active !== 'justify' && currentComponent.id) {
      setActive('justify');
      dispatch(
        setTextAlign({
          id: currentComponent.id,
          textAlign: 'justify',
          editingMode,
        })
      );
    }
  };

  useEffect(() => {
    if (target) {
      switch (editingMode) {
        case 'desktop':
          if (target.style.desktop.textAlign?.value === 'center') {
            setActive('center');
          } else if (target.style.desktop.textAlign?.value === 'left') {
            setActive('left');
          } else if (target.style.desktop.textAlign?.value === 'right') {
            setActive('right');
          } else if (target.style.desktop.textAlign?.value === 'justify') {
            setActive('justify');
          }
          break;

        case 'mobile':
          if (target.style.mobile.textAlign?.value === 'center') {
            setActive('center');
          } else if (target.style.mobile.textAlign?.value === 'left') {
            setActive('left');
          } else if (target.style.mobile.textAlign?.value === 'right') {
            setActive('right');
          } else if (target.style.mobile.textAlign?.value === 'justify') {
            setActive('justify');
          }
          break;
        default:
          break;
      }
    }
  }, [target, editingMode]);

  return (
    <Container style={{ display: 'flex' }} data-testid='text-align'>
      <IconStyles
        active={active}
        aria-label='Align Left'
        title='Align Left'
        ref={leftRef}
        id='left'
        onClick={handleSetAlignLeft}>
        <FormatAlignLeftIcon fontSize={'large'} />
      </IconStyles>
      <IconStyles
        active={active}
        aria-label='Align Center'
        title='Align Center'
        ref={centerRef}
        id='center'
        onClick={handleSetAlignCenter}>
        <FormatAlignCenterIcon fontSize='large' />
      </IconStyles>
      <IconStyles
        active={active}
        aria-label='Align Right'
        title='Align Right'
        ref={rightRef}
        id='right'
        onClick={handleSetAlignRight}>
        <FormatAlignRightIcon fontSize='large' />
      </IconStyles>
      <IconStyles
        active={active}
        aria-label='Justify'
        title='Justify'
        ref={justifyRef}
        id='justify'
        onClick={handleSetAlignJustify}>
        <FormatAlignJustifyIcon fontSize='large' />
      </IconStyles>
    </Container>
  );
};

export default TextAlign;

const IconStyles = styled.button<{ active: string }>`
  transition: background-color 0.1s ease-in;
  border-radius: 2px;
  padding: 0.6rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    (props.active === 'left' && props.id === 'left') ||
    (props.active === 'center' && props.id === 'center') ||
    (props.active === 'right' && props.id === 'right') ||
    (props.active === 'justify' && props.id === 'justify')
      ? props.theme.color.gray200
      : '#FFF'};
  &:hover {
    background-color: ${(props) =>
      (props.active === 'left' && props.id === 'left') ||
      (props.active === 'center' && props.id === 'center') ||
      (props.active === 'right' && props.id === 'right') ||
      (props.active === 'justify' && props.id === 'justify')
        ? props.theme.color.gray200
        : props.theme.color.gray100};
  }
`;

const Container = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 0.3rem;
  }
`;
