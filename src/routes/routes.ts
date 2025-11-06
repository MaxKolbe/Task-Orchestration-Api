import { Router } from "express"
import { getTodo, getOneTodo, postTodo, putTodo, deleteTodo } from "../controllers/todoController.js"

const router = Router()

router.get("/", getTodo)
router.get("/:id", getOneTodo)
router.post("/", postTodo)
router.put("/:id", putTodo)
router.delete("/:id", deleteTodo)

export default router 