import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
  style?: React.CSSProperties;
}

const Tooltip: React.FC<Props> = ({ text, style }) => {
  return (
    <Container style={style}>
      <Text>{text}</Text>
    </Container>
  );
};

export default Tooltip;

const Container = styled.div`
  background: ${(props) => props.theme.color.gray600};
  border-radius: 5px;
  padding: 0.8rem;
  position: absolute;
  left: 16rem;
  width: 21rem;
  box-shadow: ${({ theme }) => theme.shadow[2]};
  border-width: 0;

  &::after {
    position: absolute;
    content: "";
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${(props) => props.theme.color.gray600};
    z-index: 2;
  }
`;
const Text = styled.p`
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.4;
`;
