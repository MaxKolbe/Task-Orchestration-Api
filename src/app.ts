import express from 'express';
import todoRouter from './modules/todo/todo.route.js';
import connectToDb from './configs/db.js';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json()); //For parsing JSON bodies (application/json)
app.use(express.urlencoded({ extended: true })); //For parsing URL-encoded form data (x-www-form-urlencoded)
app.use(express.static('public'));
app.set('views', 'views');

connectToDb();

app.use('/v1/todo', todoRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`Internal Server Error: ${err} \n`);
  // res.status(500).json({message: 'Internal Server Error', error: err})
});

export default app;
