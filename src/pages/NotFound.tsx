import { MdOutlineSearchOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import dcomLogo from "../assets/dcom-logo-black.png";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md text-center">
        <img
          src={dcomLogo}
          alt="DCOM"
          className="mx-auto mb-10 w-20"
        />

        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#F3F6FB] text-[#4988C4]">
          <MdOutlineSearchOff size={32} aria-hidden="true" />
        </div>

        <p className="mb-3 text-sm font-semibold text-[#4988C4]">
          404 NOT FOUND
        </p>
        <h1 className="text-2xl font-bold text-[#0F2854]">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-sm leading-6 text-gray-500">
          주소가 잘못되었거나 페이지가 이동 또는 삭제되었습니다.
          <br />
          주소를 다시 확인해 주세요.
        </p>

        <Button
          type="button"
          variant="secondary"
          className="mt-9 px-8"
          onClick={() => navigate("/", { replace: true })}
        >
          로그인 화면으로 돌아가기
        </Button>
      </section>
    </main>
  );
}
