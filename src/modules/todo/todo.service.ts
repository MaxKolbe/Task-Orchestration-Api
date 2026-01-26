import appdb from '../../configs/db.config.js';
import redisClient from '../../configs/cache.config.js';
import { todos } from './todo.schema.js';
import { sql, eq, asc } from 'drizzle-orm';
import { Todo, Todoservicetype, Cursor } from '../../types/todo.d.js';
import { encodeCursor, decodeCursor } from '../../utils/codec.js';
import { delPattern } from '../../utils/delkeys.js';

export class Todoservice implements Todoservicetype<Todo> {
  constructor(private readonly newdb = appdb) {}

  async getTodo(limit: number, skip: number): Promise<Todo[] | undefined> {
    const key = `api:get:todos:${skip}`;
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const result = await this.newdb
      .select()
      .from(todos)
      .orderBy(asc(todos.created_at), asc(todos.id))
      .limit(limit)
      .offset(skip);

    await redisClient.setEx(key, 3600, JSON.stringify(result));

    return result;
  }

  async getOneTodo(id: string): Promise<Todo | undefined> {
    const key = `api:get:todo:${id}`;
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const result = await this.newdb.select().from(todos).where(eq(todos.id, id));
    await redisClient.setEx(key, 3600, JSON.stringify(result[0]));

    return result[0];
  }

  async getTodoCursor(limit: number, cursor?: string): Promise<Cursor | undefined> {
    const key = `api:get:todos:todoscursor:${cursor}`;
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    if (!cursor) {
      const result = await this.newdb.select().from(todos).orderBy(asc(todos.created_at), asc(todos.id)).limit(limit);

      await redisClient.setEx(
        key,
        3600,
        JSON.stringify({
          result,
          cursor: encodeCursor({
            created_at: result[result.length - 1]?.created_at,
            id: result[result.length - 1]?.id,
          }),
        }),
      );

      return {
        result,
        cursor: encodeCursor({
          created_at: result[result.length - 1]?.created_at,
          id: result[result.length - 1]?.id,
        }),
      };
    }

    const { created_at, id } = decodeCursor(cursor);
    const result = await this.newdb
      .select()
      .from(todos)
      .orderBy(asc(todos.created_at), asc(todos.id))
      .where(
        sql`${todos.created_at} > ${created_at} 
        OR (
        ${todos.created_at} = ${created_at} AND ${todos.id} > ${id}
        )`,
      )
      .limit(limit);

    await redisClient.setEx(
      key,
      3600,
      JSON.stringify({
        result,
        cursor: encodeCursor({
          created_at: result[result.length - 1]?.created_at,
          id: result[result.length - 1]?.id,
        }),
      }),
    );

    return {
      result,
      cursor: encodeCursor({
        created_at: result[result.length - 1]?.created_at,
        id: result[result.length - 1]?.id,
      }),
    };
  }

  async postTodo(task: string, isDone: boolean): Promise<Todo | undefined> {
    const result = await this.newdb
      .insert(todos)
      .values({ id: sql`uuid_generate_v4()`, task, isdone: isDone })
      .returning();
    return result[0];
  }

  async updateTodo(id: string, task: string, isDone: boolean): Promise<Todo | undefined> {
    const result = await this.newdb.update(todos).set({ task, isdone: isDone }).where(eq(todos.id, id)).returning();

    await redisClient.del(`api:get:todo:${id}`);

    return result[0];
  }

  async deleteTodo(id: string): Promise<Todo | undefined> {
    const result = await this.newdb.delete(todos).where(eq(todos.id, id)).returning();

    await redisClient.del(`api:get:todo:${id}`);
    await delPattern(`api:get:todos:*`)

    return result[0];
  }
}
