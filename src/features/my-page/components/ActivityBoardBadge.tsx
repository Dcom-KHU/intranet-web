interface ActivityBoardBadgeProps {
  label: string;
}

export default function ActivityBoardBadge({ label }: ActivityBoardBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-[#EAF3FF] px-2.5 py-1 text-xs font-medium text-[#438DE3]">
      {label}
    </span>
  );
}
