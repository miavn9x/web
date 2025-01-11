import { Button, Dialog } from "@mui/material";
import { IoCloseCircleSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import "./Productmodal.css";
import QuantityBox from "../../common/QuantityBox";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorites } from "../../../../src/redux/actions";
import { formatter } from "../../../utils/fomater";

const ProductModal = (props) => {
  const { product } = props; // Nhận product từ props
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  // Lấy tối đa 3 ảnh từ mảng images
  const displayImages = product.images.slice(0, 3);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  var settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  var settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    false: false,
    arrows: true,
  };

  const goTo = (index) => {
    zoomSlider.current.slickGoTo(index);
    zoomSliderBig.current.slickGoTo(index);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
    alert("Sản phẩm đã được thêm vào giỏ hàng");
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
    alert("Sản phẩm đã được thêm vào mục yêu thích");
  };

  const handleBuyNow = () => {
    // Giả sử bạn có một hàm để tiến hành thanh toán hoặc điều hướng đến trang thanh toán
    alert("Mua ngay!");
    // navigate("/checkout"); // Điều hướng đến trang thanh toán (nếu có)
  };

  return (
    <Dialog
      open={true}
      className="product__modal"
      onClose={() => props.CloseProductModal()}
    >
      <Button className="close__" onClick={() => props.CloseProductModal()}>
        <IoCloseCircleSharp />
      </Button>
      <h4 className="mb-2 font-weight-bold text-uppercase">{product.name}</h4>
      <div className="d-flex align-items-center ">
        <div className="d-flex align-items-center mr-4 ">
          <span>Thương hiệu: </span>

          <span className="ml-2">
            <b>&nbsp; {product.brand}</b>
          </span>
        </div>
        <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
        <Rating
          name="read-only"
          value={product.rating}
          size="small"
          readOnly
          precision={0.5}
        />
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
          <div className="d-flex align-items-center ">
            <span className="badge__badge bg-success">{product.category}</span>

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
    </Dialog>
  );
};

export default ProductModal;
