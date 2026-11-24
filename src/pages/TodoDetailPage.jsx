import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './TodoDetailPage.css'

function TodoDetailPage() {
  const { id } = useParams()
  const task = useSelector((state) => state.todos.find((item) => String(item.id) === id))

  return (
    <>
      <main className="todo-detail">
        <Link className="todo-detail-back" to="/">Back to todos</Link>
        <article className="todo-detail-content">
          <p className="todo-detail-label">Task details</p>
          {task ? (
            <>
              <h1>{task.text}</h1>
              <p className={`todo-detail-status ${task.completed ? 'is-completed' : ''}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </p>
              <p className="todo-detail-id">ID: {task.id}</p>
            </>
          ) : (
            <h1>Todo not found</h1>
          )}
        </article>
      </main>
    </>
  )
}

export default TodoDetailPage