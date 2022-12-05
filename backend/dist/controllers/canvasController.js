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
exports.updateCanvas = exports.deleteCanvasById = exports.createCanvas = exports.getCanvasById = exports.getAllCanvas = void 0;
const ContentModel_1 = __importDefault(require("../models/ContentModel"));
const uuid_1 = require("uuid");
const getAllCanvas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ContentModel_1.default.find();
        if (result) {
            console.log("sending result: ", result);
            res.status(200).send(result);
        }
    }
    catch (e) {
        res.sendStatus(500);
    }
});
exports.getAllCanvas = getAllCanvas;
const getCanvasById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield ContentModel_1.default.findOne({ id });
        if (result) {
            res.status(200).send(result);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (e) {
        res.sendStatus(404);
    }
});
exports.getCanvasById = getCanvasById;
const createCanvas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const canvasData = req.body.canvasData;
    const id = (0, uuid_1.v4)();
    try {
        const canvas = new ContentModel_1.default(Object.assign(Object.assign({}, canvasData), { id }));
        yield canvas.save();
        res.status(200).json(id);
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
});
exports.createCanvas = createCanvas;
const deleteCanvasById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield ContentModel_1.default.deleteOne({ id });
        res.status(200).json({ msg: "Canvas successfully deleted" });
    }
    catch (e) {
        console.error(e);
        res.sendStatus(400);
    }
});
exports.deleteCanvasById = deleteCanvasById;
const updateCanvas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { canvasData, id } = req.body;
    const protocolRegEx = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    if (canvasData === null || canvasData === void 0 ? void 0 : canvasData.elements) {
        for (let item of canvasData.elements) {
            const url = (_a = item.link) === null || _a === void 0 ? void 0 : _a.url;
            if (url && url.length > 0) {
                if (!url.match(protocolRegEx)) {
                    return res.status(400).json({ msg: "Invalid URL", url });
                }
            }
        }
    }
    try {
        canvasData.updatedAt = new Date().getTime();
        const result = yield ContentModel_1.default.updateOne({ id }, {
            $set: canvasData,
        });
        res.status(200).json({ result });
    }
    catch (error) {
        res.status(500).json({ msg: "server error" });
    }
});
exports.updateCanvas = updateCanvas;
//# sourceMappingURL=canvasController.js.map