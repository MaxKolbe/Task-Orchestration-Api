import { Router } from 'express';
import { validateTodos } from './todo.middleware.js';
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
todoRouter.post('/', validateTodos, postTodoController);
todoRouter.put('/:id', putTodoController);
todoRouter.delete('/:id', deleteTodoController);

export default todoRouter;
