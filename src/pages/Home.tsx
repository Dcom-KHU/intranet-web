import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import { useExam } from "../features/exam-archive/hooks/useExam";
import { useGallery } from "../features/gallery/hooks/useGallery";
import RotatingBackgroundBanner from "../components/RotatingBackgroundBanner";
import { IoNotificationsOutline, IoChatbubbleOutline, IoPencilOutline, IoImageOutline } from "react-icons/io5";
import khuBg from "../assets/khu-bg-1.png";
import khuBg2 from "../assets/khu-bg-2.jpg"
import khuBg3 from "../assets/khu-bg-3.jpg"
import { useNotices } from "../features/notice/hooks/useNotices";
import { useInfos } from "../features/info-sharing/hooks/useInfos";

const homeBackgroundImages = [khuBg, khuBg2, khuBg3];

const Home = () => {
    const navigate = useNavigate();
    // 족보 게시글 조회
    const { data: exam } = useExam();
    // 최근 활동 사진 조회
    const { data: galleryPost } = useGallery();
    // 공지사항 조회
    const { data: notices } = useNotices();
    // 정보공유 조회
    const { data: infos } = useInfos();

    return (
        <>
        <RotatingBackgroundBanner images={homeBackgroundImages} />

        <div className="px-3 py-8 sm:px-4 lg:px-8">
            <div className="w-full ml-5 mr-5">

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                    <Container title="공지사항" icon={IoNotificationsOutline} onViewAllClick={() => navigate("/notice")}>
                        {notices?.slice(0, 5).map(item => (
                            <div
                                key={item.id}
                                className="flex py-1 text-sm hover:font-bold cursor-pointer items-center justify-between overflow-hidden"
                                onClick={() => navigate(`/notice/${item.id}`)}
                            >
                                <p className="min-w-0 truncate">
                                    <span className="inline">
                                    {item.title.length > 21
                                        ? `${item.title.slice(0, 21)}...`
                                        : item.title}
                                    </span>
                                </p>
                                <p className="text-gray-400 text-xs flex-shrink-0 ml-2">
                                    <span className="sm:hidden">
                                        {item.date.slice(5)}
                                    </span>

                                    <span className="hidden sm:inline">
                                        {item.date}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </Container> 

                    <Container title="정보공유" icon={IoChatbubbleOutline} onViewAllClick={() => navigate("/info-sharing")}>
                        {infos?.slice(0, 5).map(item => (
                            <div
                                key={item.id}
                                className="flex py-1 text-sm hover:font-bold cursor-pointer items-center justify-between overflow-hidden"
                                onClick={() => navigate(`/info/${item.id}`)}
                            >
                                <p className="min-w-0 truncate">
                                    {item.author.name}
                                    {" | "}
                                    <span className="inline">
                                        {item.title.length > 18
                                            ? `${item.title.slice(0, 18)}...`
                                            : item.title}
                                    </span>
                                </p>
                                <p className="text-gray-400 text-xs flex-shrink-0 ml-2">
                                    <span className="sm:hidden">
                                        {item.createdAt.slice(5, 10)}
                                    </span>

                                    <span className="hidden sm:inline">
                                        {item.createdAt.slice(0, 10)}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </Container>       
                    
                    <Container title="최근 등록 족보" icon={IoPencilOutline} onViewAllClick={() => navigate("/exam-archive")}>
                        {exam?.slice(0, 5).map(item => (
                            <div
                                key={item.id}
                                className="flex py-1 text-sm hover:font-bold cursor-pointer items-center justify-between overflow-hidden"
                                onClick={() => navigate(`/exam-archive/${item.id}`)}
                            >
                                <p className="min-w-0 truncate">
                                    {item.author.name}
                                    {" | "}
                                    <span className="inline">
                                    {item.subject.length > 8
                                        ? `${item.subject.slice(0, 8)}...`
                                        : item.subject}
                                    </span>

                                    {" - "}
                                    {item.professor}
                                </p>

                                <p className="text-gray-400 text-xs flex-shrink-0 ml-2">
                                    <span className="sm:hidden">
                                        {item.date.slice(5)}
                                    </span>

                                    <span className="hidden sm:inline">
                                        {item.date}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </Container>
                    <div className="sm:col-span-2 lg:col-span-3">
                        <Container title="최근 활동 사진" icon={IoImageOutline} onViewAllClick={() => navigate("/gallery")}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {galleryPost.slice(0,4).map((item) => (
                                    <img 
                                        key={item.id}
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                                        onClick={() => navigate(`gallery/${item.id}`)}
                                    />
                                ))}
                            </div>
                            
                        </Container>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;

