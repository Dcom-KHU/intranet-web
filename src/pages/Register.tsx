import Input from "../components/ui/Input";
import InputLabel from "../components/ui/InputLabel";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import dcomLogo from "../assets/dcom-logo-black.png";
import useRegisterForm from "../features/auth/hooks/useRegisterForm";

const ErrorMessage = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

const GreenCheck = () => (
  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500 text-base">
    ✓
  </span>
);

const Register = () => {
  const {
    name,
    studentNumber,
    userID,
    password,
    confirmPassword,
    email,
    emailCode,
    phoneNumber,
    errors,
    isUserIDValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isEmailVerified,
    registerModalType,
    handleNameChange,
    handleStudentNumberChange,
    handleUserIDChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handlePhoneNumberChange,
    handleCheckDuplicateId,
    handleSendEmailCode,
    handleVerifyEmailCode,
    handleRegister,
    handleGoLogin,
    closeRegisterModal,
    setEmailCode,
  } = useRegisterForm();

  const registerModalContent =
    registerModalType === "emailCodeSent"
      ? {
          badge: "인증 코드 발송",
          title: "인증 코드가 발송되었습니다.",
          description: (
            <>
              입력한 이메일로 인증 코드를 보냈습니다.
              <br />
              현재는 mock 인증이라 콘솔에서 코드를 확인해주세요.
            </>
          ),
          actionLabel: "확인",
          onAction: closeRegisterModal,
          labelledById: "email-code-sent-title",
        }
      : registerModalType === "registerFailed"
        ? {
            badge: "가입 실패",
            title: "회원가입에 실패했습니다.",
            description: (
              <>
                입력값을 다시 확인해주세요.
                <br />
                이미 사용 중인 아이디일 수 있습니다.
              </>
            ),
            actionLabel: "확인",
            onAction: closeRegisterModal,
            labelledById: "register-failed-title",
          }
        : registerModalType === "registerComplete"
          ? {
              badge: "승인 대기",
              title: "가입 신청이 완료되었습니다.",
              description: (
                <>
                  관리자가 회원 정보를 검토 중입니다.
                  <br />
                  승인이 완료되면 이메일로 안내해 드리며,
                  <br />그 이후 로그인하여 인트라넷을 이용하실 수 있습니다.
                </>
              ),
              actionLabel: "로그인 화면으로 돌아가기",
              onAction: handleGoLogin,
              labelledById: "signup-complete-title",
            }
          : null;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8">
        {/* <h2 className="mb-8 text-center text-xl font-bold">회원가입</h2> */}
        <img src={dcomLogo} alt="dcom-logo" className="mx-auto mb-3 h-16 w-auto "/>

        <form onSubmit={handleRegister}>
          <div className="mb-6 flex flex-row gap-3">
            <div className="flex-1">
              <InputLabel>이름</InputLabel>
              <Input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
              <ErrorMessage message={errors.name} />
            </div>

            <div className="flex-1">
              <InputLabel>학번</InputLabel>
              <Input
                type="text"
                placeholder="202X123456"
                value={studentNumber}
                onChange={(e) => handleStudentNumberChange(e.target.value)}
              />
              <ErrorMessage message={errors.studentNumber} />
            </div>
          </div>

          <div className="mb-6">
            <InputLabel>User ID</InputLabel>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter your user ID"
                  value={userID}
                  onChange={(e) => handleUserIDChange(e.target.value)}
                />
                {isUserIDValid && <GreenCheck />}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleCheckDuplicateId}
              >
                중복확인
              </Button>
            </div>
            <ErrorMessage message={errors.userID} />
          </div>

          <div className="mb-6">
            <InputLabel>비밀번호</InputLabel>
            <div className="relative">
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {isPasswordValid && <GreenCheck />}
            </div>
            <ErrorMessage message={errors.password} />
          </div>

          <div className="mb-8">
            <InputLabel>비밀번호 확인</InputLabel>
            <div className="relative">
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              />
              {isConfirmPasswordValid && <GreenCheck />}
            </div>
            <ErrorMessage message={errors.confirmPassword} />
          </div>

          <div className="mb-4">
            <InputLabel>이메일</InputLabel>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              <Button
                type="button"
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs"
                onClick={handleSendEmailCode}
              >
                인증
              </Button>
            </div>
            <ErrorMessage message={errors.email} />
          </div>

          <div className="mb-6">
            <InputLabel>인증 코드</InputLabel>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="인증 코드 입력"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                />
                {isEmailVerified && <GreenCheck />}
              </div>
              <Button
                type="button"
                variant="secondary"
                className="w-16 shrink-0 whitespace-nowrap p-3 text-xs transition-colors"
                onClick={handleVerifyEmailCode}
              >
                확인
              </Button>
            </div>
            <ErrorMessage message={errors.emailCode} />
          </div>

          <div className="mb-7">
            <InputLabel>전화번호</InputLabel>
            <Input
              type="text"
              placeholder="010-XXXX-XXXX"
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
            />
            <ErrorMessage message={errors.phoneNumber} />
          </div>

          <p className="mb-2 text-xs text-center text-gray-400">*위 정보들을 정확하게 입력해주세요. 승인 거절의 원인이 될 수 있습니다.</p>
          <Button type="submit" className="w-full text-sm mb-10">회원가입</Button>
        </form>
      </div>

      {registerModalContent && (
        <Modal
          isOpen
          badge={registerModalContent.badge}
          title={registerModalContent.title}
          description={registerModalContent.description}
          actionLabel={registerModalContent.actionLabel}
          onAction={registerModalContent.onAction}
          labelledById={registerModalContent.labelledById}
        />
      )}
    </div>
  );
};

export default Register;
