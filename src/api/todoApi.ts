import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getTodos = () => API.get("/todos");

export const addTodo = (text: string) => API.post("/todos", { text });

export const deleteTodo = (id: number) => API.delete(`/todos/${id}`);

export const updateTodo = (id: number, text: string) =>
  API.put(`/todos/${id}`, { text });

export const patchTodo = (id: number, completed: number, favourite: number) =>
  API.patch(`/todos/${id}`, {
    completed,
    favourite,
  });
