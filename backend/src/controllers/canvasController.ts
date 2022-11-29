import ContentModel from "../models/ContentModel";
import { v4 as uuidv4 } from "uuid";
import { Content } from "../types";

export const getAllCanvas = async (req, res) => {
  try {
    const result = await ContentModel.find();

    if (result) {
      console.log("sending result: ", result);
      res.status(200).send(result);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

export const getCanvasById = async (req: { params: { id: string } }, res) => {
  const id = req.params.id;
  try {
    const result = await ContentModel.findOne({ id });

    if (result) {
      res.status(200).send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(404);
  }
};

export const createCanvas = async (
  req: { body: { canvasData: Content } },
  res
) => {
  const canvasData = req.body.canvasData;
  const id = uuidv4();

  try {
    const canvas = new ContentModel({
      ...canvasData,
      id,
    });

    await canvas.save();
    res.status(204).send(id);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deleteCanvasById = async (
  req: { params: { id: string } },
  res
) => {
  const id = req.params.id;

  try {
    await ContentModel.deleteOne({ id });
    res.status(200).json({ msg: "Canvas successfully deleted" });
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};

export const updateCanvas = async (
  req: { body: { canvasData: Content; id: string } },
  res
) => {
  const { canvasData, id } = req.body;

  const protocolRegEx =
    /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

  if (canvasData?.elements) {
    for (let item of canvasData.elements) {
      const url = item.link?.url;
      if (url && url.length > 0) {
        if (!url.match(protocolRegEx)) {
          return res.status(400).json({ msg: "Invalid URL", url });
        }
      }
    }
  }

  try {
    canvasData.updatedAt = new Date().getTime();
    const result = await ContentModel.updateOne(
      { id },
      {
        $set: canvasData,
      }
    );

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
