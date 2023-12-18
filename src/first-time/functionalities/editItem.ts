interface propItem<T> {
  id: T;
  task: string;
}

type prop = propItem<number>[];

export const editItem = (todo: prop, id: number, task: string) => {
  const idxOfTodo = todo.findIndex((todo) => todo.id === id);

  if (idxOfTodo !== -1) {
    todo.splice(idxOfTodo, 1, { task, id });

    return todo;
  }
  return todo;
};
