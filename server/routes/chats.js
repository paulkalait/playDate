import express from "express";
import { createChat, deleteChat, findChat, userChats } from "../controllers/chat.js";

const router = express.Router()


router.post("/", createChat)
// router.get("/:id", getChat)
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)
router.delete("/:id", deleteChat)

export default router