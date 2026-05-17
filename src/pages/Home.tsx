import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";

const Home = () => {
    const navigate = useNavigate();
    const { data } = useExamArchives();

    return (
        <div className="p-20"> 
            <div className="mt-10 grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">   

                {/* 활동요약 */}
                <Container title="활동요약">
                    <div className="space-y-3">
                        {data.map(item => (
                            <Card
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                onClick={() => navigate(`/exam-archive/${item.id}`)}

                            />
                        ))}
                    </div>
                </Container>

                {/* 공지사항 */}
                <Container title="공지사항">
                    <p>공지사항 내용</p>
                </Container> 
                                
                
            </div>
        </div>
    );
};

export default Home;

