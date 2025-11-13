import type { Request, Response } from "express"

// type Todo = Array<{id: number, task: string, isDone: boolean}>
interface Todo  {id: number, task: string, isDone: boolean}
const todos: Todo[] = [
    {id:1, task:"Pick up trash", isDone:false},
    {id:2, task:"Scrub the tub", isDone:false},
    {id:3, task:"Buy groceries", isDone:true}, 
    {id:4, task:"Call parents", isDone:true}
]

export const getTodo = (req: Request, res: Response) => {
    res.status(200).json({
        status: 200,
        message: "success",
        data: todos
    })
}

export const getOneTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const todo = todos.find((todo)=> todo.id === id)

    if(!todo){
        return res.status(400).json({status: 404, error: "Todo not found"})
    }
    
    res.status(200).json({
        status: 200,
        message: "success",
        data: todo
    })  
}

export const postTodo = (req: Request, res: Response) => {
    const newTodo: Todo = {id: todos.length + 1, task: req.body.task, isDone: false}
    todos.push(newTodo)
 
    res.status(201).json({
        status: 201,
        message: "success",
        data: newTodo 
    })
}

export const putTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const todo =  todos.find((t) => t.id === id) 

    if(!todo){
        return res.status(400).json({status: 404, error: "Todo not found"})
    }

    todo.task = req.body.task || todo.task
    todo.isDone = req.body.isDone ?? todo.isDone

    res.status(200).json({
        status: 200,
        message: "success",
        data: todo 
    })
} 

export const deleteTodo = (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const index =  todos.findIndex((t) => t.id === id)

    if(index === -1){
        return res.status(400).json({status: 404, error: "Todo not found"})
    }

    const todo = todos.splice(index, 1)

    res.status(200).json({
        status: 200, 
        message: "success",
        data: todos
    })
}
