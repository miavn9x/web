import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Tạo bài viết thành công!");
    } catch (err) {
      setError("Lỗi khi tạo bài viết!");
    }
  };

  return (
    <div>
      <Typography variant="h4">Tạo Bài Viết</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tiêu đề bài viết"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nội dung bài viết"
          name="content"
          value={formData.content}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Tạo bài viết
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
