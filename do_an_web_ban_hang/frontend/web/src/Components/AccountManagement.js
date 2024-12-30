import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const AccountManagement = ({ user }) => {
  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: "",
    newPassword: "",
  });
  const [error, setError] = useState("");

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý gửi form sửa thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Cập nhật thành công!");
    } catch (err) {
      setError("Lỗi khi cập nhật tài khoản!");
    }
  };

  return (
    <div>
      <Typography variant="h4">Quản lý Tài Khoản</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Mật khẩu cũ"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mật khẩu mới"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default AccountManagement;
