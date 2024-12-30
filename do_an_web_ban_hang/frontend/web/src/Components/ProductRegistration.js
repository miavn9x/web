import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";

const ProductRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    discount: 0,
    image: "",
    imageLink: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Upload image to Cloudinary (this can be modified to your Cloudinary configuration)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      )
      .then((response) => {
        setFormData({
          ...formData,
          image: response.data.secure_url,
        });
      })
      .catch((err) => {
        setError("Lỗi khi tải ảnh lên");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalPrice = formData.price * (1 - formData.discount / 100); // Tính giá sau giảm

    try {
      const res = await axios.post("http://localhost:5000/api/products", {
        ...formData,
        finalPrice,
      });

      alert("Sản phẩm đã được đăng!");
    } catch (err) {
      setError("Lỗi khi đăng sản phẩm!");
    }
  };

  return (
    <div>
      <Typography variant="h4">Đăng Sản Phẩm</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên sản phẩm"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Thương hiệu"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mô tả sản phẩm"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Giá tiền"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phần trăm giảm giá"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography>
          Giá sau giảm: {formData.price * (1 - formData.discount / 100)}
        </Typography>

        <input type="file" onChange={handleImageChange} />
        {formData.image && <img src={formData.image} alt="Product" />}

        <TextField
          label="Link hình ảnh (tùy chọn)"
          name="imageLink"
          value={formData.imageLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Đăng sản phẩm
        </Button>
      </form>
    </div>
  );
};

export default ProductRegistration;
