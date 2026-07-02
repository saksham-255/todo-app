import TodoInfo from "./TodoInfo";
import TodoActions from "./TodoActions";

import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  index: number;

  editIndex: number | null;
  editText: string;

  setEditText: (text: string) => void;

  startEdit: (index: number) => void;
  saveEdit: () => void;

  completeTask: (todo: Todo) => void;
  favouriteTask: (todo: Todo) => void;
  deleteTask: (id: number) => void;
}

const TodoCard = ({
  todo,
  index,
  editIndex,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  completeTask,
  favouriteTask,
  deleteTask,
}: Props) => {
  const editing = editIndex === index;

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[18px] md:rounded-[22px]
        border
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        ${
          todo.completed
            ? "border-green-300/40 bg-gradient-to-r from-cyan-300/40 to-sky-200/30"
            : "border-white/25 bg-white/[0.18]"
        }
      `}
    >
      {/* Left accent bar */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1.5
          ${todo.completed ? "bg-green-500" : "bg-blue-500"}
        `}
      />

      <div
        className="
          flex
          flex-col lg:flex-row
          lg:items-center lg:justify-between
          gap-3 lg:gap-6
          px-4 md:px-6 py-4 md:py-5
          pl-6 md:pl-8
        "
      >
        {/* Left */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                className="
                  flex-1
                  rounded-xl
                  bg-white
                  px-4
                  py-2.5 md:py-3
                  text-base
                  font-semibold
                  text-slate-800
                  outline-none
                  shadow-lg
                  focus:ring-4
                  focus:ring-blue-300
                "
              />

              <button
                onClick={saveEdit}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-500
                  px-6
                  py-2.5 sm:py-0
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:scale-105
                  active:scale-95
                "
              >
                Save
              </button>
            </div>
          ) : (
            <TodoInfo todo={todo} index={index} />
          )}
        </div>

        {/* Right */}
        {!editing && (
          <div className="flex justify-end lg:justify-start">
            <TodoActions
              todo={todo}
              index={index}
              startEdit={startEdit}
              completeTask={completeTask}
              favouriteTask={favouriteTask}
              deleteTask={deleteTask}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
