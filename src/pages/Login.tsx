import { useState } from "react";
import type { FormEvent } from "react";
import { login } from "../features/auth/utils/auth.utils";
import { useNavigate } from "react-router-dom";
import Infoicon from "../assets/icon/info.png"
import Input from "../components/ui/Input";
import InputLabel from "../components/ui/InputLabel";
import { Button } from "../components/ui/Button";

const Login = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 실제 로그인 로직은 auth.utils.ts의 login 함수를 호출
    const success = login(userID, password);

    if (success) {
      navigate("/home");
    } else {
      alert("로그인 실패!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 bg-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-6">
                    <InputLabel>User ID</InputLabel>
                    <Input 
                        type="text" 
                        id="user-id" 
                        placeholder="아이디를 입력하세요" 
                        value={userID} 
                        onChange={(e) => setUserID(e.target.value)} />
                </div>
                <div className="mb-8">
                    <InputLabel>비밀번호</InputLabel>
                    <Input 
                        type="password" 
                        id="password" 
                        placeholder="비밀번호를 입력하세요" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />   
                </div>
                <Button type="submit">Login</Button>
                <span className="text-sm text-gray-500 mt-5 block text-center">
                    Don't have an account? 
                    <a 
                      href="/register" 
                      className="text-[#0F2854] hover:underline font-bold ml-1"
                    >
                        Register here
                    </a>
                </span>
            </form>
        </div>

        <div className="p-2 pr-12 pl-12 rounded-xl mt-10 bg-[#EEEEEE] text-gray-400 text-sm flex flex-row items-center gap-2">
            <img src={Infoicon} alt="warning" className="w-3 h-3"/>
            관리자 승인 후 인트라넷 이용이 가능합니다
        </div>
    </div>
    );
};

export default Login;
