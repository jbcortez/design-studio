import * as express from "express";
import {
  addCustomColor,
  addTheme,
  deleteCustomColor,
  getCustomColors,
  getTheme,
} from "../../controllers/themeController";

const router = express.Router();

// Route: GET /api/theme/
router.get("/", getTheme);

// Route: POST /api/theme/add-theme
router.post("/add-theme", addTheme);

// Route: GET /api/theme/custom
router.get("/custom", getCustomColors);

// Route: POST /api/theme/custom
router.post("/custom", addCustomColor);

// Route: DELETE /api/theme/custom/delete/id
router.delete("/custom/delete/:id", deleteCustomColor);

export default router;
