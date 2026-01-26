import { Router } from 'express';
import { vttbc, vttbu } from './todo.middleware.js';
import {
  getTodoController,
  getOneTodoController,
  getTodoControllerCursor,
  postTodoController,
  putTodoController,
  deleteTodoController,
} from '../todo/todo.controller.js';

const todoRouter = Router();

todoRouter.get('/todos', getTodoController);
todoRouter.get('/todos/cursor', getTodoControllerCursor);
todoRouter.get('/todos/todo/:id', getOneTodoController);
todoRouter.post('/todos', vttbc, postTodoController);
todoRouter.put('/todos/:id', vttbu, putTodoController);
todoRouter.delete('/todos/:id', deleteTodoController);

export default todoRouter;
