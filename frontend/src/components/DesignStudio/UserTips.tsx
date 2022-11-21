import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const UserTips: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default UserTips;

const Container = styled.div`
  position: absolute;
  padding: ${(props) => props.theme.spacing[3]}
  bottom: 5rem;
  left: 5rem;
  display: flex;
  flex-direction: column-reverse;
  
  & > *:not(:last-child) {
    margin-top: ${(props) => props.theme.spacing[2]};
  }
`;
