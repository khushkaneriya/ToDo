import { createSlice } from "@reduxjs/toolkit";

function loadTasks() {
	try {
		const savedTasks = localStorage.getItem("todo-tasks");
		const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
		return Array.isArray(parsedTasks) ? parsedTasks : [];
	} catch {
		return [];
	}
}

const todosSlice = createSlice({
	name: "todos",
	initialState: loadTasks(),
	reducers: {
		addTodo(state, action) {
			state.push(action.payload);
		},
		updateTodo(state, action) {
			const todo = state.find((item) => item.id === action.payload.id);
			if (todo) todo.text = action.payload.text;
		},
		toggleTodo(state, action) {
			const todo = state.find((item) => item.id === action.payload);
			if (todo) todo.completed = !todo.completed;
		},
		deleteTodo(state, action) {
			return state.filter((todo) => todo.id !== action.payload);
		},
	},
});

export const { addTodo, updateTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;