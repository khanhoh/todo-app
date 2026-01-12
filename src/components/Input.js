import { useDispatch } from "react-redux";
import { todosAction } from "../store/todosSlice";
import { useState } from "react";

export function Input() {
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  const handleAddTodo = (e) => {
    const trimmedText = textInput.trim();
    if (e.key === "Enter" && trimmedText) {
      const todo = {
        id: Date.now(),
        title: trimmedText,
        completed: false,
        createdAt: new Date().toISOString()
      };
      dispatch(todosAction.addTodoFetch(todo));
      setTextInput("");
    }
  };
  const handleText = (e) => {
    setTextInput(e.target.value);
  };
  return (
    <input
      placeholder="What need to be done"
      className="todo-input"
      value={textInput}
      onKeyDown={handleAddTodo}
      onChange={(e) => handleText(e)}
    ></input>
  );
}
