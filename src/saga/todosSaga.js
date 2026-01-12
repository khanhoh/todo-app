import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { todosAction } from "../store/todosSlice";
import { todoApi } from "../api/todoApi";


function* workFetchTodos() {
  try {
    const todos = yield call(todoApi.getAll);
    
    yield put(todosAction.getTodosSuccess(todos));
  } catch (error) {
    console.error("Fetch failed:", error);
    yield put(todosAction.getTodosFailed(error.message));
  }
}

function* workAddTodo(action) {
  const { id: tempId, title } = action.payload;
  try {
    const todoData = {
      title: title,
      completed: false,
      createdAt: new Date().toISOString() 
    };

    const savedTodo = yield call(todoApi.add, todoData); 

    yield put(todosAction.addTodoSuccess({ 
      ...savedTodo, 
      tempId: tempId 
    }));

  } catch (error) {
    yield put(todosAction.addTodoFailed(tempId));
  }
}


function* workEditTodo(action) {
  try {
    yield call(todoApi.update, action.payload);

    
  } catch (error) {
    console.error("Edit failed:", error);
    yield put(todosAction.editTodoFailed(action.payload)); 
  }
}


function* workDeleteTodo(action) {
  const todoId = action.payload.id; 
  try {
    yield call(todoApi.delete, todoId);
  } catch (error) {
    console.error("Delete failed:", error);
    yield put(todosAction.removeTodoFailed(action.payload));
  }
}

export default function* todosSaga() {
  yield takeLatest("todos/getTodosFetch", workFetchTodos);
  yield takeEvery("todos/addTodoFetch", workAddTodo);
  yield takeEvery("todos/editTodoFetch", workEditTodo);
  yield takeEvery("todos/removeTodoFetch", workDeleteTodo);
}