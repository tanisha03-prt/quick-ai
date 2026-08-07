import express from "express";
import {
  writeArticle,
  writeBlogTitles,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/write-article", writeArticle);
aiRouter.post("/blog-titles", writeBlogTitles);

export default aiRouter;