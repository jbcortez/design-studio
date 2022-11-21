import React from "react";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
  setActiveSidebarView,
  setShowSidebar,
} from "../../redux/sidebarViewSlice";
import styled from "styled-components";
import useSidebarView from "../../hooks/useSidebarView";
import { useAppDispatch } from "../../redux/reduxHooks";

interface MenuItem {
  icon: any;
  id: string;
  label: string;
}

type MenuItems = MenuItem[];

const SidebarMenu: React.FC = () => {
  const menuItems: MenuItems = [
    { icon: TableChartOutlinedIcon, id: "1", label: "Templates" },
    { icon: WidgetsIcon, id: "8", label: "Elements" },
    { icon: ImageSearchOutlinedIcon, id: "2", label: "Images" },
    { icon: TitleOutlinedIcon, id: "3", label: "Text" },
    { icon: SmartButtonOutlinedIcon, id: "4", label: "Buttons" },
    { icon: ImageOutlinedIcon, id: "5", label: "Background" },
  ];

  const sidebarView = useSidebarView();
  const dispatch = useAppDispatch();

  const toggleActiveSidebarView = (index: number) => {
    if (index === 9) {
      dispatch(setActiveSidebarView({ id: index }));
      dispatch(setShowSidebar(false));
    } else {
      dispatch(setActiveSidebarView({ id: menuItems[index].id }));
      dispatch(setShowSidebar(true));
    }
  };

  const handleClick = (index: number) => {
    toggleActiveSidebarView(index);
  };

  return (
    <SidebarMenuStyles data-testid="sidebar-menu">
      <div>
        {menuItems.map((item, index) => (
          <MenuButton
            view={String(sidebarView)}
            id={item.id}
            key={item.label}
            onClick={() => handleClick(index)}
          >
            <item.icon
              style={{
                fontSize: 28,
                color: "inherit",
                marginBottom: "2px",
              }}
            />
            {item.label}
          </MenuButton>
        ))}
      </div>
    </SidebarMenuStyles>
  );
};

export default SidebarMenu;

const SidebarMenuStyles = styled.div`
  min-width: 7.1rem;
  background-color: ${({ theme }) => theme.color.blue900};
  height: calc(100vh - 4.8rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MenuButton = styled.button<{ view?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  font-family: "roboto", sans-serif;
  color: ${(props) =>
    props.view === props.id ? props.theme.color.black : "#FFF"};

  font-size: 1.2rem;
  background-color: ${(props) =>
    props.view === props.id
      ? "#FFF"
      : props.id === "10"
      ? "#8C21AF"
      : "transparent"};
  height: 7.1rem;
  width: 7.1rem;

  cursor: pointer;
  position: relative;
  z-index: 1000;

  &::before {
    display: ${(props) =>
      props.id !== "9" && props.id !== "10" ? "flex" : "none"};
    pointer-events: none;
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: -50px;
    height: 50px;
    width: 25px;
    left: 46px;
    border-top-right-radius: 5px;
    box-shadow: ${(props) =>
      props.view === props.id ? "0 -5px 0 0 #FFF" : ""};
  }

  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
    background-color: transparent;
    bottom: 71px;
    height: 50px;
    width: 25px;
    left: 46px;
    border-bottom-right-radius: 5px;
    box-shadow: ${(props) => (props.view === props.id ? "0 5px 0 0 #FFF" : "")};
  }
`;