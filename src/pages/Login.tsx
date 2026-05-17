import { useState } from "react";
import type { FormEvent } from "react";
import { login } from "../features/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 실제 로그인 로직은 auth.ts의 login 함수를 호출
    const success = login(username, password);

    if (success) {
      navigate("/home");
    } else {
      alert("로그인 실패!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin}>
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
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">Login</button>
                <span className="text-sm text-gray-500 mt-5 block text-center">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </span>
            </form>
        </div>
    </div>
    );
};

export default Login;
