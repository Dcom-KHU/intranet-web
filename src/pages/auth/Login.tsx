import axios from "axios";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdCheck, MdInfoOutline } from "react-icons/md";

import useLogin from "@/features/auth/hooks/useLogin";
import {
  getSavedLoginId,
  setSavedLoginId,
} from "@/features/auth/utils/auth-storage";

import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import InputLabel from "../../components/ui/InputLabel";
import { Button } from "../../components/ui/Button";
import dcomLogo from "../../assets/dcom-logo-black.png";
import { getApiErrorMessage } from "../../utils/api-error-message";




const loginMessages = {
  invalidCredentials: "아이디 또는 비밀번호가 올바르지 않습니다.",
  forbidden: "현재 로그인할 수 없는 계정입니다. 관리자에게 문의해주세요.",
  networkError: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};


const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const savedLoginId = getSavedLoginId();
  const [userID, setUserID] = useState(savedLoginId);
  const [password, setPassword] = useState("");
  const [saveLoginId, setSaveLoginId] = useState(Boolean(savedLoginId));
  const [loginMessage, setLoginMessage] = useState("");
  

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login.mutateAsync({
        loginId: userID,
        password,
        saveLoginId,
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
          setLoginMessage(
            getApiErrorMessage(error.response?.data) ?? loginMessages.forbidden,
          );
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
          <div className="mb-5">
            <InputLabel>비밀번호</InputLabel>
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearLoginMessage();
              }}
            />
          </div>

          <label className="mb-8 flex w-fit cursor-pointer items-center gap-1 text-xs text-gray-400">
            <span className="relative flex size-3 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={saveLoginId}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSaveLoginId(checked);
                  if (!checked) setSavedLoginId(null);
                }}
                className="peer size-3 cursor-pointer appearance-none rounded-[3px] border border-gray-300 bg-white transition-colors checked:border-[#0F2854] checked:bg-[#0F2854] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4988C4]/30"
              />
              {saveLoginId && (
                <MdCheck
                  className="pointer-events-none absolute text-white"
                  size={11}
                  aria-hidden="true"
                />
              )}
            </span>
            아이디 저장
          </label>

          {loginMessage && (
            <p className="mb-5 text-center text-xs text-red-500" role="alert">
              {loginMessage}
            </p>
          )}

          <Button 
            type="submit" 
            className="relative flex min-h-10 w-full items-center justify-center disabled:cursor-wait disabled:opacity-80"
            disabled={login.isPending}
            aria-busy={login.isPending}
          >
            <span className={login.isPending ? "invisible" : "visible"}>
              Login
            </span>
            {login.isPending && (
              <span
                className="absolute size-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                role="status"
                aria-label="로그인 처리 중"
              />
            )}
          </Button>

          <div className="mt-5 flex justify-center items-center text-xs text-gray-500">
            <span>Don't have an account?</span>

            <Link
              to="/register"
              className="
                ml-2
                underline
                text-blue-700
                hover:font-bold
              "
            >
              회원가입
            </Link>

            <span className="mx-2">|</span>

            <Link
              to="/forgot-password"
              className="
                underline
                text-blue-700
                hover:font-bold
              "
            >
              비밀번호 찾기
            </Link>
          </div>
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
