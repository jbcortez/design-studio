import * as mongoose from "mongoose";
import { ThemeModel } from "../types";

const ThemeSchema = new mongoose.Schema<ThemeModel>({
  theme: {
    type: [{ id: String, value: String }],
  },
  custom: {
    type: [{ id: String, value: String }],
  },
});

export default mongoose.model("Theme", ThemeSchema);
