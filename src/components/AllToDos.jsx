import { useEffect, useMemo, useRef, useState } from "react"
import "./AllToDos.css"
import Loader from "../Mui/Mui";

function AllToDos() {
	const [todoData, setTodoData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState("");
	//const searchInputRef = useRef(null);
	const filteredTodos = useMemo(
		() => todoData.filter((task) =>
			task.todo.toLowerCase().includes(searchText.toLowerCase())
		),
		[todoData, searchText]
	);

	async function fetchData() {
		setLoading(true);
		const response = await fetch("https://dummyjson.com/todos")
		const data = await response.json()
		setTodoData(data.todos)
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<Loader open={loading} />
			<main className="all-todos">
				<h1 className="all-todos-title">List of ToDos</h1>
				<div className="all-todos-search">
					{console.log("Search bar rendered")}
					<input
						
						className="all-todos-search-input"
						type="search"
						aria-label="Search todos"
						placeholder="Search todos"
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
					/>
					<button
						className="all-todos-search-clear"
						type="button"
						disabled={!searchText}
						onClick={() => {
							setSearchText("");
							
						}}
					>
						Clear
					</button>
				</div>

				{filteredTodos.length > 0 && (
					<ul className="all-todos-list">
						{filteredTodos.map((task) => (
							<li className="all-todos-item" key={task.id}>
								<span className="all-todos-text">{task.todo}</span>
								<span
									className={`all-todos-status ${task.completed ? "is-completed" : "is-pending"}`}
								>
									{task.completed ? "Completed" : "Pending"}
								</span>
							</li>
						))}
					</ul>
				)}
				{todoData.length > 0 && filteredTodos.length === 0 && (
					<p className="all-todos-empty">No todos match your search.</p>
				)}
			</main>
		</>
	)
}

export default AllToDos
