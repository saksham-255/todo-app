interface Props {
  task: string;
  error: string;
  setTask: (text: string) => void;
  addTask: () => void;
  clearError: () => void;
}

const AddTask = ({ task, error, setTask, addTask, clearError }: Props) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
        {/* Input */}
        <input
          type="text"
          value={task}
          placeholder="What do you want to accomplish today?"
          onChange={(e) => {
            setTask(e.target.value);
            clearError();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
          className="
            flex-1
            h-[52px] md:h-[60px]
            rounded-[16px] md:rounded-[20px]
            border
            border-white/30
            bg-white/35
            backdrop-blur-xl
            px-5
            text-base md:text-lg
            font-semibold
            text-slate-700
            placeholder:text-slate-500
            shadow-lg
            outline-none
            transition-all
            duration-300
            focus:border-blue-400
            focus:bg-white/60
            focus:ring-4
            focus:ring-blue-300/40
          "
        />

        {/* Button */}
        <button
          onClick={addTask}
          className="
            h-[52px] md:h-[60px]
            md:min-w-[160px]
            rounded-[16px] md:rounded-[20px]
            bg-gradient-to-r
            from-blue-700
            via-blue-600
            to-cyan-500
            px-7
            text-base md:text-lg
            font-bold
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-105
            hover:shadow-cyan-500/40
            hover:shadow-2xl
            active:scale-95
          "
        >
          + Add Task
        </button>
      </div>

      {error && (
        <p
          className="
            mt-3 ml-2
            inline-block
            rounded-full
            bg-red-500/90
            px-4 py-1.5
            text-sm font-semibold text-white
            shadow-md
          "
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default AddTask;
