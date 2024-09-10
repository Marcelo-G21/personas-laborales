import { createClient } from 'redis';
import 'dotenv/config';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis is connected');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
};
