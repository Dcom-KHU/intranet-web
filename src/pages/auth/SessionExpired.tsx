import { MdOutlineLockClock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import dcomLogo from "../../assets/dcom-logo-black.png";
import { Button } from "../../components/ui/Button";

export default function SessionExpired() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md text-center">
        <img
          src={dcomLogo}
          alt="DCOM"
          className="mx-auto mb-10 w-20"
        />

        <p className="mb-3 text-sm font-semibold text-[#4988C4]">
          SESSION EXPIRED
        </p>
        <h1 className="text-2xl font-bold text-[#0F2854]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-sm leading-6 text-gray-500">
          로그인 세션이 만료되어 요청하신 페이지를 표시할 수 없습니다.
          <br />
          다시 로그인한 후 이용해 주세요.
        </p>

        <Button
          type="button"
          variant="secondary"
          className="mt-9 px-8"
          onClick={() => navigate("/", { replace: true })}
        >
          로그인하러 돌아가기
        </Button>
      </section>
    </main>
  );
}
