import { useContext } from "react";
import { UnsavedChangesContext } from "./unsavedChangesContext";

export default function useUnsavedChanges() {
  const context = useContext(UnsavedChangesContext);

  if (!context) {
    throw new Error(
      "useUnsavedChanges must be used within an UnsavedChangesProvider",
    );
  }

  return context;
}
