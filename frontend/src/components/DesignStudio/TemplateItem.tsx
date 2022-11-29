import styled from "styled-components";
import React from "react";
import { useTemplate } from "../../hooks/useTemplate";

interface Props {
  src: string;
  alt: string;
  id: number;
  premium: boolean;
}

const TemplateItem: React.FC<Props> = ({ src, alt, id, premium }) => {
  const handleTemplate = useTemplate();

  return (
    <TemplateItemStyles>
      <Image
        aria-label={"template " + id}
        src={src}
        alt={alt}
        onClick={() => handleTemplate(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleTemplate(id);
        }}
      />
    </TemplateItemStyles>
  );
};

export default TemplateItem;

const TemplateItemStyles = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]};
  box-shadow: ${(props) => props.theme.shadow[4]};
  position: relative;
  background-color: #000;
`;

const Image = styled.img`
  width: 24rem;
  cursor: pointer;
  z-index: 2;
`;
