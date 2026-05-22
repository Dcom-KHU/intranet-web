import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";
import RotatingBackgroundBanner from "../components/RotatingBackgroundBanner";
import khuBg from "../assets/khu-bg.png";

const homeBackgroundImages = [khuBg];

const Home = () => {
    const navigate = useNavigate();
    const { data } = useExamArchives();

    return (
        <>
        <RotatingBackgroundBanner images={homeBackgroundImages} />

        <div className="bg-red-400 px-4 py-8 sm:px-6 lg:px-20">
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">   

                    {/* 활동요약 */}
                    <Container title="활동요약">
                        {data.map(item => (
                            <Card
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                onClick={() => navigate(`/exam-archive/${item.id}`)}

                            />
                        ))}
                    </Container>

                    {/* 공지사항 */}
                    <Container title="공지사항">
                        <p>공지사항 내용</p>
                    </Container> 
                                    
                    
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;

