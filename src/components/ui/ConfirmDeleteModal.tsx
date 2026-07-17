import Modal from "./Modal";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  title?: string;
  description: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDeleteModal({
  isOpen,
  title = "정말 삭제하시겠습니까?",
  description,
  isDeleting = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      badge="삭제 확인"
      title={title}
      description={description}
      actionLabel={isDeleting ? "삭제 중" : "삭제"}
      onAction={isDeleting ? undefined : onConfirm}
      secondaryActionLabel="취소"
      onSecondaryAction={isDeleting ? undefined : onCancel}
      labelledById="confirm-delete-modal-title"
    />
  );
}
