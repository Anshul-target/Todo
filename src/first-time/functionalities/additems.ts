interface propsChild<T> {
  id: T;
  task: string;
}

export type prop = propsChild<number>[];

export const add = <T>(todo: prop, controlletinput: string) => {
  console.log([...todo, { id: todo.length, task: controlletinput }]);

  return [...todo, { id: todo.length, task: controlletinput }];
};
