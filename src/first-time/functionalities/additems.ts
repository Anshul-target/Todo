interface propsChild<T> {
  id: T;
  task: string;
}

export type prop = propsChild<number>[];

export const add = <T>(todo: prop, controlletinput: string) => {
  return [...todo, { id: todo.length, task: controlletinput }];
};
