import Modal from "./Modal";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  title?: string;
  description: string;
  isDeleting?: boolean;
  actionLabel?: string;
  loadingLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDeleteModal({
  isOpen,
  title = "정말 삭제하시겠습니까?",
  description,
  isDeleting = false,
  actionLabel = "삭제",
  loadingLabel = "삭제 처리 중",
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      actionLabel={actionLabel}
      isActionLoading={isDeleting}
      loadingLabel={loadingLabel}
      onAction={isDeleting ? undefined : onConfirm}
      secondaryActionLabel="취소"
      onSecondaryAction={isDeleting ? undefined : onCancel}
      labelledById="confirm-delete-modal-title"
    />
  );
}
