import React from 'react';
import useShowSidebar from '../../hooks/useShowSidebar';
import useSidebarView from '../../hooks/useSidebarView';
import SliderInput from './SliderInput';
import styled from 'styled-components';

const ZoomInput: React.FC = () => {
  const showSidebar = useShowSidebar();
  const sidebarView = useSidebarView();

  return (
    <Container show={showSidebar} view={sidebarView}>
      <SliderInput
        id='zoomSlider'
        min={1}
        max={200}
        variant='inline'
        style={{ marginBottom: 0 }}
        label='Zoom'
      />
    </Container>
  );
};

export default ZoomInput;

const Container = styled.div.attrs<{ show: boolean; view: number }>(
  (props) => ({
    style: {
      left: !props.show ? '7.3rem' : props.view === 4 ? '40.5rem' : '35rem',
      transition: props.show ? 'none' : 'left 150ms ease-in-out',
    },
  })
)<{ show: boolean; view: number }>`
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  margin-bottom: 0;
  border-left: 2px solid rgb(229 231 235);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 2rem;
  z-index: 0;
`;
