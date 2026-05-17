import Card from "../components/ui/Card";
import { exam_mock } from "../features/exam-archive/exam-archive.mock";

const Home = () => {
    return (
        <div className="p-20"> 
            <div className="mt-10 grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">   

                {/* 활동요약 */}
                <Card title="활동요약">
                    <div className="space-y-3">
                        {exam_mock.map(exam => (
                            <div key={exam.id} className="border p-4 rounded-xl shadow-md bg-gray-50">
                                <h2 className="text-lg font-bold mb-2">{exam.title}</h2>
                                <p className="text-gray-600 mb-2">{exam.description}</p>
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>{exam.author}</span>
                                    <span>{exam.date}</span>
                                </div>                    
                            </div>
                        ))}
                    </div>
                </Card>

                {/* 공지사항 */}
                <Card title="공지사항">
                    <p>공지사항 내용</p>
                </Card> 

                
            </div>
        </div>
    );
};

export default Home;

