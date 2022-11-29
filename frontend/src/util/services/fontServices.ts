import { handleError } from "../helpers";
import axios from "axios";

export const getFonts = async (
  controller?: AbortController
): Promise<{ family: string }[] | void> => {
  try {
    let result;
    if (controller) {
      result = await axios.get("/api/fonts", { signal: controller.signal });
    } else {
      result = await axios.get("/api/fonts");
    }

    return result.data.items;
  } catch (error) {
    handleError(error);
  }
};
