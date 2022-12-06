"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongo_1 = require("./config/mongo");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const fonts_1 = __importDefault(require("./routes/api/fonts"));
const canvas_1 = __importDefault(require("./routes/api/canvas"));
const theme_1 = __importDefault(require("./routes/api/theme"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
(0, mongo_1.connectDB)();
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "frontend", "build")));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use("/api/canvas", canvas_1.default);
app.use("/api/fonts", fonts_1.default);
app.use("/api/theme", theme_1.default);
app.use((req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "frontend", "build", "index.html"));
});
process.on("SIGINT", () => {
    mongoose_1.default.connection.close(function () {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
    });
});
app.listen(PORT, () => console.log(`listening on ${PORT}.`));
//# sourceMappingURL=index.js.map