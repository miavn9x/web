import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddProduct.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    productGroup: "",
    brand: "",
    description: "",
    originalPrice: "",
    discountPercentage: "",
    priceAfterDiscount: "",
    discountCode: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));

    if (name === "originalPrice" || name === "discountPercentage") {
      const priceAfterDiscount =
        Number(product.originalPrice) *
          (1 - Number(product.discountPercentage) / 100) || "";
      setProduct((prevState) => ({
        ...prevState,
        priceAfterDiscount: priceAfterDiscount,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const checkDuplicate = async (newProduct) => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        params: {
          name: newProduct.name,
          brand: newProduct.brand,
          category: newProduct.category,
        },
      });
      return response.data.products.some(
        (product) =>
          product.name === newProduct.name &&
          product.brand === newProduct.brand &&
          product.category === newProduct.category
      );
    } catch (error) {
      console.error("Error checking for duplicates", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = await checkDuplicate(product);
    if (isDuplicate) {
      setErrorMessage("Sản phẩm với thông tin này đã tồn tại.");
      return;
    }

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
          productGroup: "",
          brand: "",
          description: "",
          originalPrice: "",
          discountPercentage: "",
          priceAfterDiscount: "",
          discountCode: "",
        });
        setSelectedImages([]);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setSuccessMessage("");
      setErrorMessage("Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-9">
          <div>
            <h4 className="text-center mb-4">Thêm Sản Phẩm Mới</h4>
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
                      <option value="gạo">gạo</option>
                      <option value="mì ăn liền">mì ăn liền</option>
                      <option value="đồ khô">đồ khô</option>
                      <option value="các loại trứng">các loại trứng</option>
                      <option value="đồ ăn đóng hộp">đồ ăn đóng hộp</option>
                      <option value="sữa">sữa</option>
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
                    />
                  </div>
                  {/* <div className="form-group">
                    <label>Nhóm sản phẩm</label>
                    <select
                      name="productGroup"
                      className="form-control"
                      value={product.productGroup}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn nhóm sản phẩm</option>
                      <option value="thịt & hải sản">Thịt & Hải sản</option>
                      <option value="rau & trái cây">Rau & Trái cây</option>
                      <option value="bánh kẹo">Bánh kẹo</option>
                      <option value="gia vị">Gia vị</option>
                      <option value="Đồ uống">Đồ uống</option>
                      <option value="giao dạch">Giao dạch</option>
                      <option value="thư viện">Thư viện</option>
                    </select>
                  </div> */}
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
                </div>

                <div className="col-md-6">
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
                  <div className="form-group" style={{marginTop: "46px"}}>
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
              <div className="justify-content-center d-flex" style={{paddingBottom: "40px"}}>
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-4"
                >
                  Thêm sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
