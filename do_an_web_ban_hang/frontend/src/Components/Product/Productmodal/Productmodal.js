import { Button, Dialog } from "@mui/material";
import { IoCloseCircleSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import "./Productmodal.css";
import QuantityBox from "../../common/QuantityBox";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorites } from "../../../../src/redux/actions";
import { formatter } from "../../../utils/fomater"; // Đảm bảo bạn nhập đúng đường dẫn

const ProductModal = (props) => {
  const { product } = props; // Nhận product từ props
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  // Lấy tối đa 3 ảnh từ mảng images
  const displayImages = product.images.slice(0, 3);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // Cấu hình cho slider hình ảnh lớn
  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Cấu hình cho slider hình ảnh thu nhỏ
  const settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  // Chuyển đến ảnh khác khi chọn trong slider thu nhỏ
  const goTo = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
    alert("Sản phẩm đã được thêm vào giỏ hàng");
  };

  // Xử lý thêm vào yêu thích
  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
    alert("Sản phẩm đã được thêm vào mục yêu thích");
  };

  // Xử lý mua ngay
  const handleBuyNow = () => {
    alert("Mua ngay!");
    // navigate("/checkout"); // Điều hướng đến trang thanh toán (nếu có)
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

      <hr />

      <div className="row mt-2 product__modal__content">
        {/* Phần hình ảnh */}
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

        {/* Phần thông tin sản phẩm */}
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
              >
                <FaRegHeart /> &nbsp; Thêm vào yêu thích
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
    </Dialog>
  );
};

export default ProductModal;
