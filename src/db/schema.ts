import * as p from 'drizzle-orm/pg-core';

const timestamps = {
  updated_at: p.timestamp(),
  created_at: p.timestamp().defaultNow().notNull(),
  deleted_at: p.timestamp(),
}

export const todos = p.pgTable('todos', {
  id: p.integer().primaryKey().generatedAlwaysAsIdentity(),
  task: p.varchar({ length: 256 }),
  isdone: p.boolean().default(false),
  ...timestamps, 
});

export const referenceTable = p.pgTable('references', {
  int: p.integer(),
  int1: p.integer().default(10),
  int2: p.integer().notNull(),
  boolean: p.boolean(),
  text: p.text(),
  varchar1: p.varchar(),
  varchar2: p.varchar({ length: 256 }),
  char1: p.char(),
  char2: p.char({ length: 256 }),
  numeric1: p.numeric(),
  numeric2: p.numeric({ precision: 100 }),
  numeric3: p.numeric({ precision: 100, scale: 20 }),
  json1: p.json(),
  json2: p.json().default({ foo: 'bar' }),
  jsonb1: p.jsonb(),
  jsonb2: p.jsonb().default({ foo: 'bar' }),
  uuid1: p.uuid(), // "uuid1" uuid
  uuid2: p.uuid().defaultRandom(), // "uuid2" uuid default gen_random_uuid()
  time1: p.time(),
  date: p.date(),
  timestamp1: p.timestamp(),
});
