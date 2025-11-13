import { todos } from "../../configs/db.js"
import type { Todo } from "../../types/todoTypes.js"

export const getTodo = () => {
    return {
        status: 200,
        message: "Todos found successfully",
        data: todos
    } 
}

export const getOneTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id)

    if(!todo) {
        return {
            status: 404, 
            error: "Todo not found"
        }
    }
    
    return {
        status: 200,
        message: "Todo found successfully",
        data: todo
    } 
}

export const postTodo = (task: string) => {
    const newTodo: Todo = {id: todos.length + 1, task, isDone: false}
    todos.push(newTodo)

    return {
        status: 201,
        message: "Todo created successfully",
        data: todos
    } 
}

export const putTodo = (id: number, task: string, isDone?: boolean) => {
    const todo =  todos.find((t) => t.id === id)

    if(!todo){
        return {
            status: 404, 
            error: "Todo not found"
        }
    }
    
    todo.task = task || todo.task
    todo.isDone = isDone ?? todo.isDone
    
    return {
        status: 200,
        message: "success",
        data: todo 
    }
}

export const deleteTodo = (id: number) => {
    const index = todos.findIndex((t) => t.id === id)

    if(index === -1){
        return {
            status: 404, 
            error: "Todo not found"
        }
    }

    const todo = todos.splice(index, 1)

    return {
        status: 200, 
        message: "Successfully deleted todo",
        data: todos
    }
}