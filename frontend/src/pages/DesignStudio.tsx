import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.min.css";
import Sidebar from "../components/DesignStudio/Sidebar";
import Header from "../components/DesignStudio/Header";
import Stage from "../components/DesignStudio/Stage";
import { useAppDispatch } from "../redux/reduxHooks";
import { initFromContent } from "../redux/elementSlice";
import useSetCurrentContentId from "../hooks/useSetCurrentContentId";
import useSetContentList from "../hooks/useSetContentList";
import useGetCurrentContent from "../hooks/useGetCurrentContent";
import useGetCurrentContentId from "../hooks/useGetCurrentContentId";
import useUpdateContentList from "../hooks/useUpdateContentList";
import useUpdateCustomColors from "../hooks/useUpdateCustomColors";
import styled from "styled-components";
import SidebarMenu from "../components/DesignStudio/SidebarMenu";
import useAppendFontScripts from "../hooks/useAppendFontScripts";
import useRemoveFontScripts from "../hooks/useRemoveFontScripts";
import useQuery from "../hooks/useQuery";
import { useTemplate } from "../hooks/useTemplate";
import { addToContentList } from "../util/functions";
import { getTheme } from "../util/services/themeServices";
import { setTheme } from "../redux/themeSlice";

const DesignStudio: React.FC = () => {
  useSetCurrentContentId();
  const dispatch = useAppDispatch();
  const hasRendered = useSetContentList();
  const contentId = useGetCurrentContentId();
  const currentContent = useGetCurrentContent();
  useUpdateContentList();
  useUpdateCustomColors();
  useAppendFontScripts(currentContent);
  useRemoveFontScripts();

  const query = useQuery();
  const templateId = query.get("template-id");
  const handleTemplate = useTemplate();
  const templateHandled = useRef(false);

  useEffect(() => {
    if (currentContent?.id) {
      addToContentList(currentContent.id);
    }
  }, [currentContent]);

  useEffect(() => {
    if (templateId && !templateHandled.current) {
      setTimeout(() => {
        handleTemplate(parseInt(templateId));
        templateHandled.current = true;
      }, 1000);
    }
  }, [templateId, handleTemplate]);

  useEffect(() => {
    const controller = new AbortController();

    getTheme(controller).then((res) => {
      if (res) dispatch(setTheme({ theme: res }));
    });

    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    if (
      currentContent &&
      Object.keys(currentContent).length > 0 &&
      currentContent.id
    ) {
      dispatch(initFromContent({ content: currentContent }));
    }
  }, [currentContent, dispatch, contentId]);

  return (
    <DesignStudioStyles>
      <Header />
      <Container>
        <div style={{ zIndex: 1000 }}>
          <SidebarMenu />
        </div>
        <Sidebar />
        <Stage />
      </Container>
    </DesignStudioStyles>
  );
};

export default DesignStudio;

const Container = styled.div`
  display: flex;
`;

const DesignStudioStyles = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
