import { useCallback, useState } from "react";

import Modal from "./Modal";

type AlertState = {
  title: string;
  message: string;
} | null;

export default function useAlertModal() {
  const [alert, setAlert] = useState<AlertState>(null);
  const closeAlert = useCallback(() => setAlert(null), []);
  const showAlert = useCallback((message: string, title = "오류") => {
    setAlert({ title, message });
  }, []);

  return {
    showAlert,
    alertModal: (
      <Modal
        isOpen={alert !== null}
        title={alert?.title ?? ""}
        description={alert?.message ?? ""}
        actionLabel="확인"
        onAction={closeAlert}
        onClose={closeAlert}
        labelledById="alert-modal-title"
      />
    ),
  };
}
