import { Todocursor } from '../types/todo.d.js';

export function encodeCursor(cursor: Todocursor): string {
  return Buffer.from(JSON.stringify(cursor)).toString('base64');
}

export function decodeCursor(cursor: string): Todocursor {
  return JSON.parse(Buffer.from(cursor, 'base64').toString());
}
