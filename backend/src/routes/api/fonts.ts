import * as express from "express";
import { getFonts } from "../../controllers/fontsController";

const router = express.Router();

// Route: GET /api/fonts/
// Desc:  Get fonts from Google Fonts API
router.get("/", getFonts);

export default router;
