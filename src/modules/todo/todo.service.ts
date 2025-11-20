import TodoModel from './todo.model.js';

export const getTodo = async () => {
  const todos = await TodoModel.find();

  return {
    status: 200,
    message: 'Todos found successfully',
    data: todos,
  };
};

export const getOneTodo = async (id: number) => {
  const todo = await TodoModel.findById(id);

  if (!todo) {
    return {
      status: 404,
      error: 'Todo not found',
    };
  }

  return {
    status: 200,
    message: 'Todo found successfully',
    data: todo,
  };
};

export const postTodo = async (task: string) => {
//   const todosLength = (await TodoModel.find()).length;

  const newTodo = await TodoModel.create({
    uid: Math.floor(Math.random() * 10000),
    task,
    isDone: false,
  });

  await newTodo.save();
  const todos = await TodoModel.find();

  return {
    status: 201,
    message: 'Todo created successfully',
    data: todos,
  };
};

export const putTodo = async (id: string, task: string, isDone?: boolean) => {
  const todo = await TodoModel.findById(id);

  if (!todo) {
    return {
      status: 404,
      error: 'Todo not found',
    };
  }

  todo.task = task || todo.task;
  todo.isDone = isDone ?? todo.isDone;
  await todo.save();

  return {
    status: 200,
    message: 'success',
    data: todo,
  };
};

export const deleteTodo = async (id: string) => {
  const todo = await TodoModel.findById(id);

  if (!todo) {
    return {
      status: 404,
      error: 'Todo not found',
    };
  }

  await TodoModel.findByIdAndDelete(id);

  return {
    status: 200,
    message: 'Successfully deleted todo',
  };
};
