
import React, { useRef, useState, useEffect } from "react";
import { Button, Dialog, Snackbar } from "@mui/material";
import { IoCloseCircleSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux1/actions/cartActions";
import QuantityBox from "../../common/QuantityBox";
import { formatter } from "../../../utils/fomater";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Hook để lấy location và điều hướng
import "./Productmodal.css";

const ProductModal = (props) => {
  const { product } = props;
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [notification, setNotification] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Thêm state cho Snackbar

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook điều hướng
  const location = useLocation(); // Hook để lấy đường dẫn hiện tại

  const displayImages = product.images.slice(0, 3);

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  const goTo = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

const handleAddToCart = () => {
  const token = localStorage.getItem("token"); // Lấy token của người dùng từ localStorage

  if (!token) {
    localStorage.setItem("redirectUrl", location.pathname); // Lưu URL hiện tại
    navigate("/login"); // Chuyển hướng đến trang đăng nhập
    return;
  }

  console.log("Sản phẩm truyền vào handleAddToCart:", product);

  // Gọi action Redux để thêm sản phẩm vào giỏ hàng
  dispatch(addToCart(product, quantity));

  // Hiển thị thông báo sản phẩm đã được thêm vào giỏ hàng
  setNotification("Sản phẩm đã được thêm vào giỏ hàng");
  setSnackbarOpen(true); // Mở thông báo
  setTimeout(() => setSnackbarOpen(false), 3000); // Tự động tắt thông báo sau 3 giây
};



  const handleAddToFavorites = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Lưu URL hiện tại vào localStorage trước khi chuyển hướng đến trang đăng nhập
      localStorage.setItem("redirectUrl", location.pathname);
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
      return;
    }

    if (isFavorited) {
      setNotification("Sản phẩm đã có trong yêu thích.");
      setSnackbarOpen(true); // Mở Snackbar
      setTimeout(() => setSnackbarOpen(false), 5000); // Ẩn thông báo sau 5 giây
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/favorites",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsFavorited(true);
        setNotification("Sản phẩm đã được thêm vào mục yêu thích.");
        setSnackbarOpen(true); // Mở Snackbar
        setTimeout(() => setSnackbarOpen(false), 5000); // Ẩn thông báo sau 5 giây
      })
      .catch((err) => {
        setNotification("Đã xảy ra lỗi khi thêm sản phẩm vào yêu thích.");
        setSnackbarOpen(true); // Mở Snackbar
        setTimeout(() => setSnackbarOpen(false), 5000); // Ẩn thông báo sau 5 giây
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:5000/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const isProductInFavorites = response.data.favorites.some(
            (favProduct) => favProduct._id === product._id
          );
          setIsFavorited(isProductInFavorites);
        })
        .catch((err) => {
          console.error("Lỗi khi kiểm tra yêu thích", err);
        });
    }
  }, [product._id]);

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectUrl", location.pathname);
      navigate("/login");
      return;
    }

    setNotification("Mua ngay!");
    setSnackbarOpen(true); // Mở Snackbar
    setTimeout(() => setSnackbarOpen(false), 5000); // Ẩn thông báo sau 5 giây
  };

  return (
    <Dialog
      open={true}
      className="product__modal"
      onClose={() => props.CloseProductModal()}
    >
      {/* Nút đóng modal */}
      <Button className="close__" onClick={() => props.CloseProductModal()}>
        <IoCloseCircleSharp />
      </Button>

      <h4 className="mb-2 font-weight-bold text-uppercase">{product.name}</h4>

      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Thương hiệu: </span>
          <span className="ml-2">
            <b>&nbsp; {product.brand}</b>
          </span>
        </div>
        <Rating
          name="read-only"
          value={product.rating || 0}
          size="small"
          readOnly
          precision={0.5}
        />
      </div>

      {/* Thông báo lỗi */}
      <div className="notification-message justify-content-center text-center text-danger">
        {notification && <span>{notification}</span>}
      </div>
      <hr />

      <div className="row mt-2 product__modal__content">
        <div className="col-md-5">
          <div className="product__modal__zoom position-relative">
            <div className="badge badge-primary bg-primary">
              -{product.discountPercentage}%
            </div>
            <Slider {...settings} className="zoomSliderBig" ref={zoomSliderBig}>
              {displayImages.map((image, index) => (
                <div className="item" key={index}>
                  <InnerImageZoom zoomType="hover" zoomScale={1} src={image} />
                </div>
              ))}
            </Slider>
          </div>

          <Slider {...settings1} className="zoomSlider" ref={zoomSlider}>
            {displayImages.map((image, index) => (
              <div className="item" key={index}>
                <img
                  src={image}
                  className="w-100"
                  alt={`zoom-${index}`}
                  onClick={() => goTo(index)}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="col-md-7">
          <p className="mt-3">{product.description}</p>

          <div className="product__modal__box">
            <div className="d-flex align-items-center">
              <span className="badge__badge bg-success">
                {product.category}
              </span>

              <Button
                className="btn-round text-uppercase add_to_favorites"
                variant="outlined"
                onClick={handleAddToFavorites}
                color={isFavorited ? "red" : "gray"}
              >
                <FaRegHeart size={20} /> &nbsp; Thêm vào yêu thích
              </Button>
            </div>

            <div className="d-flex info__product align-items-center mb-4">
              <span className="product__price text-decoration-line-through opacity-50">
                {formatter(product.originalPrice)}
              </span>
              <span className="product__price__old text-danger fs-5 fw-bold">
                {formatter(product.priceAfterDiscount)}
              </span>
            </div>

            <div className="d-flex align-items-center">
              <QuantityBox quantity={quantity} setQuantity={setQuantity} />

              <button
                className="btn__add__cart custom-btn"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>

              <button className="btn__buy" onClick={handleBuyNow}>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={notification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Dialog>
  );
};

export default ProductModal;
