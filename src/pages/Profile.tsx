import { useState } from "react";
import Container from "../components/ui/Container";
import Input from "../components/ui/Input";
import basicProfile from "../assets/basic_profile.png";
import { useProfileEdit } from "../features/profile-edit/hooks/useProfileEdit";
import Loading from "../components/Loading";

export default function Profile() {
    const [passwordConfirm, setpasswordConfirm] = useState("");
    
    const { user, setUser, loading, saving, saveUser, isDirty } = useProfileEdit();
    

    if (loading) return <Loading />;
    if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Container title="회원정보 수정" >

            <p className="text-sm text-gray-600 mb-4">현재 로그인된 사용자: <strong>{user.userID}</strong></p>

            <div className="flex items-center justify-center">
                <img
                src={user.image !== "" ? user.image : basicProfile}
                alt="profile"
                className="w-20 h-20 mb-4 rounded-full"
                />            
            </div>

            <div className="flex flex-col gap-5">

                {/* 아이디 */}
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-500">아이디</p>

                    <Input
                        value={user.userID}
                        readOnly
                        className="cursor-not-allowed bg-gray-100"
                    />
                </div>

                {/* 이름 + 학번 */}
                <div className="flex flex-col md:flex-row gap-5">

                    <div className="flex flex-col gap-1 flex-1">
                        <p className="text-xs text-gray-500">이름</p>

                        <Input
                            value={user.name}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <p className="text-xs text-gray-500">학번</p>

                        <Input
                            value={user.studentNumber}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    studentNumber: e.target.value,
                                })
                            }
                        />
                    </div>

                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-500">이메일</p>

                    <Input
                        value={user.email}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                email: e.target.value,
                            })
                        }
                    />
                </div>

                {/* 전화번호 */}
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-500">전화번호</p>

                    <Input
                        value={user.phoneNumber}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                phoneNumber: e.target.value,
                            })
                        }
                    />
                </div>

                {/* 비밀번호 + 비밀번호 확인 */}
                <div className="flex flex-col md:flex-row gap-5">

                    <div className="flex flex-col gap-1 flex-1">
                        <p className="text-xs text-gray-500">비밀번호</p>

                        <Input
                            type="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <p className="text-xs text-gray-500">비밀번호 확인</p>

                       <Input
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) =>
                                setpasswordConfirm(e.target.value)
                            }
                        />

                        {
                            passwordConfirm && (
                                <p
                                    className={`text-xs ${
                                        user.password === passwordConfirm
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {
                                        user.password === passwordConfirm
                                            ? "비밀번호가 일치합니다."
                                            : "비밀번호가 일치하지 않습니다."
                                    }
                                </p>
                            )
                        }
                    </div>

                </div>


                {/* 버튼 > 저장되는 조건 확인 로직 설계 필요 */}
                <div className="flex justify-end pt-2">
                    <button
                      onClick={saveUser}
                      disabled={saving || loading || !isDirty} 
                      className="px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                    >
                    {saving ? "저장 중..." : "저장"}
                    </button>
                </div>

            </div>
        </Container>
    </div>
  );
}
