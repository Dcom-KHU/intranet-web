import { useEffect, type ReactNode } from "react";
import dcomLogo from "../../assets/dcom-logo-black.png";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onClose?: () => void;
  labelledById?: string;
  isActionLoading?: boolean;
  loadingLabel?: string;
};

export default function Modal({
  isOpen,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  onClose,
  labelledById = "modal-title",
  isActionLoading = false,
  loadingLabel = "처리 중",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !onAction || isActionLoading) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat) return;

      event.preventDefault();
      onAction();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActionLoading, isOpen, onAction]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (isActionLoading) return;

    const closeModal = onClose ?? onSecondaryAction ?? onAction;
    closeModal?.();
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 px-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledById}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleBackdropClick();
      }}
    >
      <div className="w-full max-w-sm rounded-[28px] bg-white px-9 py-10 text-center shadow-xl">
        <img
          src={dcomLogo}
          alt="DCOM"
          className="mx-auto mb-3 h-20 w-auto object-contain"
        />

        <h3
          id={labelledById}
          className="mb-4 text-sm font-bold text-gray-900"
        >
          {title}
        </h3>

        <div className="mb-9 text-xs leading-5 text-gray-700">
          {description}
        </div>

        <div className="flex items-center justify-center gap-5">
          {secondaryActionLabel && (
            <button
              type="button"
              className="text-xs font-medium rounded-full outline outline-1 outline-gray-500 text-gray-500 px-4 py-2"
              disabled={isActionLoading}
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </button>
          )}
          <button
            type="button"
            className="relative min-h-8 min-w-14 rounded-full px-4 py-2 text-xs font-medium text-red-600 outline outline-1 outline-red-500 disabled:cursor-wait disabled:opacity-80"
            disabled={isActionLoading}
            aria-busy={isActionLoading || undefined}
            onClick={onAction}
          >
            <span className={isActionLoading ? "invisible" : "visible"}>
              {actionLabel}
            </span>
            {isActionLoading && (
              <span
                className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-red-200 border-t-red-600"
                role="status"
                aria-label={loadingLabel}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
