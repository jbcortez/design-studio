import React from "react";
import styled from "styled-components";

const Watermark = () => {
  return (
    <Container>
      <LogoContainer>
        <Text>Powered by</Text>
        <a href={"https://www.oceanapps.com"}>
          <Logo>OceanApps</Logo>
        </a>
      </LogoContainer>
    </Container>
  );
};

export default Watermark;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.7;
`;

const Logo = styled.h3`
  font-size: 2.8rem;
  margin-bottom: 0;
  color: ${(props) => props.theme.color.white};
`;

const Text = styled.p`
  margin-bottom: 0;
  color: ${(props) => props.theme.color.white};
  font-size: 2rem;
  padding-right: 1rem;
`;

const LogoContainer = styled.div`
  padding: ${(props) => props.theme.spacing[3]}
    ${(props) => props.theme.spacing[5]};
  background: ${(props) => props.theme.color.gray700};
  border-top-left-radius: 5px;
  display: flex;
  align-items: center;
`;
