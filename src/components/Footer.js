import { useDispatch, useSelector } from "react-redux";
import { todosAction } from "../store/todosSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const handleStatusChange = (filter) => {
    dispatch(todosAction.filterTodo(filter));
  };

  const currentFilter = useSelector((state) => state.todos.status);
  console.log(currentFilter);
  return (
    <footer>
      <ul>
        <li>
          <button
            className={
              (currentFilter === "All" || currentFilter === "") ? "selected" : ""
            }
            onClick={() => handleStatusChange("All")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={currentFilter === "Active" ? "selected" : ""}
            onClick={() => handleStatusChange("Active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={currentFilter === "Completed" ? "selected" : ""}
            onClick={() => handleStatusChange("Completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    </footer>
  );
}
