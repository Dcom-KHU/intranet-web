import axios from "axios";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { MdInfoOutline } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import useLogin from "@/features/auth/hooks/useLogin";

import Input from "../../components/ui/Input";
import InputLabel from "../../components/ui/InputLabel";
import { Button } from "../../components/ui/Button";
import dcomLogo from "../../assets/dcom-logo-black.png";




const loginMessages = {
  invalidCredentials: "아이디 또는 비밀번호가 올바르지 않습니다.",
  pendingApproval: "가입 승인 대기 중입니다. 관리자 승인 후 로그인할 수 있습니다.",
  rejected: "가입이 승인되지 않은 계정입니다. 관리자에게 문의해주세요.",
  withdrawn: "탈퇴한 회원입니다. 다시 회원가입을 진행해주세요.",
  networkError: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};


const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login.mutateAsync({
        loginId: userID,
        password,
      });

      navigate(
        response.requirePasswordChange
          ? "/my-page?section=password"
          : "/home"
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          setLoginMessage(loginMessages.invalidCredentials);
          return;
        }

        if (status === 403) {
          setLoginMessage(loginMessages.withdrawn);
          return;
        }
      }

      setLoginMessage(loginMessages.networkError);
    }
  };


  const clearLoginMessage = () => setLoginMessage("");

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8">
        <img src={dcomLogo} alt="dcom-logo" className="mx-auto mb-6 block w-20" />
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <InputLabel>User ID</InputLabel>
            <Input
              type="text"
              id="user-id"
              placeholder="아이디를 입력하세요"
              value={userID}
              onChange={(event) => {
                setUserID(event.target.value);
                clearLoginMessage();
              }}
            />
          </div>
          <div className="mb-10">
            <InputLabel>비밀번호</InputLabel>
            <div className="relative">
              <Input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                className="pr-10"
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearLoginMessage();
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-400 hover:text-gray-600"
                aria-label="누르는 동안 비밀번호 보기"
                onPointerDown={() => setIsPasswordVisible(true)}
                onPointerUp={() => setIsPasswordVisible(false)}
                onPointerLeave={() => setIsPasswordVisible(false)}
                onPointerCancel={() => setIsPasswordVisible(false)}
                onBlur={() => setIsPasswordVisible(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setIsPasswordVisible(true);
                  }
                }}
                onKeyUp={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setIsPasswordVisible(false);
                  }
                }}
              >
                {isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {loginMessage && (
            <p className="mb-5 text-center text-xs text-red-500" role="alert">
              {loginMessage}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={login.isPending}
          >
            {login.isPending ? "Logging in..." : "Login"}
          </Button>

          <span className="mt-5 block text-center text-sm text-gray-500">
            Don't have an account?
            <a
              href="/register"
              className="ml-1 font-bold text-[#0F2854] hover:underline"
            >
              회원가입
            </a>
            <span className="mx-1">|</span>
            <a
              href="/forgot-password"
              className="font-bold text-[#0F2854] hover:underline"
            >
              비밀번호 찾기
            </a>
          </span>
        </form>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#EEEEEE] px-12 py-2 text-sm text-gray-400">
        <MdInfoOutline size={3} />
        관리자 승인 후 로그인이 가능합니다.
      </div>
    </div>
  );
};

export default Login;
