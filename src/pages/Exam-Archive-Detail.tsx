import { useNavigate, useParams } from "react-router-dom";
import backImg from "../assets/icon/back.png";
import { useExamArchive } from "../features/exam-archive/hooks/useExamArchives-detail";

const ExamArchiveDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useExamArchive(Number(id));

    if (!data) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="px-4 py-8 sm:px-6 lg:px-20">           

        <div className="flex items-center gap-4">
            <img 
                src={backImg} 
                alt="Back" 
                onClick={() => navigate(-1)} 
                className="cursor-pointer size-4 mb-4" 
            />
            <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        </div>

            <p>{data.description}</p>

            <div className="mt-4 text-sm text-gray-500">
                <p>과목: {data.subjectName}</p>
                <p>교수: {data.professor}</p>
                <p>작성자: {data.author}</p>
                <p>날짜: {data.date}</p>
            </div>
        </div>
    );
};

export default ExamArchiveDetail;
