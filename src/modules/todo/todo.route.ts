import { Router } from 'express';
import { validateTodosToCreate, validateTodosToUpdate } from './todo.middleware.js';
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
todoRouter.post('/', validateTodosToCreate, postTodoController);
todoRouter.put('/:id', validateTodosToUpdate, putTodoController);
todoRouter.delete('/:id', deleteTodoController);

export default todoRouter;
