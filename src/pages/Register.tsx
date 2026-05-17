import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth";


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        // 실제 회원가입 로직은 auth.ts의 register 함수를 호출
        const userInput = {
            id: username,
            pw: password,
            studentNumber: studentNumber || undefined,
        };
        const success = register(userInput);

        if (success) {
            alert("회원가입 성공! 로그인 페이지로 이동합니다.");
            navigate("/");
        }
    };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Username</label> 
                    <input 
                        className="w-full px-3 py-2 border rounded" 
                        type="text" 
                        id="username" 
                        placeholder="Enter your username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input 
                        className="w-full px-3 py-2 border rounded" 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />   
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="studentNumber">Student Number</label>
                    <input 
                        className="w-full px-3 py-2 border rounded" 
                        type="text" 
                        id="studentNumber" 
                        placeholder="Enter your student number" 
                        value={studentNumber} 
                        onChange={(e) => setStudentNumber(e.target.value)} />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">회원가입</button>
                
            </form>
      </div>
    </div>
  );
};

export default Register;
