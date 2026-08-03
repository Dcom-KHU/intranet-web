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
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !onAction) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat) return;

      event.preventDefault();
      onAction();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onAction]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
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
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </button>
          )}
          <button
            type="button"
            className="text-xs font-medium rounded-full outline outline-1 outline-red-500 text-red-600 px-4 py-2"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
