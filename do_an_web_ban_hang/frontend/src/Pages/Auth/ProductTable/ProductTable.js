import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./ProductTable.css"; // Đảm bảo tạo file CSS này

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch danh sách sản phẩm từ API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        params: {
          page: currentPage,
          search,
          category: categoryFilter,
          limit: 10,
        },
      });

      // console.log("Dữ liệu sản phẩm:", response.data.products); // Kiểm tra dữ liệu
      setProducts(response.data.products || []);
      setTotalPages(response.data.totalPages || 1);
      setErrorMessage(null);
    } catch (error) {
      console.error("Lỗi fetch sản phẩm:", error);
      setErrorMessage("Lỗi khi lấy danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, categoryFilter]);

  // Gọi fetchProducts khi trang hoặc tìm kiếm thay đổi
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Xử lý sự kiện xóa sản phẩm
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
      setErrorMessage("Lỗi khi xóa sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  // Bắt đầu chỉnh sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditFormData({ ...product });
    setSelectedImages([]);
    setErrorMessage(null);
  };

  // Cập nhật giá trị form chỉnh sửa
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => {
      const updatedFormData = { ...prev };

      // Chuyển đổi giá trị thành số
      const numericValue = parseFloat(value);

      // Xử lý thay đổi số lượng kho
      if (name === "stock") {
        const oldStock = parseFloat(prev.stock) || 0;
        const stockDifference = numericValue - oldStock;

        // Cập nhật số lượng trong kho
        updatedFormData.stock = numericValue;

        // Cập nhật số lượng còn lại: cộng thêm phần chênh lệch của kho
        const currentRemainingStock = parseFloat(prev.remainingStock) || 0;
        updatedFormData.remainingStock =
          currentRemainingStock + stockDifference;
      } else if (name === "remainingStock") {
        // Đảm bảo số lượng còn lại không vượt quá số lượng kho
        const currentStock = parseFloat(prev.stock) || 0;
        updatedFormData.remainingStock = Math.min(numericValue, currentStock);
      } else {
        updatedFormData[name] = value;
      }

      // Xử lý tính toán giá sau giảm
      if (name === "originalPrice" || name === "discountPercentage") {
        const originalPrice = parseFloat(updatedFormData.originalPrice);
        const discountPercentage = parseFloat(
          updatedFormData.discountPercentage
        );

        if (!isNaN(originalPrice) && !isNaN(discountPercentage)) {
          updatedFormData.priceAfterDiscount = (
            originalPrice *
            (1 - discountPercentage / 100)
          ).toFixed();
        }
      }

      return updatedFormData;
    });
  };

  // Xử lý khi người dùng chọn ảnh mới
  const handleImageChange = (e) => {
    setSelectedImages(e.target.files);
  };

  // Cập nhật sản phẩm
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Đảm bảo giá sau giảm được tính lại trước khi gửi
      const formData = new FormData();
      for (const key in editFormData) {
        if (key !== "images" && key !== "_id" && key !== "__v") {
          formData.append(key, editFormData[key]);
        }
      }
      if (selectedImages.length > 0) {
        for (let i = 0; i < selectedImages.length; i++) {
          formData.append("images", selectedImages[i]);
        }
      }

      await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      setErrorMessage("Lỗi khi cập nhật sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Cập nhật giá trị tìm kiếm
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm thay đổi
  };

  // Thay đổi bộ lọc category
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value); // Cập nhật bộ lọc category
    setCurrentPage(1); // Reset về trang 1 khi bộ lọc thay đổi
  };

  // Hiển thị giao diện
  return (
    <div>
      <div className="product-management-wrapper">
        <div className="text-center">
          <h1>Quản lý sản phẩm</h1>
        </div>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {/* Bộ lọc tìm kiếm và lọc theo chủng loại */}
        <input
          type="text"
          className="form-control product-search-input mb-3"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={handleSearchChange}
        />

        <div className="mb-3">
          <select
            className="form-control product-category-filter mb-2"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
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
        <div className="product-management">
          <div className="table-responsive">
            <div className="row">
              <div className="col-sm-12">
                <div className="product-container mt-3">
                  <table className="table table-bordered product-table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Chủng loại</th>
                        <th>Thương hiệu</th>
                        <th>Mô tả</th>
                        <th>Giá gốc</th>
                        <th>% giảm</th>
                        <th>GS giảm</th>
                        <th>SL Gốc</th>
                        <th>SL Còn</th>
                        <th>Hình ảnh</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product._id}>
                          {editingProduct?._id === product._id ? (
                            <td colSpan="12">
                              <form onSubmit={handleUpdateProduct}>
                                <input
                                  type="text"
                                  name="name"
                                  value={editFormData.name || ""}
                                  onChange={handleEditFormChange}
                                  className="form-control mb-2"
                                  placeholder="Tên sản phẩm"
                                />
                                <select
                                  name="category"
                                  value={editFormData.category || ""}
                                  onChange={handleEditFormChange}
                                  className="form-control mb-2"
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
                                  <option value="các loại trứng">
                                    Các loại trứng
                                  </option>
                                  <option value="đồ ăn đóng hộp">
                                    Đồ ăn đóng hộp
                                  </option>
                                  <option value="sữa">Sữa</option>
                                </select>
                                <textarea
                                  name="description"
                                  value={editFormData.description || ""}
                                  onChange={handleEditFormChange}
                                  className="form-control mb-2"
                                  placeholder="Mô tả sản phẩm"
                                  style={{ height: "100px" }}
                                />
                                <input
                                  type="number"
                                  name="originalPrice"
                                  value={editFormData.originalPrice || ""}
                                  onChange={handleEditFormChange}
                                  className="form-control mb-2"
                                  placeholder="Giá gốc"
                                />
                                <input
                                  type="number"
                                  name="discountPercentage"
                                  value={editFormData.discountPercentage || ""}
                                  onChange={handleEditFormChange}
                                  className="form-control mb-2"
                                  placeholder="Giảm giá (%)"
                                />
                                <input
                                  type="number"
                                  name="priceAfterDiscount"
                                  value={editFormData.priceAfterDiscount || ""}
                                  readOnly
                                  className="form-control mb-2"
                                  placeholder="Giá sau giảm"
                                />
                                <div className="form-group">
                                  <label>Số lượng trong kho:</label>
                                  <input
                                    type="number"
                                    name="stock"
                                    value={editFormData.stock || ""}
                                    onChange={handleEditFormChange}
                                    className="form-control mb-2"
                                    min="0"
                                    placeholder="Số lượng trong kho"
                                  />
                                  <small className="text-muted">
                                    Số lượng hiện tại: {editFormData.stock}
                                  </small>
                                </div>

                                <div className="form-group">
                                  <label>Số lượng còn lại:</label>
                                  <input
                                    type="number"
                                    name="remainingStock"
                                    value={editFormData.remainingStock || ""}
                                    onChange={handleEditFormChange}
                                    className="form-control mb-2"
                                    min="0"
                                    max={editFormData.stock}
                                    placeholder="Số lượng còn lại"
                                  />
                                  <small className="text-muted">
                                    Không thể vượt quá số lượng trong kho (
                                    {editFormData.stock})
                                  </small>
                                </div>
                                <input
                                  type="file"
                                  name="images"
                                  multiple
                                  onChange={handleImageChange}
                                  className="form-control mb-2"
                                />
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-sm mr-2"
                                  disabled={loading}
                                >
                                  {loading ? "Đang lưu..." : "Lưu"}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm"
                                  onClick={handleCancelEdit}
                                >
                                  Hủy
                                </button>
                              </form>
                            </td>
                          ) : (
                            <>
                              <td>{index + 1}</td>
                              <td>{product.name}</td>
                              <td>{product.category}</td>
                              <td>{product.brand}</td>
                              <td>{product.description}</td>
                              <td>{product.originalPrice}</td>
                              <td>{product.discountPercentage}%</td>
                              <td>{product.priceAfterDiscount}</td>
                              <td>{product.stock}</td>
                              <td>{product.remainingStock}</td>
                              <td>
                                {product.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={product.name}
                                    width="50"
                                    height="50"
                                    className="mr-2"
                                  />
                                ))}
                              </td>
                              <td>
                                <button
                                  className="btn btn-warning btn-sm mr-2"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  Chỉnh sửa
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleDeleteProduct(product._id)
                                  }
                                >
                                  Xóa
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hiển thị phân trang */}
        <div className="pagination">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            &laquo; Trước
          </button>

          {/* Hiển thị thông tin trang hiện tại và tổng số trang */}
          <span className="page-number">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Sau &raquo;
          </button>
        </div>
      </div>
      <br/>
    </div>
  );
};

export default ProductTable;
