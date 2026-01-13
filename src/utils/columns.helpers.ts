import * as p from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: p.timestamp(),
  created_at: p.timestamp().defaultNow().notNull(),
  deleted_at: p.timestamp(),
}