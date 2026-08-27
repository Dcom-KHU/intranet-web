import { useMemo, useState, type ReactNode } from "react";
import { UnsavedChangesContext } from "./unsavedChangesContext";

export default function UnsavedChangesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const value = useMemo(
    () => ({ hasUnsavedChanges, setHasUnsavedChanges }),
    [hasUnsavedChanges],
  );

  return (
    <UnsavedChangesContext.Provider value={value}>
      {children}
    </UnsavedChangesContext.Provider>
  );
}
