import { create } from "zustand";
import type { Todo } from "../types/todo";
import * as api from "../api/todoApi.js";

interface TodoStore {
  task: string;
  todos: Todo[];
  editIndex: number | null;
  editText: string;

  error: string;

  showModal: boolean;
  deleteId: number | null;

  setTask: (text: string) => void;
  setEditText: (text: string) => void;

  fetchTodos: () => Promise<void>;

  addTask: () => Promise<void>;

  deleteTask: (id: number) => void;

  confirmDelete: () => Promise<void>;

  cancelDelete: () => void;

  completeTask: (todo: Todo) => Promise<void>;

  favouriteTask: (todo: Todo) => Promise<void>;

  startEdit: (index: number) => void;

  saveEdit: () => Promise<void>;

  clearError: () => void;

  restoreModal: (id: number) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  task: "",

  todos: [],

  editIndex: null,

  editText: "",

  error: "",

  showModal: false,

  deleteId: null,

  setTask: (text) =>
    set({
      task: text,
    }),

  setEditText: (text) =>
    set({
      editText: text,
    }),

  clearError: () =>
    set({
      error: "",
    }),

  restoreModal: (id) =>
    set({
      showModal: true,
      deleteId: id,
    }),

  fetchTodos: async () => {
    const res = await api.getTodos();

    set({
      todos: res.data,
    });
  },

  addTask: async () => {
    const { task } = get();

    if (task.trim() === "") {
      set({
        error: "⚠️ Task cannot be empty.",
      });

      return;
    }

    await api.addTodo(task);

    set({
      task: "",
      error: "",
    });

    get().fetchTodos();
  },

  deleteTask: (id) => {
    set({
      deleteId: id,
      showModal: true,
    });

    localStorage.setItem("showModal", "true");
    localStorage.setItem("deleteId", id.toString());
  },

  cancelDelete: () => {
    set({
      showModal: false,
      deleteId: null,
    });

    localStorage.removeItem("showModal");
    localStorage.removeItem("deleteId");
  },

  confirmDelete: async () => {
    const id = get().deleteId;

    if (id === null) return;

    await api.deleteTodo(id);

    set({
      showModal: false,
      deleteId: null,
    });

    localStorage.removeItem("showModal");
    localStorage.removeItem("deleteId");

    get().fetchTodos();
  },

  completeTask: async (todo) => {
    await api.patchTodo(todo.id, todo.completed ? 0 : 1, todo.favourite);

    get().fetchTodos();
  },

  favouriteTask: async (todo) => {
    await api.patchTodo(todo.id, todo.completed, todo.favourite ? 0 : 1);

    get().fetchTodos();
  },

  startEdit: (index) => {
    const todo = get().todos[index];

    set({
      editIndex: index,
      editText: todo.text,
    });
  },

  saveEdit: async () => {
    const { editIndex, editText, todos } = get();

    if (editIndex === null) return;

    if (editText.trim() === "") return;

    await api.updateTodo(todos[editIndex].id, editText);

    set({
      editIndex: null,
      editText: "",
    });

    get().fetchTodos();
  },
}));
