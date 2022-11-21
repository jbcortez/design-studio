import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";

const ImageInfo = () => {
  return (
    <Container>
      <Title>Image Info</Title>
      <Section>
        <TextInput id={"alt-text"} label={"Alt text"} />
      </Section>
    </Container>
  );
};

export default ImageInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > * {
    margin-bottom: ${(props) => props.theme.spacing[3]};
  }
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
`;

const Section = styled.div``;
