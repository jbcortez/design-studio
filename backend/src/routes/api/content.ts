import * as express from "express";
import {
  createContentPost,
  deleteContentById,
  getAllContent,
  getContentById,
  updateContent,
} from "../../controllers/contentController";

const router = express.Router();

// Route: GET /api/content/all
router.get("/all", getAllContent);

// Route: GET /api/content/:id
router.get("/:id", getContentById);

// Route: POST /api/content/create
router.post("/create", createContentPost);

// Route: PUT /api/content/update
router.put("/update", updateContent);

// Route: DELETE /api/content/delete/:id
router.delete("/delete/:id", deleteContentById);

export default router;
