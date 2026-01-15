import { Router } from 'express';
import { vttbc, vttbu } from './todo.middleware.js';
import {
  getTodoController,
  getOneTodoController,
  postTodoController,
  putTodoController,
  deleteTodoController,
} from '../todo/todo.controller.js';

const todoRouter = Router();

todoRouter.get('/', getTodoController);
todoRouter.get('/:id', getOneTodoController);
todoRouter.post('/', vttbc, postTodoController);
todoRouter.put('/:id', vttbu, putTodoController);
todoRouter.delete('/:id', deleteTodoController);

export default todoRouter;
