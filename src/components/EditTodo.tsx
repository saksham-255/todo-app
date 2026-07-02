interface Props {
  editText: string;
  setEditText: (text: string) => void;
  saveEdit: () => void;
}

const EditTodo = ({ editText, setEditText, saveEdit }: Props) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <input
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        placeholder="Edit your task..."
        className="
          flex-1
          h-[65px]
          rounded-[20px]
          bg-white
          px-6
          text-xl
          font-semibold
          text-gray-700
          shadow-lg
          border-2
          border-transparent
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-200
        "
      />

      <button
        onClick={saveEdit}
        className="
          h-[65px]
          px-8
          rounded-[20px]
          bg-gradient-to-r
          from-green-500
          to-emerald-600
          text-white
          text-lg
          font-bold
          shadow-xl
          transition-all
          duration-300
          hover:scale-105
        "
      >
        Save
      </button>
    </div>
  );
};

export default EditTodo;
