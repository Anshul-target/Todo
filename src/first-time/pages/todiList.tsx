// @flow
import React, { useReducer, useRef, useState } from "react";
import { add, prop } from "../functionalities/additems";
import { deleteItem } from "../functionalities/deleteItems";
import { editItem } from "../functionalities/editItem";

// React.FC is for props definition'

// When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

interface TodoElement<T> {
  id: T;
  task: string;
}

type TodoStructure = TodoElement<number>[];
const todo: prop = [
  {
    id: 0,
    task: "Brush",
  },
  {
    id: 1,
    task: "Doing breakfast",
  },
];
export const TodoList: React.FC<any | null> = (): JSX.Element => {
  const [task, dispatch] = useReducer<React.Reducer<prop | any, Actions>>(
    taskReducer,
    todo
  );
  // const [todos, setTodos] = useState(todo); //For rerendering purpose
  const [controlledInput, setInput] = useState(""); //Controlled input
  const [isEditing, setEdit] = useState(false);
  const inputRef: React.LegacyRef<HTMLInputElement> | null = useRef(null);
  const ids = useRef(-1);
  const handleClick = (id: any) => {
    inputRef.current?.focus();
    setEdit(true);
    ids.current = id;
  };
  return (
    <div>
      <h1>TODO List</h1>
      <label htmlFor="task">Add task:</label>
      <input
        ref={inputRef}
        value={controlledInput}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setInput(target.value)
        }
        style={{
          padding: "10px",
          margin: "10px",
          //   border: "none",
          borderRadius: "5px",
        }}
        type="text"
        id="task"
      ></input>
      <button
        onClick={() => {
          // !isEditing && setTodos(add<prop>(todos, controlledInput));
          !isEditing &&
            dispatch({
              type: "added",
              controlledInput,
            });
          // isEditing && setTodos(editItem(todos, ids.current, controlledInput));

          isEditing &&
            dispatch({
              type: "edited",
              controlledInput,
              id: ids.current,
            });

          setInput("");
          setEdit(false);
        }}
        type="button"
        style={{
          padding: "5px",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderRadius: "5px",
        }}
      >
        Add
      </button>
      {task.map((tasks: TodoElement<number>, idx: number) => {
        return (
          <div key={idx}>
            <input type="checkbox" id={`value${idx}`}></input>

            <label htmlFor={`value${idx}`} style={{ marginRight: "10px" }}>
              {tasks.task}
            </label>
            <button
              type="button"
              style={{ marginRight: "10px" }}
              onClick={() => handleClick(tasks.id)}
            >
              Edit
            </button>
            <button
              // onClick={() => setTodos(deleteItem(todos, task.id))}
              // type="button"
              onClick={() =>
                dispatch({
                  type: "deleted",
                  id: tasks.id,
                })
              }
              type="button"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

interface Actions {
  type: string;
  controlledInput?: string;
  id?: number;
}

function taskReducer(tasks: prop, action: Actions) {
  switch (action.type) {
    case "added": {
      if (typeof action.controlledInput == "string")
        return add(tasks, action.controlledInput);
      return tasks;
    }
    case "edited": {
      if (action.controlledInput && action.id) {
        return editItem(tasks, action.id, action.controlledInput);
      }
      return tasks;
    }

    case "deleted": {
      if (typeof action.id == "number") return deleteItem(tasks, action.id);
      return tasks;
    }
  }
}
