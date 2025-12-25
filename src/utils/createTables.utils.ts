import pool from '../configs/dbpg.config.js';

export const createTodoTable = async () => {
  const query: string = `
    CREATE TABLE IF NOT EXISTS todo (
    id UUID PRIMARY KEY NOT NULL, 
    task VARCHAR(150) NOT NULL, 
    is_done BOOLEAN, 
    created_at TIMESTAMP
  );`;

  try {
    await pool.query(query);
    console.log('Table "todo" created');
  } catch (err) {
    console.log('error creating users table', err);
  }
};
