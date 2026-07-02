import ModalContent from "./ModalContent";

interface Props {
  showModal: boolean;
  confirmDelete: () => void;
  cancelDelete: () => void;
}

const DeleteModal = ({ showModal, confirmDelete, cancelDelete }: Props) => {
  if (!showModal) return null;

  return (
    <div
      onClick={cancelDelete}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-md
        px-5
        animate-[fadeIn_0.2s_ease-out]
      "
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm">
        <ModalContent
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
