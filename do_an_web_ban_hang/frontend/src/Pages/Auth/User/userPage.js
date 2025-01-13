import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userPage.css"; // Import file CSS

function UserPage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [editData, setEditData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });
  const [error, setError] = useState({
    general: null,
    password: {
      currentPassword: null,
      newPassword: null,
    },
  });
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError((prevError) => ({
        ...prevError,
        general: "Token không tồn tại. Vui lòng đăng nhập lại.",
      }));
      return;
    }

    axios
      .get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setEditData({
          fullName: response.data.fullName,
          phone: response.data.phone,
          address: response.data.address,
          email: response.data.email,
        });
      })
      .catch((err) => {
        setError((prevError) => ({
          ...prevError,
          general: "Không thể lấy thông tin người dùng. Vui lòng thử lại sau.",
        }));
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError({
        ...error,
        general: "Token không tồn tại. Vui lòng đăng nhập lại.",
      });
      return;
    }

    axios
      .put("http://localhost:5000/api/user/profile", editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setIsEditing(false);
        setSuccessMessage("Cập nhật thông tin thành công!");
        setError({
          general: null,
          password: { currentPassword: null, newPassword: null },
        });
      })
      .catch((err) => {
        setError({
          ...error,
          general: "Không thể cập nhật thông tin người dùng.",
        });
      });
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();

    setError({
      ...error,
      password: {
        currentPassword: null,
        newPassword: null,
      },
    });

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setError({
        ...error,
        password: {
          ...error.password,
          newPassword: "Vui lòng nhập mật khẩu cũ và mật khẩu mới.",
        },
      });
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setError({
        ...error,
        password: {
          ...error.password,
          newPassword: "Mật khẩu mới không thể giống mật khẩu cũ.",
        },
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError({
        ...error,
        general: "Token không tồn tại. Vui lòng đăng nhập lại.",
      });
      return;
    }

    const data = {
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    };

    axios
      .put("http://localhost:5000/api/user/profile/password", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccessMessage("Đổi mật khẩu thành công!");
        setIsChangingPassword(false);
        setPasswordData({ currentPassword: "", newPassword: "" });
        setError({
          general: null,
          password: { currentPassword: null, newPassword: null },
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError({
            ...error,
            password: {
              ...error.password,
              currentPassword: "Mật khẩu cũ không đúng.",
            },
          });
        } else {
          setError({
            ...error,
            password: {
              ...error.password,
              newPassword: "Không thể thay đổi mật khẩu.",
            },
          });
        }
      });
  };

  if (error.general) {
    return <div className="alert alert-danger">{error.general}</div>;
  }

  if (!user) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="user-page container mt-5">
      <h2>Thông tin cá nhân</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {isEditing ? (
        <form onSubmit={handleSubmitEdit}>
          <div className="mb-3">
            <label className="form-label">Họ và Tên</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={editData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={editData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={editData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={editData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Lưu thay đổi
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p>
            <strong>Họ và tên:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {user.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {user.address}
          </p>
          <div className="button-group">
            <button
              className="btn btn-warning"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      )}

      <h3 className="mt-5">Đổi mật khẩu</h3>
      {isChangingPassword ? (
        <form onSubmit={handleSubmitPasswordChange}>
          <div className="mb-3">
            <label className="form-label">Mật khẩu hiện tại</label>
            <input
              type="password"
              className={`form-control ${error.password.currentPassword ? "is-invalid" : ""}`}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            {error.password.currentPassword && (
              <div className="invalid-feedback">
                {error.password.currentPassword}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu mới</label>
            <input
              type="password"
              className={`form-control ${error.password.newPassword ? "is-invalid" : ""}`}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            {error.password.newPassword && (
              <div className="invalid-feedback">
                {error.password.newPassword}
              </div>
            )}
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Đổi mật khẩu
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsChangingPassword(false);
                setError({
                  ...error,
                  password: { currentPassword: null, newPassword: null },
                });
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <div className="button-group">
          <button
            className="btn btn-warning"
            onClick={() => setIsChangingPassword(true)}
          >
            Đổi mật khẩu
          </button>
        </div>
      )}
    </div>
  );
}

export default UserPage;
