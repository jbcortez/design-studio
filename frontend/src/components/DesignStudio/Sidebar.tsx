import React, { useLayoutEffect } from "react";
import ButtonProperties from "./ButtonProperties";
import ButtonMenu from "./ButtonMenu";
import TemplateMenu from "./TemplateMenu";
import TextMenu from "./TextMenu";
import BackgroundMenu from "./BackgroundMenu";
import MediaLibraryMenu from "./ImagesMenu";
import styled from "styled-components";
import useSidebarView from "../../hooks/useSidebarView";
import HideSidebarButton from "./HideSidebarButton";
import useShowSidebar from "../../hooks/useShowSidebar";
import ElementsMenu from "./ElementsMenu";
import AnnouncementSelector from "./AnnouncementSelector";
import { setShowSidebar } from "../../redux/sidebarViewSlice";
import { useAppDispatch } from "../../redux/reduxHooks";

const Sidebar: React.FC = () => {
  const sidebarView = useSidebarView();
  const showSidebar = useShowSidebar();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (sidebarView === 9) {
      dispatch(setShowSidebar(false));
    }
  }, [dispatch, sidebarView]);

  return (
    <SidebarStyles show={showSidebar} data-testid="sidebar">
      <HideSidebarButton />
      <SelectorContainer>
        <AnnouncementSelector />
      </SelectorContainer>
      {sidebarView === 1 && <TemplateMenu />}
      {sidebarView === 2 && <MediaLibraryMenu />}
      {sidebarView === 3 && <TextMenu />}
      {sidebarView === 4 && <ButtonMenu />}
      {sidebarView === 5 && <BackgroundMenu />}
      {sidebarView === 6 && <ButtonProperties />}
      {sidebarView === 8 && <ElementsMenu />}
    </SidebarStyles>
  );
};

export default Sidebar;

const SidebarStyles = styled.div.attrs<{ show: boolean }>((props) => ({
  style: {
    maxWidth: props.show ? "40.7rem" : "0",
  },
}))<{ show: boolean }>`
  height: calc(100vh - 4.8rem);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: ${(props) => `2px solid ${props.theme.color.gray200}`};
  position: relative;
  transition: all 150ms ease-in-out;
  max-width: 40.7rem;
`;

const SelectorContainer = styled.div`
  height: 4.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
`;
