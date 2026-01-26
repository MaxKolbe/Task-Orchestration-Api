import redisClient from '../configs/cache.config.js';

export async function delPattern(pattern: string) {
  try {
    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(keys);
    }

    console.log("shit's been deleted")
  } catch (err) {
    console.log("There was an error deleting cache", err)
  }
}
