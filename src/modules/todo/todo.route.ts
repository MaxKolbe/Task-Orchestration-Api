import { Router } from "express"
import { getTodo, getOneTodo, postTodo, putTodo, deleteTodo } from "../todo/todo.controller.js"

const todoRouter = Router()

todoRouter.get("/", getTodo)
todoRouter.get("/:id", getOneTodo)
todoRouter.post("/", postTodo)
todoRouter.put("/:id", putTodo)
todoRouter.delete("/:id", deleteTodo)

export default todoRouter 