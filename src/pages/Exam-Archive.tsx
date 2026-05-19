import { useNavigate } from "react-router-dom";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const ExamArchive = () => {
  const navigate = useNavigate();
  const { data } = useExamArchives();

  return (
    <div className="p-20">

      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">

      <Container title="시험자료">
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            onClick={() => navigate(`/exam-archive/${item.id}`)}
          />
        ))}
        </Container>
      </div>
    </div>
  );
};

export default ExamArchive;
