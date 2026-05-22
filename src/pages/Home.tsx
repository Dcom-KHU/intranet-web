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

        <div className="px-3 py-8 sm:px-4 lg:px-8">
            <div className="w-full ml-5 mr-5">

                <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">   

                    <Container title="공지사항">
                        <p>공지사항 내용</p>
                    </Container> 

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

                    <Container title="정보공유">
                        <p>정보공유게시판</p>
                    </Container>       
                    
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;

