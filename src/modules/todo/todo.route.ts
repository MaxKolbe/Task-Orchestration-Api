import { Router } from "express"
import { getTodoController, getOneTodoController, postTodoController, putTodoController, deleteTodoController } from "../todo/todo.controller.js"

const todoRouter = Router()

todoRouter.get("/", getTodoController)
todoRouter.get("/:id", getOneTodoController)
todoRouter.post("/", postTodoController)
todoRouter.put("/:id", putTodoController)
todoRouter.delete("/:id", deleteTodoController)

export default todoRouter 