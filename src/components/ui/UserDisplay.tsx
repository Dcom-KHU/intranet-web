// UserDisplay.tsx

type Props = {
  user: {
    studentNumber: string;
    userID: string;
  };
};

export default function UserDisplayName({ user }: Props) {
  return (
    <span className="flex flex-row items-center gap-1 text-sm">
      <div className="flex h-6 items-center justify-center rounded bg-slate-200 px-1 text-xs font-bold shadow-sm">
        {String(user.studentNumber).slice(2, 4)}
      </div>
      {user.userID}
    </span>
  );
}
