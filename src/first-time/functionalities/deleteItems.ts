interface propsChild<T> {
  id: T;
  task: string;
}

type prop = propsChild<number>[];

type functiondef = (todo: prop, id: number) => prop;
export const deleteItem: functiondef = (todo, id) => {
  console.log(todo.filter((item) => item.id != id));

  return todo.filter((items) => items.id != id);
};
