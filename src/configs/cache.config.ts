import { createClient } from 'redis';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'), 
});

const redisMap = new Map([
  ['test', process.env.REDIS_TEST_URL!],
  ['development', process.env.REDIS_DEV_URL!],
  ['production', process.env.REDIS_URL!],
]);
const redisUrl = redisMap.get(process.env.NODE_ENV!);

const redisClient = createClient({url: redisUrl!})

redisClient.on('error', (err) => { 
  console.log('Redis Client Error', err);
}); 

export async function connectRedis() {
  await redisClient.connect();

  await redisClient.set('foo', 'bar');
  console.log('Redis Client connected');
}

export default redisClient;
