import express from "express";

import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  patchTodo,
} from "../controllers/todoController";

const router = express.Router();

router.get("/", getTodos);

router.post("/", addTodo);

router.put("/:id", updateTodo);

router.patch("/:id", patchTodo);

router.delete("/:id", deleteTodo);

export default router;
