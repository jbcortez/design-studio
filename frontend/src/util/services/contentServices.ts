import axios from "axios";
import { Content, ContentList, ContentUpdate } from "../../types";
import { handleError } from "../helpers";

export const getAllContent = async (
  controller?: AbortController
): Promise<ContentList | void> => {
  try {
    let response: undefined | ContentList;
    if (controller) {
      response = await axios.get(
        "/api/content/all",

        { signal: controller.signal }
      );
    } else {
      response = await axios.post("/api/cta/all");
    }
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getContentById = async (
  id: string,
  controller?: AbortController
): Promise<Content | void> => {
  if (id)
    try {
      let response: undefined | Content;
      if (controller) {
        response = await axios.get(`/api/content/${id}`, {
          signal: controller.signal,
        });
      } else {
        response = await axios.get(`/api/content/${id}`);
      }
      return response;
    } catch (error) {
      handleError(error);
    }
};

export const createContent = async (
  contentData: Content,
  controller?: AbortController
) => {
  if (contentData)
    try {
      if (controller) {
        await axios.post(
          "/api/content/create",
          { contentData },
          { signal: controller.signal }
        );
      } else {
        await axios.post("/api/content/create", { contentData });
      }
    } catch (error) {
      handleError(error);
    }
};

export const deleteContent = async (
  id: string,
  controller?: AbortController
) => {
  if (id)
    try {
      if (controller) {
        await axios.delete(`/api/content/delete/${id}`, {
          signal: controller.signal,
        });
      } else {
        await axios.delete(`/api/content/delete/${id}`);
      }
    } catch (error) {
      handleError(error);
    }
};

export const updateContent = async (
  contentData: Content | ContentUpdate,
  controller?: AbortController
) => {
  if (contentData)
    try {
      if (controller) {
        await axios.put(
          "/api/content/update",
          { contentData, id: contentData.id },
          {
            signal: controller.signal,
          }
        );
      } else {
        await axios.put("/api/content/update", {
          contentData,
          id: contentData.id,
        });
      }
    } catch (error) {
      handleError(error);
    }
};
