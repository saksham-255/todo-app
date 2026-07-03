import { useEffect } from "react";

import Header from "../components/header";
import Progress from "../components/Progress";
import AddTask from "../components/AddTask";
import TodoList from "../components/TodoList";
import EmptyState from "../components/EmptyState";
import DeleteModal from "../components/DeleteModal";

import { useTodoStore } from "../store/todoStore";

const Home = () => {
  const {
    task,
    todos,
    error,

    editIndex,
    editText,

    showModal,

    setTask,
    setEditText,

    fetchTodos,
    addTask,
    deleteTask,
    confirmDelete,
    cancelDelete,
    completeTask,
    favouriteTask,
    startEdit,
    saveEdit,
    clearError,
    restoreModal,
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();

    const modal = localStorage.getItem("showModal");
    const id = localStorage.getItem("deleteId");

    if (modal === "true" && id) {
      restoreModal(Number(id));
    }
  }, []);

  const completedTasks = todos.filter((todo) => todo.completed).length;

  const progress =
    todos.length === 0 ? 0 : Math.round((completedTasks / todos.length) * 100);

  return (
    <>
      <Header />

      <AddTask
        task={task}
        error={error}
        setTask={setTask}
        addTask={addTask}
        clearError={clearError}
      />

      <Progress
        progress={progress}
        completed={completedTasks}
        total={todos.length}
      />

      <div className="mt-6">
        {todos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList
            todos={todos}
            editIndex={editIndex}
            editText={editText}
            setEditText={setEditText}
            startEdit={startEdit}
            saveEdit={saveEdit}
            completeTask={completeTask}
            favouriteTask={favouriteTask}
            deleteTask={deleteTask}
          />
        )}
      </div>

      <DeleteModal
        showModal={showModal}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
    </>
  );
};

export default Home;
