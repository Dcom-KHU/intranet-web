import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import { useExamArchives } from "../features/exam-archive/hooks/useExamArchives";
import RotatingBackgroundBanner from "../components/RotatingBackgroundBanner";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPencilOutline } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import khuBg from "../assets/khu-bg-1.png";
import khuBg2 from "../assets/khu-bg-2.jpg"
import khuBg3 from "../assets/khu-bg-3.jpg"

const homeBackgroundImages = [khuBg, khuBg2, khuBg3];

const Home = () => {
    const navigate = useNavigate();
    const { data } = useExamArchives();

    return (
        <>
        <RotatingBackgroundBanner images={homeBackgroundImages} />

        <div className="px-3 py-8 sm:px-4 lg:px-8">
            <div className="w-full ml-5 mr-5">

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    <Container title="공지사항" icon={IoNotificationsOutline} onViewAllClick={() => navigate("/notice")}>
                        <p>공지사항 내용</p>
                    </Container> 

                    <Container title="정보공유" icon={IoChatbubbleOutline} onViewAllClick={() => navigate("/info-sharing")}>
                        <p>정보공유게시판</p>
                    </Container>       
                    
                    <Container title="최근 등록 족보" icon={IoPencilOutline} onViewAllClick={() => navigate("/exam-archive")}>
                        {data?.slice(0, 3).map(item => (
                            <Card
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                onClick={() => navigate(`/exam-archive/${item.id}`)}
                            />
                        ))}
                    </Container>
                    <div className="sm:col-span-2 lg:col-span-3">
                        <Container title="최근 활동 사진" icon={IoImageOutline} onViewAllClick={() => navigate("/gallery")}>
                            <p>추가 컨텐츠</p>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;

