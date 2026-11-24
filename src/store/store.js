import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";

export const store = configureStore({
	reducer: {
		todos: todosReducer,
	},
});

store.subscribe(() => {
	try {
		localStorage.setItem("todo-tasks", JSON.stringify(store.getState().todos));
	} catch {
		// Keep the in-memory todo list usable if browser storage is unavailable.
	}
});