import { GET_GOOGLE_FONTS } from "../gfonts";
import axios from "axios";
import dotenv from "dotenv";
import { Fonts } from "../types";

dotenv.config();

export const getFonts = async (req, res, next): Promise<Fonts | void> => {
  const options = {
    method: "GET",
    url: GET_GOOGLE_FONTS + `&key=${process.env.GOOGLE_API_KEY}`,
  };
  try {
    const response = await axios(options);

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
