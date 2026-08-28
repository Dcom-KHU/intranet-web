// UserDisplay.tsx

type Props = {
  user: {
    studentNumber: string | number;
    name: string;
  };
  className?: string;
};

const getDisplayedStudentNumber = (studentNumber: string | number) => {
  const normalizedStudentNumber = String(studentNumber).trim();

  return normalizedStudentNumber.length === 2
    ? normalizedStudentNumber
    : normalizedStudentNumber.slice(2, 4);
};

export default function UserDisplayName({ user, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm leading-none ${className}`}
    >
      <span className="inline-flex items-center justify-center rounded bg-slate-200 px-1 py-1.5 text-xs font-bold leading-none shadow-sm">
        {getDisplayedStudentNumber(user.studentNumber)}
      </span>
      <span className="leading-none">{user.name}</span>
    </span>
  );
}
