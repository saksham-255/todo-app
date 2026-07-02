interface Props {
  confirmDelete: () => void;
  cancelDelete: () => void;
}

const ModalButtons = ({ confirmDelete, cancelDelete }: Props) => {
  return (
    <div className="flex gap-3 mt-6">
      <button
        onClick={cancelDelete}
        className="
          flex-1
          rounded-xl
          bg-gray-200
          py-3
          text-base
          font-semibold
          text-gray-700
          transition-all
          duration-300
          hover:bg-gray-300
          active:scale-95
        "
      >
        Cancel
      </button>

      <button
        onClick={confirmDelete}
        className="
          flex-1
          rounded-xl
          bg-gradient-to-r
          from-red-500
          to-red-700
          py-3
          text-base
          font-bold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-red-500/40
          active:scale-95
        "
      >
        Delete
      </button>
    </div>
  );
};

export default ModalButtons;
