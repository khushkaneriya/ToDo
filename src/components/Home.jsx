import React, { useCallback, useState } from "react";
import "./Home.css";
import { FaCheckSquare } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal } from "./ConfirmationModal";
import { toast } from "react-toastify";
import { addTodo, deleteTodo, toggleTodo, updateTodo } from "../store/todosSlice";

const TodoCard = React.memo(function TodoCard({
  task,
  onToggleComplete,
  onStartEdit,
  onRequestDelete,
  onOpen,
}) {
  return (
    <div className={`todo-card ${task.completed ? "completed" : ""}`}>
      <p className="todo-card-text">{task.text}</p>

      <div className="todo-card-actions">
        <button
          className="todo-btn-check"
          title="Mark complete"
          onClick={() => onToggleComplete(task.id)}
        >
          <FaCheck />
        </button>

        <button
          className="todo-btn-edit"
          title="Edit"
          onClick={() => onStartEdit(task)}
        >
          <FaEdit />
        </button>
                   
        <button
          className="todo-btn-delete"
          title="Delete"
          onClick={() => onRequestDelete(task.id)}
        >
          <MdDelete />
        </button>

        <button
          className="todo-btn-open"
          title="Open"
          onClick={() => onOpen(task.id)}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
});

export function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (editingId !== null) {
      dispatch(updateTodo({ id: editingId, text: trimmed }));
      setEditingId(null);
    } else {
      dispatch(addTodo({ id: Date.now(), text: trimmed, completed: false }));
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") {
      setEditingId(null);
      setInput("");
    }
  };

  const toggleComplete = useCallback((id) => {
    dispatch(toggleTodo(id));
      console.log("Task completion toggled"); 
  }, [dispatch]);

  const startEdit = useCallback((task) => {
    setEditingId(task.id);
    setInput(task.text);
    console.log("Task to edit");
  }, []);

  const requestDelete = useCallback((taskId) => {
    setTaskToDelete(taskId);
  }, []);

  const confirmDelete = useCallback(() => {
    dispatch(deleteTodo(taskToDelete));
    setTaskToDelete(null);
    toast.success("Task deleted successfully!");
    console.log("Task deleted successfully"); 
  }, [dispatch, taskToDelete]);


  const handleOpen = useCallback((taskId) => {
    navigate(`/todo/${taskId}`);
  }, [navigate]);

  return (
    <>
      <div className="todo-container">
      <h1 className="todo-title">
        My Todos
        <span className="todo-title-icon"> 
          <FaCheckSquare />
        </span> 
      </h1>

      <div className="todo-input-row">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter your task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="btn-blue add-btn"
          onClick={handleSubmit}
        >
          {editingId === null ? "Add" : "Update"}
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="todo-empty">No task added.</p>
      ) : (
        <div className="todo-grid">
          {tasks.map((task) => (
            <TodoCard
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onStartEdit={startEdit}
              onRequestDelete={requestDelete}
              onOpen={handleOpen}
            />
          ))}
        </div>
      )}

      {taskToDelete !== null && (
        <ConfirmationModal
          confirmLabel="Delete"
          message="Are you sure you want to delete?"
          onCancel={() => setTaskToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
      </div>
    </>
  );
}
