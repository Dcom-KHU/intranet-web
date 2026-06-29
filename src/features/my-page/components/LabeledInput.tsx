import type { ReactNode } from "react";

import InputLabel from "../../../components/ui/InputLabel";

interface LabeledInputProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export default function LabeledInput({
  label,
  error,
  children,
}: LabeledInputProps) {
  return (
    <div>
      <InputLabel>{label}</InputLabel>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
