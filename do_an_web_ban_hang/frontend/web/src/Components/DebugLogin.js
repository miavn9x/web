import React, { useState } from "react";
import axios from "axios";

const DebugLogin = () => {
  const [username, setUsername] = useState("");
  const [debugData, setDebugData] = useState(null);

  const handleCheckUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/debug",
        {
          username,
        }
      );
      setDebugData(response.data);
    } catch (error) {
      setDebugData({ message: "Lỗi: Không thể lấy dữ liệu người dùng" });
    }
  };

  return (
    <div>
      <h1>Kiểm tra dữ liệu người dùng</h1>
      <input
        type="text"
        placeholder="Nhập username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleCheckUser}>Kiểm tra</button>
      {debugData && (
        <div>
          <h2>Kết quả:</h2>
          <pre>{JSON.stringify(debugData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DebugLogin;
