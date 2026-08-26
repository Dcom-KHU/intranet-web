import { createContext } from "react";

export type UnsavedChangesContextValue = {
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (hasUnsavedChanges: boolean) => void;
};

export const UnsavedChangesContext =
  createContext<UnsavedChangesContextValue | null>(null);
