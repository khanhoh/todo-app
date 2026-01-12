import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    return b.createdAt.localeCompare(a.createdAt);
  },
});

const todosSlice = createSlice({
  name: "todos",
  initialState: todosAdapter.getInitialState({
    isLoading: false,
    error: null,
    status: "All",
  }),
  reducers: {
    getTodosFetch: (state) => {
      state.isLoading = true;
    },
    getTodosSuccess: (state, action) => {
      state.isLoading = false;
      todosAdapter.setAll(state, action.payload);
    },
    getTodosFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addTodoFetch: (state, action) => {
      state.isLoading = true;
      todosAdapter.addOne(state, action.payload);
    },
    addTodoSuccess: (state, action) => {
      const { tempId, ...realTodo } = action.payload;
      todosAdapter.removeOne(state, tempId);
      todosAdapter.addOne(state, realTodo);
      state.isLoading = false;
    },
    addTodoFailed: (state, action) => {
      state.isLoading = false;
      todosAdapter.removeOne(state, action.tempId);
      state.error = action.payload.error;
    },
    removeTodoFetch: (state, action) => {
      const todo = action.payload;
      todosAdapter.removeOne(state, todo.id);
    },
    removeTodoFailed: (state, action) => {
      const todoRestore = action.payload;
      todosAdapter.addOne(state, todoRestore);
      state.error = "Delete Todo Fail";
    },
    editTodoFetch: (state, action) => {
      state.isLoading = true;
      todosAdapter.setOne(state, action.payload);
    },
    editTodoFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    filterTodo: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todos);

export const todosAction = todosSlice.actions;
export default todosSlice.reducer;
