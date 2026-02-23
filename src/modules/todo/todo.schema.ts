import * as p from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';

const timestamps = {
  updated_at: p.timestamp(),
  created_at: p.timestamp().defaultNow().notNull(),
  deleted_at: p.timestamp(),
};

export const todos = p.pgTable('todos', {
  id: p.uuid().primaryKey().notNull(),
  task: p.varchar({ length: 256 }).notNull(),
  isdone: p.boolean().default(false),
  ...timestamps,
}, (table) => [
  index("createdat_idx").on(table.created_at),
]);
