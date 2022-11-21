import ContentModel from "../models/ContentModel";
import { v4 as uuidv4 } from "uuid";
import { Content } from "../types";

export const getAllContent = async (req, res) => {
  console.log("getting all content");
  try {
    const result = await ContentModel.find();

    console.log("getAllContent result: ", result);
    if (result) {
      res.status(200).send(result);
    } else {
      res.sendStatus(200);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

export const getContentById = async (req: { params: { id: string } }, res) => {
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

export const createContentPost = async (
  req: { body: { contentData: Content } },
  res
) => {
  const contentData = req.body.contentData;
  const id = uuidv4();
  console.log("attempting to create...");
  try {
    const content = new ContentModel({
      ...contentData,
      id,
    });

    await content.save();
    res.status(204).json({ msg: "Content successfully created" });
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deleteContentById = async (
  req: { params: { id: string } },
  res
) => {
  const id = req.params.id;

  try {
    await ContentModel.deleteOne({ id });
    res.status(200).json({ msg: "Content successfully deleted" });
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};

export const updateContent = async (
  req: { body: { contentData: Content; id: string } },
  res
) => {
  const { contentData, id } = req.body;
  const protocolRegEx =
    /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

  if (contentData?.elements) {
    for (let item of contentData.elements) {
      const url = item.link?.url;
      if (url && url.length > 0) {
        if (!url.match(protocolRegEx)) {
          return res.status(400).json({ msg: "Invalid URL", url });
        }
      }
    }
  }

  try {
    contentData.updatedAt = new Date().getTime();
    const result = await ContentModel.updateOne(
      { id },
      {
        $set: contentData,
      }
    );

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};
