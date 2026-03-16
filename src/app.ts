import express from 'express';
import cors from 'cors';
import todoRouter from './modules/todo/todo.route.js';
import errorHandler from './middlewares/errorHandler.js';
import paymentRouter from './modules/payment/payment.route.js';
// import {connectRedis} from "./configs/cache.config"

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

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //For parsing URL-encoded form data (x-www-form-urlencoded)
app.use(cors(corsOptions)); // applies to all routes, input as argument in a route function to apply it to that route
app.use(express.static('public'));
app.set('views', 'views');

// connectRedis();

app.use('/v1', todoRouter);
app.use('/v1/pay', paymentRouter);

app.use(errorHandler);

export default app;
