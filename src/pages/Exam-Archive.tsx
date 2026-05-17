// pages/ExamArchivePage.tsx

import { useNavigate } from "react-router-dom";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";
import type { ExamArchiveType } from "../features/exam-archive/exam-archive.type";

const ExamArchive = () => {
  const navigate = useNavigate();
  const { data } = useExamArchives();

  return (
    <div className="p-20">
      <h1>시험 자료</h1>

      <div className="mt-10 grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {data.map((item) => (
          <ExamArchiveCard
            key={item.id}
            item={item}
            onClick={(id) => navigate(`/exam-archive/${id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExamArchive;

type ExamArchiveCardProps = {
    item: ExamArchiveType;
    onClick: (id: number) => void;
}

const ExamArchiveCard = ({ item, onClick }: ExamArchiveCardProps) => {
  return (
    <div
      onClick={() => onClick(item.id)}
      className="border p-4 rounded cursor-pointer hover:shadow-md transition"
    >
      <h2 className="text-lg font-bold mb-2">{item.title}</h2>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  );
};