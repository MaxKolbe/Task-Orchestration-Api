import { createClient } from 'redis';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const redisClient = createClient(/*{url: process.env.REDIS_URL! //Leave blank if connecting to localhost }*/);

redisClient.on('error', (err) => {
  console.log('Redis Client Error', err);
});

export async function connectRedis() {
  await redisClient.connect();

  await redisClient.set('foo', 'bar');
  console.log('Redis Client connected');
}

export default redisClient;
