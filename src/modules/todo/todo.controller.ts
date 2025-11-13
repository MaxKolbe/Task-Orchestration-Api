import type { Request, Response } from "express"
import { getTodo, getOneTodo, postTodo, putTodo, deleteTodo } from "./todo.service.js"

export const getTodoController = (req: Request, res: Response) => {
    const response = getTodo()

    res.status(response.status).json(response)
}

export const getOneTodoController = (req: Request, res: Response) => {
    const { id } = req.params

    const response = getOneTodo(parseInt(id!))

    return res.status(response.status).json(response)
}

export const postTodoController = (req: Request, res: Response) => {
    const { task } = req.body
    
    const response = postTodo(task)

    return res.status(response.status).json(response) 
}

export const putTodoController = (req: Request, res: Response) => {
    const {id} = req.params
    const {task, isDone} = req.body

    const response = putTodo(parseInt(id!), task, isDone)

    return res.status(response.status).json(response)
} 

export const deleteTodoController = (req: Request, res: Response) => {
    const {id} = req.params
    
    const response = deleteTodo(parseInt(id!))

    return res.status(response.status).json(response)
}