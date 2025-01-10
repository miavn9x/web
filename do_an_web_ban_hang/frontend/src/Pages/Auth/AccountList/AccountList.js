import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner, Alert, Table } from "react-bootstrap";
import "./AccountList.css";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableAccount, setEditableAccount] = useState(null);

  // Lấy danh sách tài khoản từ backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAccounts(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Đã xảy ra lỗi khi lấy danh sách tài khoản."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  // Xử lý khi bấm nút "Chỉnh sửa"
  const handleEdit = (account) => {
    setEditableAccount({ ...account });
  };

  // Xử lý thay đổi dữ liệu trong form chỉnh sửa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý cập nhật tài khoản
  const handleUpdate = async () => {
    if (!editableAccount) return;
    try {
      await axios.put(
        `http://localhost:5000/api/users/${editableAccount._id}`,
        editableAccount,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account._id === editableAccount._id ? editableAccount : account
        )
      );
      setEditableAccount(null); // Đặt lại trạng thái sau khi lưu
    } catch (error) {
      alert(
        error.response?.data?.message || "Đã xảy ra lỗi khi cập nhật tài khoản."
      );
    }
  };

  // Xử lý xóa tài khoản
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAccounts((prevAccounts) =>
          prevAccounts.filter((account) => account._id !== id)
        );
      } catch (error) {
        alert(
          error.response?.data?.message || "Đã xảy ra lỗi khi xóa tài khoản."
        );
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Quản Lý Tài Khoản</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Đang tải...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="account-table">
            <thead className="thead-dark">
              <tr>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Họ và Tên</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account._id}>
                  <td>
                    {editableAccount && editableAccount._id === account._id ? (
                      <input
                        type="text"
                        name="username"
                        value={editableAccount.username}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      account.username
                    )}
                  </td>
                  <td>
                    {editableAccount && editableAccount._id === account._id ? (
                      <input
                        type="email"
                        name="email"
                        value={editableAccount.email}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      account.email
                    )}
                  </td>
                  <td>
                    {editableAccount && editableAccount._id === account._id ? (
                      <input
                        type="text"
                        name="fullName"
                        value={editableAccount.fullName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      account.fullName
                    )}
                  </td>
                  <td>
                    {editableAccount && editableAccount._id === account._id ? (
                      <input
                        type="text"
                        name="phone"
                        value={editableAccount.phone}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      account.phone
                    )}
                  </td>
                  <td>
                    {editableAccount && editableAccount._id === account._id ? (
                      <input
                        type="text"
                        name="address"
                        value={editableAccount.address}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      account.address
                    )}
                  </td>
                  <td>
                    {editableAccount && editableAccount._id === account._id ? (
                      <input
                        type="text"
                        name="role"
                        value={editableAccount.role}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      account.role
                    )}
                  </td>
                  <td>
                    {editableAccount && editableAccount._id === account._id ? (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleUpdate}
                      >
                        Lưu
                      </Button>
                    ) : (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(account)}
                      >
                        Chỉnh sửa
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDelete(account._id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AccountList;
