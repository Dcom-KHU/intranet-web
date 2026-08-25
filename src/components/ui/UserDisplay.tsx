// UserDisplay.tsx

type Props = {
  user: {
    studentNumber: string | number;
    name: string;
  };
};

const getDisplayedStudentNumber = (studentNumber: string | number) => {
  const normalizedStudentNumber = String(studentNumber).trim();

  return normalizedStudentNumber.length === 2
    ? normalizedStudentNumber
    : normalizedStudentNumber.slice(2, 4);
};

export default function UserDisplayName({ user }: Props) {
  return (
    <span className="flex flex-row items-center gap-1 text-sm">
      <div className="flex h-6 items-center justify-center rounded bg-slate-200 px-1 text-xs font-bold shadow-sm">
        {getDisplayedStudentNumber(user.studentNumber)}
      </div>
      {user.name}
    </span>
  );
}
