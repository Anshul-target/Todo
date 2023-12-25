// @flow
import React, { useEffect, useReducer, useRef, useState } from "react";
import { add, prop } from "../util/additems";
import { deleteItem } from "../util/deleteItems";
import { editItem } from "../util/editItem";

// React.FC is for props definition'

// When you want a component to “remember” some information, but you don’t want that information to trigger new renders, you can use a ref.

interface TodoElement<T> {
  id: T;
  task: string;
}

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
  const [controlledInput, setInput] = useState({ value: "", type: "added" }); //Controlled input
  const [isEditing, setEdit] = useState(false);
  const inputRef: React.LegacyRef<HTMLInputElement> | null = useRef(null);
  const ids = useRef(-1);
  useEffect(() => {
    isEditing && setInput({ ...controlledInput, type: "edited" });
  }, [isEditing, controlledInput]);

  const handleClick = (id: any) => {
    !isEditing && setEdit(true);
    setInput({ ...controlledInput, type: "edited" });
    ids.current = id;
    isEditing &&
      dispatch({
        type: controlledInput.type,
        controlledInput: controlledInput.value,
        id: ids.current,
      });

    if (isEditing) {
      setEdit(false);
      setInput({ ...controlledInput, type: "added", value: "" });
    }
  };
  return (
    <div>
      <h1>TODO List</h1>
      <label htmlFor="task">Add task:</label>
      <input
        ref={inputRef}
        value={controlledInput.type === "added" ? controlledInput.value : ""}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          if (controlledInput.type === "added") {
            setInput({ ...controlledInput, value: target.value });
          }
        }}
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
          dispatch({
            type: controlledInput.type,
            controlledInput: controlledInput.value,
          });
          setInput({ ...controlledInput, value: "" });
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
            {isEditing && ids.current === idx ? (
              <input
                style={{ marginRight: "10px" }}
                type="text"
                value={controlledInput.value}
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                  setInput({ ...controlledInput, value: target.value })
                }
              ></input>
            ) : (
              <input type="checkbox" id={`value${idx}`}></input>
            )}

            {isEditing && ids.current === idx ? (
              <></>
            ) : (
              <label htmlFor={`value${idx}`} style={{ marginRight: "10px" }}>
                {tasks.task}
              </label>
            )}
            <button
              type="button"
              style={{ marginRight: "10px" }}
              onClick={() => handleClick(tasks.id)}
            >
              Edit
            </button>
            <button
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
      if (action.controlledInput && typeof action.id == "number") {
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
