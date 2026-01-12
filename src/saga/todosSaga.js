import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { todosAction } from "../store/todosSlice";
import { todoApi } from "../api/todoApi"; // Ensure you created this file from the previous step

/**
 * WORKER: Fetch All Todos
 */
function* workFetchTodos() {
  try {
    // 1. Call API to get data from Firestore
    const todos = yield call(todoApi.getAll);
    
    // 2. Dispatch Success to fill the state
    yield put(todosAction.getTodosSuccess(todos));
  } catch (error) {
    console.error("Fetch failed:", error);
    yield put(todosAction.getTodosFailed(error.message));
  }
}

/**
 * WORKER: Add Todo
 * Handles the swap from "Temp ID" (UI) to "Real ID" (Firebase)
 */
function* workAddTodo(action) {
  // We grab the 'tempId' from the payload that the UI generated (e.g., Date.now())
  const { id: tempId, title } = action.payload;

  try {
    // 1. Prepare data for Firebase (Firebase creates its own ID, so we don't send tempId)
    const todoData = {
      title: title,
      completed: false,
      // Optional: Add createdAt for sorting if needed
      createdAt: new Date().toISOString() 
    };

    // 2. Call API
    const savedTodo = yield call(todoApi.add, todoData); 
    // savedTodo now looks like: { id: "Abc123FirebaseId", title: "...", completed: false }

    // 3. Dispatch Success
    // We pass BOTH the new real data AND the old tempId so the reducer can swap them
    yield put(todosAction.addTodoSuccess({ 
      ...savedTodo, 
      tempId: tempId 
    }));

  } catch (error) {
    // 4. If API fails, tell the store to remove the Optimistic item
    yield put(todosAction.addTodoFailed(tempId));
  }
}

/**
 * WORKER: Edit Todo (Title or Checkbox)
 */
function* workEditTodo(action) {
  try {
    // action.payload contains the full todo object with updates
    yield call(todoApi.update, action.payload);
    
    // Usually, we don't need to dispatch a "Success" action for edits 
    // if we already updated the UI optimistically in the component/slice.
    // But if you want to be safe, you can dispatch one.
    
  } catch (error) {
    // If API fails, rollback the change
    console.error("Edit failed:", error);
    yield put(todosAction.editTodoFailed(action.payload)); 
  }
}

/**
 * WORKER: Delete Todo
 */
function* workDeleteTodo(action) {
  const todoId = action.payload.id; // Or just payload, depending on how you dispatch
  try {
    yield call(todoApi.delete, todoId);
    // Success - nothing else to do if UI was optimistic
  } catch (error) {
    console.error("Delete failed:", error);
    // Rollback: Add the item back if the server delete failed
    yield put(todosAction.removeTodoFailed(action.payload));
  }
}

/**
 * WATCHER: Watches for actions
 */
export default function* todosSaga() {
  // Use takeLatest for Fetch (cancel previous if user spams refresh)
  yield takeLatest("todos/getTodosFetch", workFetchTodos);

  // Use takeEvery for Add/Edit/Delete (allow multiple rapid changes)
  yield takeEvery("todos/addTodoFetch", workAddTodo);
  yield takeEvery("todos/editTodoFetch", workEditTodo);
  yield takeEvery("todos/removeTodoFetch", workDeleteTodo);
}