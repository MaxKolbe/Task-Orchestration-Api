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

todoRouter.get('/', getTodoController);
todoRouter.get('/todos', getTodoControllerCursor); //cursor based pagination
todoRouter.get('/todo/:id', getOneTodoController);
todoRouter.post('/', vttbc, postTodoController);
todoRouter.put('/:id', vttbu, putTodoController);
todoRouter.delete('/:id', deleteTodoController);

export default todoRouter;
