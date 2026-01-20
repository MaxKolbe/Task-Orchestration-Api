import appdb from '../../configs/db.config.js';
import { todos } from './todo.schema.js';
import { sql, eq, asc } from 'drizzle-orm';
import { Todo, Todoservicetype } from '../../types/todo.d.js';

export class Todoservice implements Todoservicetype<Todo> {
  constructor(private readonly newdb = appdb) {}

  async getTodo(limit: number, skip: number): Promise<Todo[] | undefined>  {
    const result = await this.newdb.select().from(todos).orderBy(asc(todos.task)).limit(limit).offset(skip);
    return result;
  }

  async getOneTodo(id: string): Promise<Todo | undefined> {
    const result = await this.newdb.select().from(todos).where(eq(todos.id, id));
    return result[0];
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
