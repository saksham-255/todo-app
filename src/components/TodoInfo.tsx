import { FaStar } from "react-icons/fa";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  index: number;
}

const TodoInfo = ({ todo, index }: Props) => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* Number */}
      <div
        className="
          h-9 w-9 md:h-11 md:w-11
          shrink-0
          rounded-full
          bg-gradient-to-br
          from-blue-600
          to-cyan-500
          flex
          items-center
          justify-center
          text-white
          text-sm md:text-base
          font-bold
          shadow-lg
        "
      >
        {index + 1}.
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2 md:gap-2.5">
          {todo.favourite === 1 && (
            <FaStar className="shrink-0 mt-1 text-yellow-400 text-base md:text-lg drop-shadow-md" />
          )}

          <h2
            className={`
              text-base sm:text-lg md:text-xl
              font-bold
              tracking-wide
              break-words
              min-w-0
              ${
                todo.completed
                  ? "line-through text-green-700/70"
                  : "text-slate-900"
              }
            `}
          >
            {todo.text}
          </h2>
        </div>

        <div className="mt-1.5 md:mt-2">
          {todo.completed ? (
            <span
              className="
                inline-block
                rounded-full
                bg-green-100/90
                px-3
                py-0.5 md:py-1
                text-xs
                font-semibold
                text-green-700
                shadow-sm
              "
            >
              ✅ Completed
            </span>
          ) : (
            <span
              className="
                inline-block
                rounded-full
                bg-orange-100/90
                px-3
                py-0.5 md:py-1
                text-xs
                font-semibold
                text-orange-600
                shadow-sm
              "
            >
              🕒 Pending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoInfo;
