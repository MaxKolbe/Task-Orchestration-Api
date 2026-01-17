import pool from '../../configs/dbpg.config.js';

export class Todoservice {
  constructor(readonly db = pool) {}

  async getTodo(limit: number, skip: number) {
    const query = `
      SELECT * FROM todo
      OFFSET ${skip}
      LIMIT ${limit}
    `;

    const todos = await this.db.query(query);
    return todos.rows;
  }

  async getOneTodo(id: string) {
    const query = `
      SELECT * FROM todo 
      WHERE id = $1
    `;

    const todo = await this.db.query(query, [id]);
    return todo.rows[0];
  }

  async postTodo(task: string, isDone: boolean) {
    const query = `
      INSERT INTO todo (id, task, is_done, created_at) 
      VALUES (uuid_generate_v4(), $1, COALESCE($2, false), NOW()) 
      RETURNING * 
    `; // RETURNING * returns the affected row

    const todo = await this.db.query(query, [task, isDone]);
    return todo.rows[0];
  }

  async updateTodo(id: string, task: string, isDone: boolean) {
    const updateFields: (string | boolean)[] = [id];
    const updateString: string[] = [];
    let index = 1;

    if (task !== undefined) {
      index++;
      updateFields.push(task);
      updateString.push(`task = $${index}`);
    }

    if (isDone !== undefined) {
      index++;
      updateFields.push(isDone);
      updateString.push(`is_done = $${index}`);
    }

    //.join() returns a string btw
    const query = `
      UPDATE todo
      SET ${updateString.join(', ')} 
      WHERE id = $1
      RETURNING *
    `;

    const updatedTodo = await this.db.query(query, updateFields);
    return updatedTodo.rows[0];
  }

  async deleteTodo(id: string) {
    // RETURNING * returns the affected row
    const query = `
    DELETE FROM todo
    WHERE id = $1 
    RETURNING *
    `;

    const todo = await this.db.query(query, [id]);
    return todo.rows[0];
  }
}