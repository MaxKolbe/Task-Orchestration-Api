import type { Request, Response, NextFunction } from 'express';
import { Todoservice } from './todo.service.js';
import responseHandler from '../../utils/responseHandler.util.js';
import appdb from '../../configs/db.config.js';

const Todo = new Todoservice(appdb);

export const getTodoController = async (req: Request, res: Response, next: NextFunction) => {
  const s = Number(req.query.s) || 0;
  const skip = 5 * s;
  try {
    const response = await Todo.getTodo(5, skip);
    responseHandler(res, 200, 'success', response);
  } catch (err) {
    next(err);
  }
};

export const getOneTodoController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const response = await Todo.getOneTodo(id!);
    if (!response) responseHandler(res, 404, 'todo not found');
    responseHandler(res, 200, 'success', response);
  } catch (err) {
    next(err);
  }
};

export const getTodoControllerCursor = async (req: Request, res: Response, next: NextFunction) => {
  const cursor = req.query.cursor ? req.query.cursor.toString() : undefined;
  try {
    const response = await Todo.getTodoCursor(5, cursor);
    responseHandler(res, 200, 'success', response);
  } catch (err) {
    next(err);
  }
};

export const postTodoController = async (req: Request, res: Response, next: NextFunction) => {
  const { task, isDone } = req.body;
  try {
    const response = await Todo.postTodo(task, isDone);
    if (!response) responseHandler(res, 404, 'todo not created');
    responseHandler(res, 201, 'success', response);
  } catch (err) {
    next(err);
  }
};

export const putTodoController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { task, isDone } = req.body;
  try {
    const response = await Todo.updateTodo(id!, task, isDone);
    if (!response) responseHandler(res, 404, 'todo not updated');
    responseHandler(res, 200, 'success', response);
  } catch (err) {
    next(err);
  }
};

export const deleteTodoController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const response = await Todo.deleteTodo(id!);
    if (!response) responseHandler(res, 404, 'todo not deleted');
    responseHandler(res, 200, 'success', response);
  } catch (err) {
    next(err);
  }
};
