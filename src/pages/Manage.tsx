import Container from "../components/ui/Container";
import { IoCheckmarkOutline, IoPeopleOutline, IoNotificationsOutline, IoChatbubbleOutline, IoPencilOutline, IoImageOutline, IoChevronForward } from "react-icons/io5";
import { useUsers } from "../features/manage/hooks/useUsers";
import Loading from "../components/Loading";
import { Button } from "../components/ui/Button";

const Manage = () => {
  const { users, loading, } = useUsers();
  
  if (loading) return <Loading />;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">   

      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">D.COM 관리자</h1>
        <p className="mt-2 text-sm text-gray-500">
          D.COM 회원과 게시글 관리 대시보드 
        </p>
      </section>


      <div className="flex flex-col lg:flex-row gap-6 bg-[#F8F9FC] p-10 rounded-2xl">
        {/* 왼쪽 */}
        <div className="flex-1 flex flex-col gap-4 justify-between">

          <div className="grid grid-cols-2 gap-4">
            
            <Container 
              title="회원 승인 대기" 
              variant="secondary" 
              icon={IoCheckmarkOutline}
              showViewAll={false}
            >
              <p className="text-4xl font-bold">6</p>
            </Container>
            
            <Container 
              title="전체 D.COM 회원" 
              variant="secondary" 
              icon={IoPeopleOutline}
              showViewAll={false}
            >
              <p className="text-4xl font-bold">{users.length}</p>
            </Container>
          </div>
          
          <Container 
            title="승인 대기 목록" 
            variant="secondary"
          >
            {users?.slice(0, 4).map(user => (
                <div key={user.id} className="flex items-center justify-between py-2 border-b text-sm">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{user.name} ({user.studentNumber})</p>
                    <p className="text-sm text-gray-400">신청일 | </p>
                  </div>
                  <div className="flex w-[100px] gap-2">
                    <Button className="flex-1" variant="third">
                      승인
                    </Button>
                    <Button className="flex-1" variant="refusal">
                      거절
                    </Button>
                  </div>
                </div>
              ))}
          </Container>
        
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 flex flex-col gap-4 justify-between">
            
            <Container 
              title="게시글 관리" 
              variant="secondary"
              showViewAll={false}
            >
              <div className="grid grid-cols-2 gap-4">
                <PostManageCard
                  icon={<IoNotificationsOutline className="w-6 h-6 text-gray-400" />}
                  title="공지사항"
                  description="게시글 23개"
                  onClick={() => {}}
                />
                <PostManageCard
                  icon={<IoChatbubbleOutline className="w-6 h-6 text-gray-400" />}
                  title="정보 공유"
                  description="게시글 15개"
                  onClick={() => {}}
                />
                <PostManageCard
                  icon={<IoPencilOutline className="w-6 h-6 text-gray-400" />}
                  title="족보"
                  description="게시글 42개"
                  onClick={() => {}}
                />
                <PostManageCard
                  icon={<IoImageOutline className="w-6 h-6 text-gray-400" />}
                  title="활동사진"
                  description="게시글 15개"
                  onClick={() => {}}
                />
              </div>
              
            </Container>
            <Container 
              title="회원 관리" 
              variant="secondary"
            >
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-sm font-medium">
                      이름
                    </th>
                    <th className="px-4 py-3 text-sm font-medium">
                      학번
                    </th>
                    <th className="px-4 py-3 text-sm font-medium">
                      아이디
                    </th>
                    <th className="px-4 py-3 text-sm font-medium">
                      최근 접속일
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users?.slice(0, 3).map(user => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 text-sm text-center"
                    >
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {user.studentNumber}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {user.userID}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        최근접속일
                        {/* <div className="flex w-[100px] gap-2">
                          <Button className="flex-1" variant="refusal">
                            삭제
                          </Button>
                        </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Container>
        </div>
      </div>
    </div>
  );
};

export default Manage;


function PostManageCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="
        p-4
        rounded-2xl
        bg-[#F8F9FC]
        hover:shadow-md
        transition-all
        duration-300
        text-[#0F2854]
        cursor-pointer
        whitespace-nowrap
        flex items-center
      "
    >
      {icon}
      <div className="flex flex-col gap-1 ml-3">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-[10px] text-gray-400">{description}</p>
      </div>

      <IoChevronForward className="ml-auto w-6 h-6 text-gray-400" />
    </div>
  );
}
