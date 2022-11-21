import * as mongoose from "mongoose";
import { ContentModel } from "../types";

const ContentSchema = new mongoose.Schema<ContentModel>({
  id: {
    type: String,
    required: true,
    immutable: true,
  },
  title: {
    type: String,
    default: "",
  },
  style: {
    type: {},
  },
  elements: {
    type: [],
  },
  backgroundImg: {
    desktop: {
      src: String,
      top: Number,
      left: Number,
    },
    mobile: {
      src: String,
      top: Number,
      left: Number,
    },
  },
  createdAt: {
    type: Number,
    default: () => new Date().getTime(),
    immutable: true,
  },
  updatedAt: {
    type: Number,
  },
});

export default mongoose.model("Content", ContentSchema);
