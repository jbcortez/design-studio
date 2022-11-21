import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  id?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TopBarButton: React.FC<Props> = ({ label, id, onClick }) => {
  return (
    <Button id={id} onClick={onClick}>
      {label}
    </Button>
  );
};

export default TopBarButton;

const Button = styled.button`
  font-size: 1.2rem;
  color: ${(props) => props.theme.gray900};
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  transition: background-color 0.1s ease-in-out;
  border: none;
  border-radius: 5px;
  background: #fff;

  &:hover {
    border-radius: 5px;
    background-color: ${(props) => props.theme.color.gray100};
  }
`;
