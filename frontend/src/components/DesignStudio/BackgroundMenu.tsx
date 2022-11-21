import React, { useEffect } from "react";
import MenuButton from "./MenuButton";
import { useAppDispatch } from "../../redux/reduxHooks";
import { setBackgroundImage } from "../../redux/elementSlice";
import useGetCurrentContentId from "../../hooks/useGetCurrentContentId";
import styled from "styled-components";
import { Title } from "../../styles/util";
import { setCurrentComponent } from "../../redux/currentComponentSlice";
import useSidebarView from "../../hooks/useSidebarView";
import { clearSelectedItems } from "../../redux/dragSlice";
import BackgroundMenuItem from "./BackgroundMenuItem";

const BackgroundMenu: React.FC = () => {
  const ctaId = useGetCurrentContentId();
  const sidebarView = useSidebarView();

  const src: string =
    "https://images.unsplash.com/photo-1647405981491-649dd331c2ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80";

  const dispatch = useAppDispatch();

  const handleBackgroundImage = () => {
    dispatch(
      setBackgroundImage({
        src,
        id: ctaId,
      })
    );
  };

  // If sidebarView === 5, background menu is open, set currentComponent to CTA
  useEffect(() => {
    if (sidebarView === 5 && ctaId) {
      dispatch(setCurrentComponent({ id: ctaId, type: "cta" }));
      dispatch(clearSelectedItems());
    }
  }, [sidebarView, ctaId, dispatch]);

  return (
    <MenuContainer data-testid="background-menu">
      <Title>Background</Title>
      <MenuButton
        variant="secondary"
        fullWidth
        label="Choose Background Image"
        onClick={handleBackgroundImage}
      />
      <ListContainer>
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/1.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/2.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/3.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/4.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/5.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/6.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/8.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/9.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/10.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/11.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/12.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/13.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/14.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/15.svg"
          }
        />
        <BackgroundMenuItem
          src={
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/backgrounds/16.svg"
          }
        />
      </ListContainer>
    </MenuContainer>
  );
};

export default BackgroundMenu;

const MenuContainer = styled.div`
  height: 100%;
  width: calc(35rem - 7.1rem);
  padding: 2rem;
  font-size: 1.2rem;
  overflow-y: auto;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing[4]};

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing[4]};
  }
`;
