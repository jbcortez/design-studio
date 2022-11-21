import React, { useLayoutEffect, useState } from "react";
import { Title } from "../../styles/util";
import styled from "styled-components";
import { SVGVariants } from "../../enums";
import ElementMenuItem from "./ElementMenuItem";
import { SVGVariation } from "../../types";
import { convertArrayTo3d } from "../../util/functions";

interface ElementType {
  premium: boolean;
  svg: string;
  alt: string;
  variant: SVGVariation;
}

const ElementsMenu: React.FC = () => {
  const [elementItems, setElementItems] = useState<ElementType[][]>([]);

  useLayoutEffect(() => {
    if (SVGVariants) {
      const result: ElementType[][] = convertArrayTo3d(SVGVariants);
      setElementItems(result);
    }
  }, []);

  return (
    <MenuContainer data-testid="button-menu">
      <Title>Elements</Title>
      {elementItems.length > 0 &&
        elementItems.map((row) => (
          <Row>
            {row.map((item, index) => {
              return (
                <ElementMenuItem
                  key={JSON.stringify(item.variant) + index}
                  variant={item.variant}
                  svg={item.svg}
                  alt={item.alt}
                />
              );
            })}
          </Row>
        ))}
    </MenuContainer>
  );
};

export default ElementsMenu;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
  font-size: 1.2rem;
  overflow-y: auto;
  width: calc(35rem - 7.1rem);
`;

const Row = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[3]};

  & > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing[3]};
  }
`;
