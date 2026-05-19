import Container from "../components/ui/Container";
import Input from "../components/ui/Input";
import basicProfile from "../assets/basic_profile.png";
import { useProfileEdit } from "../features/profile-edit/useProfileEdit";

export default function Profile() {
    const { user, setUser, loading } = useProfileEdit();
    
    if (loading) return <div>loading...</div>;
    if (!user) return null;

  return (
    <div className="p-20">
        <Container title="회원정보 수정">

            <div className="flex items-center justify-center">
                <img
                src={user.image !== "" ? user.image : basicProfile}
                alt="profile"
                className="w-20 h-20 mb-4 rounded-full"
                />            
            </div>

            <Input
                value={user.username}
                readOnly
            />

            <Input
                value={user.email}
                onChange={(e) =>
                    setUser({
                    ...user,
                    email: e.target.value,
                    })
                }
            />
        </Container>
    </div>
  );
}