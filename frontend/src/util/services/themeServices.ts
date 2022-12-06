import { Colors, Theme } from "../../types";
import { handleError } from "../helpers";
import axios from "axios";

export const getTheme = async (
  controller?: AbortController
): Promise<Theme | void> => {
  let result: undefined | { data: Theme };
  try {
    if (controller) {
      result = await axios.get("/api/theme", { signal: controller.signal });
    } else {
      result = await axios.get("/api/theme");
    }
    return result?.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCustomColors = async (
  controller?: AbortController
): Promise<Colors | void> => {
  let result: undefined | { data: Colors };
  try {
    if (controller) {
      result = await axios.get("/api/theme/custom", {
        signal: controller.signal,
      });
    } else {
      result = await axios.get("/api/theme/custom");
    }
    return result?.data;
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

export const addTheme = async (
  theme: Theme,
  controller?: AbortController
): Promise<{ data: Theme } | void> => {
  try {
    if (controller) {
      return await axios.post(
        "/api/theme/add-theme",
        { theme },
        { signal: controller.signal }
      );
    } else {
      return await axios.post("/api/theme/add-theme", { theme });
    }
  } catch (error) {
    handleError(error);
  }
};
