import appdb from '../../configs/db.config.js';
import { todos } from './todo.schema.js';
import { sql, eq, asc } from 'drizzle-orm';
import { Todo, Todoservicetype, Cursor, Todocursor } from '../../types/todo.d.js';

function encodeCursor(cursor: Todocursor): string {
  return Buffer.from(JSON.stringify(cursor)).toString('base64');
}
function decodeCursor(cursor: string): Todocursor {
  return JSON.parse(Buffer.from(cursor, 'base64').toString());
}

export class Todoservice implements Todoservicetype<Todo> {
  constructor(private readonly newdb = appdb) {}

  async getTodo(limit: number, skip: number): Promise<Todo[] | undefined> {
    const result = await this.newdb.select().from(todos).orderBy(asc(todos.task)).limit(limit).offset(skip);
    return result;
  }

  async getOneTodo(id: string): Promise<Todo | undefined> {
    const result = await this.newdb.select().from(todos).where(eq(todos.id, id));
    return result[0];
  }

  async getTodoCursor(limit: number, cursor?: string): Promise<Cursor | undefined> {
    if (!cursor) {
      const result = await this.newdb.select().from(todos).orderBy(asc(todos.created_at), asc(todos.id)).limit(limit); 
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
    return result[0];
  }

  async deleteTodo(id: string): Promise<Todo | undefined> {
    const result = await this.newdb.delete(todos).where(eq(todos.id, id)).returning();
    return result[0];
  }
}
