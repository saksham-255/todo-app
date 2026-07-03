import { FaCheck, FaUndo, FaPen, FaTrash, FaStar } from "react-icons/fa";

import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  index: number;

  startEdit: (index: number) => void;

  completeTask: (todo: Todo) => void;
  favouriteTask: (todo: Todo) => void;

  deleteTask: (id: number) => void;
}

const btnBase = `
  flex h-9 w-9 md:h-10 md:w-10 items-center justify-center
  rounded-full
  text-white
  shadow-lg
  transition-all duration-300
  hover:-translate-y-1 hover:scale-110
  active:scale-95
  shrink-0
`;

const TodoActions = ({
  todo,
  index,
  startEdit,
  completeTask,
  favouriteTask,
  deleteTask,
}: Props) => {
  return (
    <div className="flex items-center gap-2 md:gap-2.5">
      {/* Complete / Undo */}
      <button
        onClick={() => completeTask(todo)}
        title={todo.completed ? "Mark as pending" : "Mark as completed"}
        className={`${btnBase} bg-gradient-to-br from-green-400 to-green-600 hover:shadow-green-500/50`}
      >
        {todo.completed ? <FaUndo size={13} /> : <FaCheck size={13} />}
      </button>

      {/* Favourite */}
      <button
        onClick={() => favouriteTask(todo)}
        title="Favourite"
        className={`${btnBase} transition-all duration-300 ${
          todo.favourite
            ? "bg-gradient-to-br from-yellow-300 to-amber-500 text-slate-900 shadow-yellow-400/60"
            : "bg-gradient-to-br from-yellow-500 to-yellow-700 text-white hover:shadow-yellow-400/50"
        }`}
      >
        <FaStar size={13} />
      </button>

      {/* Edit */}
      <button
        onClick={() => startEdit(index)}
        title="Edit"
        className={`${btnBase} bg-gradient-to-br from-blue-500 to-blue-700 hover:shadow-blue-500/50`}
      >
        <FaPen size={12} />
      </button>

      {/* Delete */}
      <button
        onClick={() => deleteTask(todo.id)}
        title="Delete"
        className={`${btnBase} bg-gradient-to-br from-red-500 to-red-700 hover:shadow-red-500/50`}
      >
        <FaTrash size={12} />
      </button>
    </div>
  );
};

export default TodoActions;
