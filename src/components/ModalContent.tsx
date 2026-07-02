import { FaTrash } from "react-icons/fa";
import ModalButtons from "./ModalButtons";

interface Props {
  confirmDelete: () => void;
  cancelDelete: () => void;
}

const ModalContent = ({ confirmDelete, cancelDelete }: Props) => {
  return (
    <div
      className="
        w-full
        rounded-[24px]
        bg-white
        p-6 md:p-7
        text-center
        shadow-2xl
        animate-[popIn_0.25s_ease-out]
      "
    >
      {/* Icon */}
      <div
        className="
          mx-auto
          mb-4
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-red-500
          to-red-700
          text-white
          shadow-lg
          shadow-red-500/30
        "
      >
        <FaTrash size={22} />
      </div>

      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
        Delete Task?
      </h2>

      <p className="mt-2 text-sm md:text-base text-slate-500 font-medium">
        This action cannot be undone. The task will be permanently removed.
      </p>

      <ModalButtons confirmDelete={confirmDelete} cancelDelete={cancelDelete} />
    </div>
  );
};

export default ModalContent;
