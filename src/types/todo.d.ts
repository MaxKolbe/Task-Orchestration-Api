export interface Todo {
  updated_at: Date | null;
  created_at: Date;
  deleted_at: Date | null;
  id: string;
  task: string;
  isdone: boolean | null;
}

export interface Cursor {
  result: Todo[];
  cursor: Date | undefined;
}

export interface Todoservicetype<T> {
  getTodo(limit: number, skip: number): Promise<T[] | undefined>;
  getOneTodo(id: string): Promise<T | undefined>;
  getTodoCursor(limit: number, cursor: string): Promise<Cursor | undefined>;
  postTodo(task: string, isDone: boolean): Promise<T | undefined>;
  updateTodo(id: string, task: string, isDone: boolean): Promise<T | undefined>;
  deleteTodo(id: string): Promise<T | undefined>;
}
