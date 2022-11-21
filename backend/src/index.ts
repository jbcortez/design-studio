import express from "express";
import path from "path";
import { connectDB } from "./config/mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import fontsRoute from "./routes/api/fonts";
import contentRoutes from "./routes/api/content";
import themeRoutes from "./routes/api/theme";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

connectDB();

// app.use(express.static(path.join(__dirname, "..", "..", "frontend", "build")));
app.use(express.static("public"));
app.use(express.json());
app.use(express.text());
app.use(helmet());

app.use("/api/cta", contentRoutes);
app.use("/api/fonts", fontsRoute);
app.use("/api/theme", themeRoutes);

// Last route to default to react router
// app.use((req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "..", "frontend", "build", "index.html")
//   );
// });

process.on("SIGINT", () => {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}.`));
