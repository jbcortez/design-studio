"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomColor = exports.addCustomColor = exports.getCustomColors = exports.getTheme = void 0;
const ThemeModel_1 = __importDefault(require("../models/ThemeModel"));
const uuid_1 = require("uuid");
const getTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ThemeModel_1.default.findOne();
        const theme = result === null || result === void 0 ? void 0 : result.colors;
        if (theme) {
            res.status(200).send(theme);
        }
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});
exports.getTheme = getTheme;
const getCustomColors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ThemeModel_1.default.findOne();
        const customColors = result === null || result === void 0 ? void 0 : result.colors.custom;
        if (customColors) {
            res.status(200).send(customColors);
        }
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});
exports.getCustomColors = getCustomColors;
const addCustomColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const color = req.body.color;
    const customColor = { id: (0, uuid_1.v4)(), value: color };
    try {
        const result = yield ThemeModel_1.default.findOne();
        if (result) {
            result.colors.custom.push(customColor);
            yield result.save();
            res.status(201).send({ msg: "Custom color successfully added" });
        }
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});
exports.addCustomColor = addCustomColor;
const deleteCustomColor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield ThemeModel_1.default.findOne();
        if (result) {
            result.colors.custom = result.colors.custom.filter((color) => color.id !== id);
            yield result.save();
            res.status(200).send({ msg: "Custom color successfully deleted" });
        }
    }
    catch (e) {
        res.sendStatus(500);
    }
});
exports.deleteCustomColor = deleteCustomColor;
//# sourceMappingURL=themeController.js.map