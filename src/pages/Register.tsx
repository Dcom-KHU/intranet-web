import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/utils/auth.utils";
import type { User } from "../features/auth/types/user.type";
import Input from "../components/ui/Input";
import InputLabel from "../components/ui/InputLabel";
import { Button } from "../components/ui/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userInput: User = {
      id: Date.now(),
      userID,
      password,
      studentNumber,
      email: "",
      name: "",
      phoneNumber: "",
      image: "",
      role: "USER",
    };

    const success = register(userInput);

    if (success) {
      alert("Register success. Please log in.");
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8">
        <h2 className="mb-8 text-center text-2xl font-bold">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="flex flex-row gap-3 mb-6">
            <div>
              <InputLabel>이름</InputLabel>
              <Input
                type="text"
                id="name"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <InputLabel>학번</InputLabel>
              <Input
                type="text"
                id="student-number"
                placeholder="학번"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <InputLabel>User ID</InputLabel>
            <div className="flex">
              <Input
                type="text"
                id="userID"
                placeholder="Enter your user ID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              />
              <Button 
                variant="secondary" 
                className="text-xs w-auto ml-3 whitespace-nowrap p-3"
              >
                중복확인
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <InputLabel>비밀번호</InputLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <InputLabel>이메일</InputLabel>
            <div className="flex">
              <Input
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                className="text-xs w-auto ml-3 whitespace-nowrap p-3"
              >
                인증
              </Button>
            </div>
          </div>

          <div className="mb-10">
            <InputLabel>전화번호</InputLabel>
            <Input
              type="text"
              id="phone-number"
              placeholder="전화번호를 010-XXXX-XXXX에 맞게 입력해주세요"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <Button type="submit"> Register </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
