import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: number;
  favourite: number;
}

function App() {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Delete Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos(): void {
    axios
      .get<Todo[]>("http://localhost:5000/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }

  function addTask(): void {
    if (task.trim() === "") return;

    axios
      .post("http://localhost:5000/todos", {
        text: task,
      })
      .then(() => {
        setTask("");
        fetchTodos();
      })
      .catch((err) => console.log(err));
  }

  function deleteTask(id: number): void {
    setDeleteId(id);
    setShowModal(true);
  }

  function confirmDelete(): void {
    if (deleteId === null) return;

    axios
      .delete(`http://localhost:5000/todos/${deleteId}`)
      .then(() => {
        fetchTodos();
        setShowModal(false);
        setDeleteId(null);
      })
      .catch((err) => console.log(err));
  }

  function cancelDelete(): void {
    setShowModal(false);
    setDeleteId(null);
  }

  function completeTask(todo: Todo): void {
    axios
      .patch(`http://localhost:5000/todos/${todo.id}`, {
        completed: todo.completed === 1 ? 0 : 1,
        favourite: todo.favourite,
      })
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  }

  function favouriteTask(todo: Todo): void {
    axios
      .patch(`http://localhost:5000/todos/${todo.id}`, {
        completed: todo.completed,
        favourite: todo.favourite === 1 ? 0 : 1,
      })
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  }

  function startEdit(index: number): void {
    setEditIndex(index);
    setEditText(todos[index].text);
  }

  function saveEdit(): void {
    if (editText.trim() === "") return;
    if (editIndex === null) return;

    axios
      .put(`http://localhost:5000/todos/${todos[editIndex].id}`, {
        text: editText,
      })
      .then(() => {
        setEditIndex(null);
        setEditText("");
        fetchTodos();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="app">
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="container">
        <div className="header">
          <h1>My Todo</h1>
          <p>Stay organized. Stay productive.</p>
        </div>

        <div className="add-task">
          <input
            type="text"
            placeholder="What do you want to accomplish today?"
            value={task}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTask(e.target.value)
            }
          />

          <button onClick={addTask}>+ Add Task</button>
        </div>

        {todos.length === 0 ? (
          <div className="empty">
            <h2>📋</h2>
            <h3>No Todos Yet</h3>
            <p>Add your first task and start being productive.</p>
          </div>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <li
                key={todo.id}
                className={todo.completed === 1 ? "completed-card" : ""}
              >
                {editIndex === index ? (
                  <div className="edit-box">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditText(e.target.value)
                      }
                    />

                    <button className="save-btn" onClick={saveEdit}>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="task-content">
                      <h3>
                        <span className="task-number">{index + 1}.</span>

                        {todo.favourite === 1 && (
                          <span className="star">⭐</span>
                        )}

                        <span
                          style={{
                            textDecoration:
                              todo.completed === 1 ? "line-through" : "none",

                            color: todo.completed === 1 ? "#16a34a" : "#1f2937",
                          }}
                        >
                          {todo.text}
                        </span>
                      </h3>

                      <p>
                        {todo.completed === 1 ? "✅ Completed" : "🕒 Pending"}
                      </p>
                    </div>

                    <div className="actions">
                      <button
                        className="complete-btn"
                        onClick={() => completeTask(todo)}
                      >
                        {todo.completed === 1 ? "Undo" : "Complete"}
                      </button>

                      <button
                        className="fav-btn"
                        onClick={() => favouriteTask(todo)}
                      >
                        {todo.favourite === 1 ? "★" : "☆"}
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() => startEdit(index)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>🗑 Delete Task</h2>

              <p>Are you sure you want to delete this task?</p>

              <div className="modal-buttons">
                <button className="cancel-btn" onClick={cancelDelete}>
                  Cancel
                </button>

                <button className="confirm-btn" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
