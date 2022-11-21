import React, { useRef, useEffect, useState } from 'react';
import {
  setFontStyle,
  setFontWeight,
  setTextDecoration,
} from '../../redux/elementSlice';
import { useAppDispatch } from '../../redux/reduxHooks';
import styled from 'styled-components';
import useCurrentComponent from '../../hooks/useCurrentComponent';
import useTargetElement from '../../hooks/useTargetElement';
import useGetEditingMode from '../../hooks/useGetEditingMode';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

const FontFormat = () => {
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);

  const currentComponent = useCurrentComponent();
  const target = useTargetElement();
  const dispatch = useAppDispatch();
  const editingMode = useGetEditingMode();

  const italicRef = useRef<HTMLButtonElement | null>(null);
  const boldRef = useRef<HTMLButtonElement | null>(null);
  const underlineRef = useRef<HTMLButtonElement | null>(null);

  const handleSetFontItalic = () => {
    if (currentComponent.id) {
      if (!italic) {
        dispatch(
          setFontStyle({
            id: currentComponent.id,
            fontStyle: 'italic',
          })
        );
      } else {
        dispatch(
          setFontStyle({
            id: currentComponent.id,
            fontStyle: 'normal',
          })
        );
      }
    }
  };

  const handleSetFontBold = () => {
    if (currentComponent.id) {
      if (!bold) {
        dispatch(
          setFontWeight({
            id: currentComponent.id,
            fontWeight: 'bold',
            editingMode,
          })
        );
      } else {
        dispatch(
          setFontWeight({
            id: currentComponent.id,
            fontWeight: 'normal',
            editingMode,
          })
        );
      }
    }
  };

  const handleSetFontUnderline = () => {
    if (currentComponent.id) {
      if (!underline) {
        dispatch(
          setTextDecoration({
            id: currentComponent.id,
            textDecoration: 'underline',
          })
        );
      } else {
        dispatch(
          setTextDecoration({
            id: currentComponent.id,
            textDecoration: 'none',
          })
        );
      }
    }
  };

  useEffect(() => {
    if (target) {
      switch (editingMode) {
        case 'desktop':
          if (target.style.desktop.fontStyle?.value === 'italic') {
            setItalic(true);
          } else {
            setItalic(false);
          }
          if (target.style.desktop.fontWeight?.value === 'bold') {
            setBold(true);
          } else {
            setBold(false);
          }
          if (target.style.desktop.textDecoration?.value === 'underline') {
            setUnderline(true);
          } else {
            setUnderline(false);
          }
          break;

        case 'mobile':
          if (target.style.mobile.fontStyle?.value === 'italic') {
            setItalic(true);
          } else {
            setItalic(false);
          }
          if (target.style.mobile.fontWeight?.value === 'bold') {
            setBold(true);
          } else {
            setBold(false);
          }
          if (target.style.mobile.textDecoration?.value === 'underline') {
            setUnderline(true);
          } else {
            setUnderline(false);
          }
          break;
        default:
          break;
      }
    }
  }, [target, editingMode]);

  return (
    <Container data-testid='font-format'>
      <IconStyles
        italic={italic}
        ref={italicRef}
        onClick={handleSetFontItalic}
        title={'Italic'}
        aria-label='Italic'>
        <FormatItalicIcon fontSize='large' />
      </IconStyles>
      <IconStyles
        bold={bold}
        onClick={handleSetFontBold}
        ref={boldRef}
        title={'Bold'}
        aria-label='Bold'>
        <FormatBoldIcon fontSize='large' />
      </IconStyles>

      <IconStyles
        underline={underline}
        onClick={handleSetFontUnderline}
        ref={underlineRef}
        title={'Underline'}
        aria-label='Underline'>
        <FormatUnderlinedIcon fontSize='large' />
      </IconStyles>
    </Container>
  );
};

export default FontFormat;

const IconStyles = styled.button<{
  italic?: boolean;
  bold?: boolean;
  underline?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease-in;
  border-radius: 2px;
  padding: 0.6rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.underline || props.bold || props.italic
      ? props.theme.color.gray200
      : '#FFF'};
  &:hover {
    background-color: ${(props) =>
      props.underline || props.bold || props.italic
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
