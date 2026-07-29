import { MdAdminPanelSettings } from "react-icons/md";

type ManagedUserNameProps = {
  name: string;
  role: "USER" | "ADMIN";
  className?: string;
};

export default function ManagedUserName({
  name,
  role,
  className = "",
}: ManagedUserNameProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {role === "ADMIN" && (
        <MdAdminPanelSettings
          size={16}
          className="shrink-0 text-[#4988C4]"
          role="img"
          aria-label="관리자"
          title="관리자"
        />
      )}
      <span>{name}</span>
    </span>
  );
}
