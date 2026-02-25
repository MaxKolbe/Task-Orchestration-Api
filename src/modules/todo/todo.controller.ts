import type { Request, Response, NextFunction } from 'express';
import { Todoservice } from './todo.service';
import responseHandler from '../../utils/responseHandler.util';
import appdb from '../../configs/db.config';
import cloudinary from '../../configs/cloudinary.config';

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

export const postPhotoController = async (req: Request, res: Response, next: NextFunction) => {
  /* const options = {
    use_filename: true, // Sets the public ID to the filename of the uploaded file.
    unique_filename: true, // apply random characters to the public ID
    overwrite: true, // Overwrites any image with the same public ID on upload.
    // asset_folder: "" // The full path of the folder where the asset is placed within the Cloudinary repository. If not specified, the uploaded asset will be located in the root of your product environment asset repository
  }; */

  if (!req.file) {
    return responseHandler(res, 400, 'No file. Check input fields');
  }
 
  try {
    // when storing file to disk
    /* const uploadResult = await cloudinary.uploader.upload(req.file!.path, options); */

    // when storing file to memory
    await console.log(req.file.buffer) 
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file?.buffer);
    });

    // In app would sotre uploadresult.url to db
    console.log(uploadResult);
    return responseHandler(res, 201, 'uploaded successfully');
  } catch (err) {
    next(err);
  }
};
