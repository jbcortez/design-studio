import { Color, Colors, Theme } from "../types";
import ThemeModel from "../models/ThemeModel";
import { v4 as uuidv4 } from "uuid";

export const getTheme = async (req, res): Promise<Theme | void> => {
  try {
    const result = await ThemeModel.findOne();

    if (result) {
      res.status(200).send(result);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getCustomColors = async (req, res): Promise<Colors | void> => {
  try {
    const result = await ThemeModel.findOne();
    const customColors = result?.custom;
    console.log("result: ", result);
    console.log("customColors, ", customColors);
    if (customColors) {
      console.log("saving custom color");
      res.status(200).send(customColors);
    }

    console.log("result not found");
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const addCustomColor = async (req: { body: { color: string } }, res) => {
  const color = req.body.color;
  const customColor: Color = { id: uuidv4(), value: color };
  try {
    const result = await ThemeModel.findOne();

    if (result) {
      result.custom.push(customColor);
      await result.save();
      res.status(201).send({ msg: "Custom color successfully added" });
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const deleteCustomColor = async (
  req: { params: { id: string } },
  res
) => {
  const id = req.params.id;

  try {
    const result = await ThemeModel.findOne();

    if (result) {
      result.custom = result.custom.filter((color) => color.id !== id);
      await result.save();
      res.status(200).send({ msg: "Custom color successfully deleted" });
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

export const addTheme = async (req: { body: { theme: Theme } }, res) => {
  const { theme } = req.body;

  try {
    const result = await ThemeModel.findOne();

    if (result) {
      return res.status(200).json({ msg: "Theme already exists" });
    } else {
      const newTheme = new ThemeModel(theme);
      await newTheme.save();
      res.status(201).json(newTheme);
    }
  } catch (e) {
    res.status(500).json({ error: "Error adding theme" });
  }
};
