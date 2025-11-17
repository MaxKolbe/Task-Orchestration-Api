import type { Request, Response } from "express"
import { getTodo, getOneTodo, postTodo, putTodo, deleteTodo } from "./todo.service.js"

export const getTodoController = async (req: Request, res: Response) => {
    const response = await getTodo()

    res.status(response.status).json(response)
}

export const getOneTodoController = async (req: Request, res: Response) => {
    const { id } = req.params

    const response = await getOneTodo(parseInt(id!))

    return res.status(response.status).json(response)
}

export const postTodoController = async (req: Request, res: Response) => {
    const { task } = req.body
    
    const response = await postTodo(task)

    return res.status(response.status).json(response) 
}

export const putTodoController = async (req: Request, res: Response) => {
    const {id} = req.params
    const {task, isDone} = req.body 

    const response = await putTodo(id!, task, isDone)

    return res.status(response.status).json(response)
}  
 
export const deleteTodoController = async (req: Request, res: Response) => {
    const {id} = req.params
    
    const response = await deleteTodo(id!)

    return res.status(response.status).json(response)
}