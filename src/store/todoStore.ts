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

  // fetchTodos using try catch

  fetchTodos: async () => {
    try {
      const res = await api.getTodos();

      set({
        todos: res.data,
      });
    } catch (error) {
      console.error("Error fetching todos:", error);

      set({
        error: "Failed to load todos.",
      });
    }
  },

  // add task using try catch

  addTask: async () => {
    const { task } = get();

    if (task.trim() === "") {
      set({
        error: "Task cannot be empty.",
      });

      return;
    }

    try {
      await api.addTodo(task);

      set({
        task: "",
        error: "",
      });

      get().fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);

      set({
        error: "Failed to add task.",
      });
    }
  },

  // delete task

  deleteTask: (id) => {
    set({
      deleteId: id,
      showModal: true,
    });

    localStorage.setItem("showModal", "true");
    localStorage.setItem("deleteId", id.toString());
  },

  // canceldelete

  cancelDelete: () => {
    set({
      showModal: false,
      deleteId: null,
    });

    localStorage.removeItem("showModal");
    localStorage.removeItem("deleteId");
  },

  // confirmdelete using try catch

  confirmDelete: async () => {
    const id = get().deleteId;

    if (id === null) return;

    try {
      await api.deleteTodo(id);

      set({
        showModal: false,
        deleteId: null,
      });

      localStorage.removeItem("showModal");
      localStorage.removeItem("deleteId");

      get().fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);

      set({
        error: "Failed to delete task.",
      });
    }
  },

  // completetask using try catch

  completeTask: async (todo) => {
    try {
      await api.patchTodo(todo.id, !todo.completed, todo.favourite);

      get().fetchTodos();
    } catch (error) {
      console.error("Error completing todo:", error);

      set({
        error: "Failed to update task.",
      });
    }
  },

  // fav task using try catch

  favouriteTask: async (todo) => {
    try {
      await api.patchTodo(todo.id, todo.completed, !todo.favourite);

      get().fetchTodos();
    } catch (error) {
      console.error("Error updating favourite:", error);

      set({
        error: "Failed to update favourite.",
      });
    }
  },

  // edit start

  startEdit: (index) => {
    const todo = get().todos[index];

    set({
      editIndex: index,
      editText: todo.text,
    });
  },

  // save edit using try catch

  saveEdit: async () => {
    const { editIndex, editText, todos } = get();

    if (editIndex === null) return;

    if (editText.trim() === "") return;

    try {
      await api.updateTodo(todos[editIndex].id, editText);

      set({
        editIndex: null,
        editText: "",
      });

      get().fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);

      set({
        error: "Failed to update task.",
      });
    }
  },
}));
