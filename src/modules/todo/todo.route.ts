import { Router } from 'express';
import { vttbc, vttbu } from './todo.middleware';
import {
  getTodoController,
  getOneTodoController,
  getTodoControllerCursor,
  postTodoController,
  putTodoController,
  deleteTodoController,
  postPhotoController
} from '../todo/todo.controller';
import { upload } from '../../configs/multer.config'

const todoRouter = Router();

todoRouter.get('/todos', getTodoController);
todoRouter.get('/todos/cursor', getTodoControllerCursor);
todoRouter.get('/todos/todo/:id', getOneTodoController);
todoRouter.post('/todos', vttbc, postTodoController);
todoRouter.put('/todos/:id', vttbu, putTodoController);
todoRouter.delete('/todos/:id', deleteTodoController);
todoRouter.post('/photo', upload.single('avatar'), postPhotoController)

export default todoRouter;
