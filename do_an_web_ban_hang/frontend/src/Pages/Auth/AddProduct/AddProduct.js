import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    originalPrice: "",
    discountPercentage: "",
    priceAfterDiscount: "",
    discountCode: "",
    stock: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => {
      const updatedProduct = { ...prevState, [name]: value };

      if (name === "originalPrice" || name === "discountPercentage") {
        let discountPercentage = Number(updatedProduct.discountPercentage) || 0;
        if (discountPercentage < 0 || discountPercentage >= 100) {
          discountPercentage = 0;
        }

        const originalPrice = Number(updatedProduct.originalPrice) || 0;
        const priceAfterDiscount =
          originalPrice - (originalPrice * discountPercentage) / 100;

        updatedProduct.discountPercentage = discountPercentage.toString();
        updatedProduct.priceAfterDiscount =
          priceAfterDiscount > 0 ? priceAfterDiscount.toFixed() : "";
      }

      return updatedProduct;
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Sản phẩm đã được thêm thành công!");
        setErrorMessage("");
        setProduct({
          name: "",
          category: "",
          brand: "",
          description: "",
          originalPrice: "",
          discountPercentage: "",
          priceAfterDiscount: "",
          discountCode: "",
          stock: "",
        });
        setSelectedImages([]);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setSuccessMessage("");
      setErrorMessage(
        error.response?.data?.message || "Có lỗi xảy ra khi thêm sản phẩm."
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h4 className="text-center mb-4 text-uppercase mt-5">
            Thêm Sản Phẩm Mới
          </h4>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Tên sản phẩm"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Chủng loại</label>
                  <select
                    name="category"
                    className="form-control"
                    value={product.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn chủng loại</option>
                    <option value="thịt">Thịt</option>
                    <option value="cá">Cá</option>
                    <option value="rau">Rau</option>
                    <option value="gia vị">Gia vị</option>
                    <option value="Đồ uống">Đồ uống</option>
                    <option value="gạo">Gạo</option>
                    <option value="mì ăn liền">Mì ăn liền</option>
                    <option value="đồ khô">Đồ khô</option>
                    <option value="các loại trứng">Các loại trứng</option>
                    <option value="đồ ăn đóng hộp">Đồ ăn đóng hộp</option>
                    <option value="sữa">Sữa</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mô tả chi tiết</label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Mô tả chi tiết"
                    value={product.description}
                    onChange={handleInputChange}
                    required
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Thương hiệu</label>
                  <input
                    type="text"
                    name="brand"
                    className="form-control"
                    placeholder="Thương hiệu"
                    value={product.brand}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giá gốc</label>
                  <input
                    type="number"
                    name="originalPrice"
                    className="form-control"
                    placeholder="Giá gốc"
                    value={product.originalPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giảm giá (%)</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    className="form-control"
                    placeholder="Giảm giá (%)"
                    value={product.discountPercentage}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Giá sau khi giảm</label>
                  <input
                    type="number"
                    name="priceAfterDiscount"
                    className="form-control"
                    placeholder="Giá sau khi giảm"
                    value={product.priceAfterDiscount}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Số lượng trong kho</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="Số lượng trong kho"
                    value={product.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Chọn ảnh sản phẩm</label>
                  <input
                    type="file"
                    multiple
                    className="form-control-file"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="text-center j">
              <button type="submit" className="btn btn-success btn-block mt-4">
                Thêm sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
