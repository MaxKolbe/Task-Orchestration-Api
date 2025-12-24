import express from 'express';
import todoRouter from './modules/todo/todo.route.js';
import connectToDb from './configs/dbmg.config.js';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

const app = express();

const whitelist: string[] = ['http://localhost:3000', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) {
    if (whitelist.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, //Allow cookies/auth
};

app.use(express.json()); //For parsing JSON bodies (application/json)
app.use(express.urlencoded({ extended: true })); //For parsing URL-encoded form data (x-www-form-urlencoded)
app.use(cors(corsOptions)); // applies to all routes, input as argument in a route function to apply it to that route
app.use(express.static('public'));
app.set('views', 'views');

connectToDb();

app.use('/v1/todo', todoRouter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(`Internal Server Error: ${err.message} \n`);
  res.status(500).json({ success: false, message: err.message });
});

export default app;
