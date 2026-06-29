import { useState, type ReactNode } from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { LuFileText, LuMessageCircle, LuChevronRight } from "react-icons/lu";

import Input from "../components/ui/Input";
import Loading from "../components/Loading";

import { useProfileEdit } from "../features/profile-edit/hooks/useProfileEdit";


type MenuID = "profile" | "password" | "posts" | "comments";

const menu: {
    id: MenuID;
    icon: ReactNode;
    label: string;
}[] = [
  { id: "profile", icon: <FiUser />, label: "개인정보" },
  { id: "password", icon: <HiOutlineLockClosed />, label: "비밀번호 변경" },
  { id: "posts", icon: <LuFileText />, label: "작성한 글" },
  { id: "comments", icon: <LuMessageCircle />, label: "작성한 댓글" },
] as const;

export default function MyPage() {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [selectedMenu, setSelectedMenu] = useState<MenuID>("profile");

    const { user, setUser, loading, saving, saveUser, isDirty } = useProfileEdit();
    

    if (loading) return <Loading />;
    if (!user) return null;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">마이 페이지</h1>
        <p className="mt-2 text-sm text-gray-500">
          내 정보와 활동 내역 관리
        </p>
      </section>

      <div className="flex flex-col gap-6 rounded-2xl bg-[#F8F9FC] p-10 lg:flex-row lg:items-stretch">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex gap-4">

            <Box className="flex-[3]">
                <LeftNav
                    menu={menu}
                    selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                />
            </Box>
            <Box className="flex-[7]">
                <PageContent
                    selectedMenu={selectedMenu}
                    user={user}
                    setUser={setUser}
                    passwordConfirm={passwordConfirm}
                    setPasswordConfirm={setPasswordConfirm}
                    saveUser={saveUser}
                    saving={saving}
                    loading={loading}
                    isDirty={isDirty}
                />
            </Box>
        
    </div>
    </div>
    </div>
    </div>
  );
}


interface LeftNavProps {
    menu: readonly {
        id: MenuID;
        icon: ReactNode;
        label: string;
    }[];
    selectedMenu: MenuID;
    setSelectedMenu: (id: MenuID) => void;
}

const LeftNav = ({
    menu,
    selectedMenu,
    setSelectedMenu,
}: LeftNavProps) => {
    return (
        <div className="space-y-3">
            {menu.map((item) => (
                <MenuItem
                    key={item.id}
                    icon={item.icon}
                    title={item.label}
                    selected={selectedMenu === item.id}
                    onClick={() => setSelectedMenu(item.id)}
                />
            ))}
        </div>
    );
};

interface MenuItemProps {
    icon: ReactNode;
    title: string;
    selected: boolean;
    onClick: () => void;
}

const MenuItem = ({
    icon,
    title,
    selected,
    onClick,
}: MenuItemProps) => {
    return (
        <div
            onClick={onClick}
            className={`
                flex items-center justify-between gap-2 p-4 rounded-xl cursor-pointer
                transition-all
                ${
                    selected
                        ? "border border-[#3d9bff] bg-[#E6F1FF] text-[#3d9bff]"
                        : "text-[#0F2854] hover:bg-gray-100"
                }
            `}
        >
            <div className="flex items-center gap-2">
                {icon}
                <p>{title}</p>
            </div>

            <LuChevronRight />
        </div>
    );
};

interface PageContentProps {
    selectedMenu: MenuID;
    user: any;
    setUser: (u: any) => void;
    passwordConfirm: string;
    setPasswordConfirm: (v: string) => void;
    saveUser: () => void;
    saving: boolean;
    loading: boolean;
    isDirty: boolean;
}

const PageContent = ({
    selectedMenu,
    user,
    setUser,
    passwordConfirm,
    setPasswordConfirm,
    saveUser,
    saving,
    loading,
    isDirty,
}: PageContentProps) => {
    const render: Record<MenuID, ReactNode> = {
        profile: (
            <ProfileContent
                user={user}
                setUser={setUser}
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
                saveUser={saveUser}
                saving={saving}
                loading={loading}
                isDirty={isDirty}
            />
        ),
        password: <div>비밀번호 변경 UI</div>,
        posts: <div>작성한 글 리스트</div>,
        comments: <div>작성한 댓글 리스트</div>,
    };

    return render[selectedMenu];
};

const ProfileContent = ({
    user,
    setUser,
    passwordConfirm,
    setPasswordConfirm,
    saveUser,
    saving,
    loading,
    isDirty,
}: any) => {
    return (
        <div>
            <p className="text-sm text-gray-600 mb-4">
                현재 로그인된 사용자: <strong>{user.userID}</strong>
            </p>

            <div className="flex flex-col gap-5">

                {/* 아이디 */}
                <Input value={user.userID} readOnly />

                {/* 이름 / 학번 */}
                <div className="flex flex-col md:flex-row gap-5">
                    <Input
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
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

                {/* 이메일 */}
                <Input
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                {/* 전화번호 */}
                <Input
                    value={user.phoneNumber}
                    onChange={(e) =>
                        setUser({ ...user, phoneNumber: e.target.value })
                    }
                />

                {/* 비밀번호 */}
                <div className="flex flex-col md:flex-row gap-5">
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

                    <div className="flex flex-col gap-1 flex-1">
                        <Input
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) =>
                                setPasswordConfirm(e.target.value)
                            }
                        />

                        {passwordConfirm && (
                            <p
                                className={`text-xs ${
                                    user.password === passwordConfirm
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {user.password === passwordConfirm
                                    ? "비밀번호가 일치합니다."
                                    : "비밀번호가 일치하지 않습니다."}
                            </p>
                        )}
                    </div>
                </div>

                {/* 저장 버튼 */}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={saveUser}
                        disabled={saving || loading || !isDirty}
                        className="px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-500"
                    >
                        {saving ? "저장 중..." : "저장"}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface BoxProps {
    children: ReactNode;
    className?: string;
}

const Box = ({ children, className = "" }: BoxProps) => {
    return (
        <div
            className={`
                border 
                border-[#B5D4F4] 
                p-6 
                rounded-2xl 
                space-y-3 
                bg-white 
                transition-all 
                duration-300 
                text-[#0F2854] 
                whitespace-nowrap
                ${className}
            `}
        >
            {children}
        </div>
    );
};