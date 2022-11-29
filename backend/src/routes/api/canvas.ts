import * as express from "express";
import {
  createCanvas,
  getAllCanvas,
  getCanvasById,
  updateCanvas,
  deleteCanvasById,
} from "../../controllers/canvasController";

const router = express.Router();

// Route: GET /api/canvas/all
router.get("/all", getAllCanvas);

// Route: GET /api/canvas/:id
router.get("/:id", getCanvasById);

// Route: POST /api/canvas/create
router.post("/create", createCanvas);

// Route: PUT /api/canvas/update
router.put("/update", updateCanvas);

// Route: DELETE /api/canvas/delete/:id
router.delete("/delete/:id", deleteCanvasById);

export default router;
