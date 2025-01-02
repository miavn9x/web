import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submitting a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts", // Assuming you have a backend API at this endpoint
        newPost
      );
      setMessage("Bài đăng đã được tạo!");
      setPosts((prev) => [...prev, response.data]); // Add the new post to the list
      setNewPost({ title: "", content: "" }); // Reset form
    } catch (error) {
      setMessage("Đã có lỗi xảy ra khi đăng bài.");
    }
  };

  return (
    <div className="post-management">
      <h2>Quản lý Bài Đăng</h2>
      {message && <div className="message">{message}</div>}

      {/* Form to add a new post */}
      <form onSubmit={handleSubmit} className="post-form">
        <div className="input-group">
          <label htmlFor="title">Tiêu đề bài viết</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề bài viết"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="content">Nội dung bài viết</label>
          <textarea
            id="content"
            name="content"
            value={newPost.content}
            onChange={handleChange}
            placeholder="Nhập nội dung bài viết"
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Đăng bài
        </button>
      </form>

      {/* List of existing posts (optional) */}
      <div className="post-list">
        <h3>Bài Đã Đăng</h3>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostManagement;
