import { useDispatch, useSelector } from "react-redux";
import { Item } from "./Item";
import { selectAllTodos, todosAction } from "../store/todosSlice";
import { useEffect } from "react";

export function Main() {
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const filter = useSelector((state) => state.todos.status);
  useEffect(() => {
    dispatch(todosAction.getTodosFetch());
  }, [dispatch]);  

  let todosFilter = todos;
  if (filter === "Active") {
    todosFilter = todosFilter.filter((todo) => todo.completed === false);
  } else if (filter === "Completed") {
    todosFilter = todosFilter.filter((todo) => todo.completed === true);
  } else {
    todosFilter = todos;
  }
  return (
    <section className="todo-list">
      <ul id="listPad">
        {todosFilter &&
          todosFilter.map((todo) => <Item key={todo.id} todo={todo} />)}
      </ul>
    </section>
  );
}
