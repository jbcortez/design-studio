import { handleError } from "../helpers";
import axios from "axios";
import { Fonts } from "../../types";

export const getFonts = async (
  controller?: AbortController
): Promise<Fonts | void> => {
  try {
    let result;
    if (controller) {
      result = axios.get("/api/fonts", { signal: controller.signal });
    } else {
      result = axios.get("/api/fonts");
    }
    return result;
  } catch (error) {
    handleError(error);
  }
};
