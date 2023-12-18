// @flow
import React, { useState } from "react";
import { add, prop } from "../functionalities/additems";
import { deleteItem } from "../functionalities/deleteItems";

// React.FC is for props definition
interface TodoElement<T> {
  id: T;
  task: string;
}

type TodoStructure = TodoElement<number>[];
const todo: TodoStructure = [
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
  const [todos, setTodos] = useState(todo); //For rerendering purpose
  const [controlledInput, setInput] = useState(""); //Controlled input
  const [isEditing, setEdit] = useState(false);
  return (
    <div>
      <h1>TODO List</h1>
      <label htmlFor="task">Add task:</label>
      <input
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
          setTodos(add<prop>(todos, controlledInput));
          setInput("");
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
      {todos.map((task, idx) => {
        return (
          <div key={idx}>
            <input type="checkbox" id={`value${idx}`}></input>
            {/* style={{ marginRight: "10px" }} */}
            <label htmlFor={`value${idx}`} style={{ marginRight: "10px" }}>
              {task.task}
            </label>
            <button type="button" style={{ marginRight: "10px" }}>
              Edit
            </button>
            <button
              onClick={() => setTodos(deleteItem(todos, task.id))}
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
