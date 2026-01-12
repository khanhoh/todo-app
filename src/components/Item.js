import { useDispatch } from "react-redux";
import { todosAction } from "../store/todosSlice";
import { useState } from "react";

export function Item({ todo }) {
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [isEditting, setIsEditting] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(todosAction.removeTodoFetch(todo));
  };

  const handleEdit = () => {
    setIsEditting((edit) => !edit);
  };

  const handleSaveTitle = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
    if (todoTitle !== todo.title) {
      dispatch(todosAction.editTodoFetch({ ...todo, title: todoTitle }));
    }
  };

  const handleTick = () => {
    dispatch(todosAction.editTodoFetch({ ...todo, completed: !todo.completed }));
  }

  return (
    <li className="todo-item">
      {!isEditting ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={handleTick}
          ></input>
          <label onDoubleClick={handleEdit}>{todo.title}</label>
          <button content="Delete" className="destroy" onClick={handleDelete}>
            X
          </button>
        </div>
      ) : (
        <input
          className="edit"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleSaveTitle}
          autoFocus
        ></input>
      )}
    </li>
  );
}
