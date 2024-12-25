import { FaAngleDown } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
const CountryDropdown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const locations = [
    {
      district: "Quận 1",
      address: "123 Đường Nguyễn Huệ, Quận 1",
      link: "https://www.google.com/maps?q=123+Nguyễn+Huệ,+Quận+1,+TP.HCM",
    },
    {
      district: "Quận 3",
      address: "456 Đường Lê Văn Sỹ, Quận 3",
      link: "https://www.google.com/maps?q=456+Lê+Văn+Sỹ,+Quận+3,+TP.HCM",
    },
    {
      district: "Quận 5",
      address: "789 Đường Trần Hưng Đạo, Quận 5",
      link: "https://www.google.com/maps?q=789+Trần+Hưng+Đạo,+Quận+5,+TP.HCM",
    },
    {
      district: "Quận 7",
      address: "101 Đường Nguyễn Văn Linh, Quận 7",
      link: "https://www.google.com/maps?q=101+Nguyễn+Văn+Linh,+Quận+7,+TP.HCM",
    },
    {
      district: "Quận 10",
      address: "202 Đường 3/2, Quận 10",
      link: "https://www.google.com/maps?q=202+Đường+3/2,+Quận+10,+TP.HCM",
    },
    {
      district: "Quận Bình Thạnh",
      address: "303 Đường Xô Viết Nghệ Tĩnh, Quận Bình Thạnh",
      link: "https://www.google.com/maps?q=303+Xô+Viết+Nghệ+Tĩnh,+Quận+Bình+Thạnh,+TP.HCM",
    },
    {
      district: "Quận Tân Bình",
      address: "404 Đường Hoàng Văn Thụ, Quận Tân Bình",
      link: "https://www.google.com/maps?q=404+Hoàng+Văn+Thụ,+Quận+Tân+Bình,+TP.HCM",
    },
    {
      district: "Quận Thủ Đức",
      address: "505 Đường Võ Văn Ngân, TP Thủ Đức",
      link: "https://www.google.com/maps?q=505+Võ+Văn+Ngân,+Thủ+Đức,+TP.HCM",
    },
    {
      district: "Quận Phú Nhuận",
      address: "606 Đường Phan Xích Long, Quận Phú Nhuận",
      link: "https://www.google.com/maps?q=606+Phan+Xích+Long,+Quận+Phú+Nhuận,+TP.HCM",
    },
    {
      district: "Quận Gò Vấp",
      address: "707 Đường Quang Trung, Quận Gò Vấp",
      link: "https://www.google.com/maps?q=707+Quang+Trung,+Quận+Gò+Vấp,+TP.HCM",
    },
  ];

  const filteredLocations = locations.filter((location) =>
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Button
        className="countryDrop d-none d-sm-block"
        onClick={() => setisOpenModal(true)}
      >
        <div className="info d-flex flex-column">
          <span className="lable">Chi Nhánh </span>
          <span className="name" style={{ color: "#198754" }}>
            Sài Gòn
          </span>
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>

      <Dialog
        open={isOpenModal}
        onClose={() => setisOpenModal(false)}
        className=" countryDrop__dialog align-items-start"
      >
        <h3 className="text-success">các của hàng gần đây</h3>
        <p className="text-muted">
          {" "}
          Nhập vị trí của bạn để tìm kiếm nhanh của hàng gần bạn nhất{" "}
        </p>
        <Button className="close__" onClick={() => setisOpenModal(false)}>
          <IoIosCloseCircle />
        </Button>
        <div
          className="Hearder_search w-100 "
          style={{ fontFamily: "Calibri" }}
        >
          <input
            type="text"
            placeholder="Tìm kiếm cửa hàng  Siêu Thị Xanh gần nhất . . ."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button>
            <CiSearch />
          </Button>
        </div>
        <ul className="list-unstyled Hearder_search_location">
          {filteredLocations.map((location, index) => (
            <li key={index}>
              <Button onClick={() => window.open(location.link, "_blank")}>
                {location.district}: {location.address}
              </Button>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
