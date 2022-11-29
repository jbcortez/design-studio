import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.min.css";
import Sidebar from "../components/DesignStudio/Sidebar";
import Header from "../components/DesignStudio/Header";
import Stage from "../components/DesignStudio/Stage";
import { useAppDispatch } from "../redux/reduxHooks";
import { initFromContent } from "../redux/elementSlice";
import useSetCurrentCanvasId from "../hooks/useSetCurrentCanvasId";
import useSetCanvasList from "../hooks/useSetCanvasList";
import useGetCurrentCanvas from "../hooks/useGetCurrentCanvas";
import useUpdateCanvasList from "../hooks/useUpdateCanvasList";
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
import useAutoSave from "../hooks/useAutoSave";
import useGetCurrentCanvasId from "../hooks/useGetCurrentCanvasId";
import Modal from "../components/DesignStudio/Modal";

const DesignStudio: React.FC = () => {
  const [hasCanvasIdChanged, setHasCanvasIdChanged] = useState<boolean>(false);
  useAutoSave();
  useSetCurrentCanvasId();
  const dispatch = useAppDispatch();
  useSetCanvasList();
  const currentContent = useGetCurrentCanvas();
  useUpdateCanvasList();
  useUpdateCustomColors();
  useAppendFontScripts(currentContent);
  useRemoveFontScripts();
  const canvasId = useGetCurrentCanvasId();
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
    if (canvasId) {
      setHasCanvasIdChanged(true);
    }
  }, [canvasId]);

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
      currentContent.id &&
      hasCanvasIdChanged
    ) {
      dispatch(initFromContent({ content: currentContent }));
      setHasCanvasIdChanged(false);
    }
  }, [currentContent, dispatch, hasCanvasIdChanged]);

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
      {(!currentContent || !currentContent.id) && <Modal />}
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
