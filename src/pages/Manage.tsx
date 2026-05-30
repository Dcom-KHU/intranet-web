import Container from "../components/ui/Container";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { useUsers } from "../features/manage/hooks/useUsers";
import Loading from "../components/Loading";
import { Button } from "../components/ui/Button";

const Manage = () => {
  const { users, loading, } = useUsers();
  
  if (loading) return <Loading />;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">      
      <div className="flex flex-col lg:flex-row gap-6 bg-[#F8F9FC] p-10 rounded-2xl border border-[#E0E0E0]">
        {/* 왼쪽 */}
        <div className="flex-1 flex flex-col gap-6">

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
                <div key={user.id} className="flex items-center justify-between py-2 border-b">
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
        <div className="flex-1 flex flex-col gap-6">
            
            <Container 
              title="게시글 관리" 
              variant="secondary"
              showViewAll={false}
            >
              <p>이곳은 관리 섹션입니다.</p>
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
                  {users?.slice(0, 5).map(user => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 text-center"
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
