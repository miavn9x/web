import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__info">
            <h2>Mía Food</h2>
            <p>Chuyên cung cấp các mặt hàng chính hãng.</p>
            <ul>
              <li>
                <FaMapMarkerAlt /> 12 Trịnh Đình Thảo, Quận Tân Phú, TP. HCM
              </li>
              <li>
                <FaPhoneAlt /> 0123 456 789
              </li>
              <li>
                <FaEnvelope /> miavn9x@gmail.com
              </li>
            </ul>
          </div>

          <div className="footer__branches">
            <h3>Chi nhánh</h3>
            <ul>
              <li>Chi nhánh 1: 456 Đường Hoa Quả, Hà Nội</li>
              <li>Chi nhánh 2: 789 Đường Cam, Đà Nẵng</li>
              <li>Chi nhánh 3: 101 Đường Táo, Cần Thơ</li>
            </ul>
          </div>

          <div className="footer__social ">
            <h3>Theo dõi chúng tôi</h3>
            <ul className="footer__social-icons ">
              <li>
                <Link to="https://www.facebook.com/tungmia9x">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to="https://www.tiktok.com/@miavn9x?is_from_webapp=1&sender_device=pc">
                  <FaTwitter />
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__map">
            <h3>Google Map</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.816810890128!2d106.628712!3d10.774970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec0c07bd4ab%3A0xd548362f9b8ad90c!2zMTIgVHLhu4sgxJDDrG5oIFThu6sgVGjhuqFvLCBIb8OgIFRoYW5oLCBUw6JuIFBow7osIEjhu5MgQ2jDrW5oIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ"
            ></iframe>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2024 Mía Food. Đồ án Môn Ứng Dụng Web</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
