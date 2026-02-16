import { Router } from "express";
import { createPost } from "../controller/post.controller.js";

const router = Router();

router.post('/create', createPost);

export default router;