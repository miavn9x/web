import { Button, Dialog } from "@mui/material";
import { IoCloseCircleSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from "react-slick";
import "./Productmodal.css";
import QuantityBox from "../../common/QuantityBox";
import { formatter } from "../../../utils/fomater";
import { FaRegHeart } from "react-icons/fa6";const ProductModal = (props) => {
  const zoomSliderBig = useRef();
  var settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const zoomSlider = useRef();
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
  return (
    <>
      <Dialog
        open={true}
        className="product__modal"
        onClose={() => props.CloseProductModal()}
      >
        <Button className="close__" onClick={() => props.CloseProductModal()}>
          <IoCloseCircleSharp />
        </Button>
        <h4 className="mb-2 font-weight-bold text-uppercase">ten san pham</h4>
        <div className="d-flex align-items-center ">
          <div className="d-flex align-items-center mr-4 ">
            <span>Thương hiệu: </span>
            <span className="ml-2">
              <b>&nbsp; Tên thương hiệu</b>
            </span>
          </div>
          <div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
          <Rating
            name="read-only"
            value={2.5}
            size="small"
            readOnly
            precision={0.5}
          />
        </div>
        <hr />

        <div className="row mt-2 product__modal__content">
          <div className="col-md-5">
            <div className="product__modal__zoom position-relative">
              <div className="badge badge-primary bg-primary">20%</div>
              <Slider
                {...settings}
                className="zoomSliderBig"
                ref={zoomSliderBig}
              >
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3357/332549/bhx/bs9a9244-1_202412100924093485.jpg`}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3357/332549/bhx/bs9a9251-1_202412100924084560.jpg`}
                  />
                </div>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    src={`https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3357/332549/bhx/bs9a9247-1_202412100924089042.jpg`}
                  />
                </div>
              </Slider>
            </div>
            <Slider {...settings1} className="zoomSlider" ref={zoomSlider}>
              <div className="item">
                <img
                  src={`https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3357/332549/bhx/bs9a9244-1_202412100924093485.jpg`}
                  className="w-100"
                  alt="zoom"
                  onClick={() => goTo(0)}
                />
              </div>
              <div className="item">
                <img
                  src={`https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3357/332549/bhx/bs9a9251-1_202412100924084560.jpg`}
                  className="w-100"
                  onClick={() => goTo(1)}
                  alt="zoom"
                />
              </div>
              <div className="item">
                <img
                  src={`https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3357/332549/bhx/bs9a9247-1_202412100924089042.jpg`}
                  className="w-100"
                  alt="zoom"
                  onClick={() => goTo(2)}
                />
              </div>
            </Slider>
          </div>
          <div className="col-md-7">
            <p className="mt-3">
              Siêu phẩm sữa bắp non cửa thương hiệu sữa từ hạt LOF được tách
              hoàn toàn 100% từ trái bắp non mới hái, giàu vitamin và chất xơ,
              tốt cho làn da, cho hệ tiêu hoá. Thùng 24 hộp sữa bắp non LOF
              180ml hương vị bắp thơm ngon, cùng dạng thùng tiện lợi và tiết
              kiệm, phù hợp sử dụng dài lâu cho gia đình.
            </p>
            <div className="d-flex align-items-center ">
              <span className="badge__badge bg-success">oop</span>

              <Button
                className="btn-round text-uppercase add_to_favorites"
                variant="outlined"
              >
                <FaRegHeart /> &nbsp; Thêm vào yêu thích
              </Button>
            </div>

            <div className="d-flex info__product align-items-center mb-4">
              <span className="product__price text-decoration-line-through opacity-50">
                15.000.000đ
              </span>
              <span className="product__price__old text-danger fs-5 fw-bold">
                {formatter(5000000)}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <QuantityBox />

              <button className="btn__add__cart custom-btn">
                Thêm vào giỏ hàng
              </button>

              <button className="btn__buy ">Mua ngay</button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ProductModal;
