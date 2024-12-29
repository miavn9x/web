import React, { useState } from "react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hàm đăng ký người dùng
  const register = async () => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log("Đăng ký:", data);
  };

  // Hàm đăng nhập người dùng
  const login = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log("Đăng nhập:", data);
  };

  return (
    <div>
      <h1>Đăng ký hoặc Đăng nhập</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Đăng ký</button>
        <button onClick={login}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default AuthPage;
