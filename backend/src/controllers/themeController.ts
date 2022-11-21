import { Color, Colors, Theme } from "../types";
import ThemeModel from "../models/ThemeModel";
import { v4 as uuidv4 } from "uuid";

export const getTheme = async (req, res): Promise<Theme | void> => {
  try {
    const result = await ThemeModel.findOne();
    const theme = result?.colors;
    if (theme) {
      res.status(200).send(theme);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getCustomColors = async (req, res): Promise<Colors | void> => {
  try {
    const result = await ThemeModel.findOne();
    const customColors = result?.colors.custom;
    if (customColors) {
      res.status(200).send(customColors);
    }
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
      result.colors.custom.push(customColor);
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
      result.colors.custom = result.colors.custom.filter(
        (color) => color.id !== id
      );
      await result.save();
      res.status(200).send({ msg: "Custom color successfully deleted" });
    }
  } catch (e) {
    res.sendStatus(500);
  }
};
