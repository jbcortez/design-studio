import { Colors, Theme } from "../../types";
import { handleError } from "../helpers";
import axios from "axios";

export const getTheme = async (
  controller?: AbortController
): Promise<Theme | void> => {
  let result: undefined | Theme;
  try {
    if (controller) {
      result = await axios.get("/api/theme", { signal: controller.signal });
    } else {
      result = await axios.get("/api/theme");
    }
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const getCustomColors = async (
  controller?: AbortController
): Promise<Colors | void> => {
  let result: undefined | Colors;
  try {
    if (controller) {
      result = await axios.get("/api/theme/custom", {
        signal: controller.signal,
      });
    } else {
      result = await axios.get("/api/theme/custom");
    }
    return result;
  } catch (error) {
    handleError(error);
  }
};

export const addCustomColor = async (
  color: string,
  controller?: AbortController
) => {
  if (color)
    try {
      if (controller) {
        await axios.post(
          "/api/theme/custom",
          { color },
          { signal: controller.signal }
        );
      } else {
        await axios.post("/api/theme/custom", { color });
      }
    } catch (error) {
      handleError(error);
    }
};

export const deleteCustomColor = async (
  id: string,
  controller?: AbortController
) => {
  if (id)
    try {
      if (controller) {
        await axios.delete(`/api/theme/custom/delete/${id}`, {
          signal: controller.signal,
        });
      } else {
        await axios.delete(`/api/theme/custom/delete/${id}`);
      }
    } catch (error) {
      handleError(error);
    }
};
