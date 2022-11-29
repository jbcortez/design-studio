import axios from "axios";
import { Canvas, CanvasUpdate, CanvasList } from "../../types";
import { handleError } from "../helpers";

export const getAllCanvas = async (
  controller?: AbortController
): Promise<CanvasList | void> => {
  try {
    let response: undefined | { data: CanvasList };
    if (controller) {
      response = await axios.get(
        "/api/canvas/all",

        { signal: controller.signal }
      );
    } else {
      response = await axios.get("/api/canvas/all");
    }

    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCanvasById = async (
  id: string,
  controller?: AbortController
): Promise<Canvas | void> => {
  if (id)
    try {
      let response: undefined | Canvas;
      if (controller) {
        response = await axios.get(`/api/canvas/${id}`, {
          signal: controller.signal,
        });
      } else {
        response = await axios.get(`/api/canvas/${id}`);
      }
      return response;
    } catch (error) {
      handleError(error);
    }
};

export const createCanvas = async (
  canvasData: Canvas,
  controller?: AbortController
): Promise<string | void> => {
  if (canvasData)
    try {
      if (controller) {
        const result = await axios.post(
          "/api/canvas/create",
          { canvasData },
          { signal: controller.signal }
        );
        return result.data;
      } else {
        const result = await axios.post("/api/canvas/create", { canvasData });
        return result.data;
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
        await axios.delete(`/api/canvas/delete/${id}`, {
          signal: controller.signal,
        });
      } else {
        await axios.delete(`/api/canvas/delete/${id}`);
      }
    } catch (error) {
      handleError(error);
    }
};

export const updateCanvas = async (
  canvasData: Canvas | CanvasUpdate,
  controller?: AbortController
) => {
  if (canvasData)
    try {
      if (controller) {
        await axios.put(
          "/api/canvas/update",
          { canvasData, id: canvasData.id },
          {
            signal: controller.signal,
          }
        );
      } else {
        await axios.put("/api/canvas/update", {
          canvasData,
          id: canvasData.id,
        });
      }
    } catch (error) {
      handleError(error);
    }
};
