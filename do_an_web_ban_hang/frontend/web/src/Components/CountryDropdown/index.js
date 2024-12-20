import { FaAngleDown } from "react-icons/fa";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
const CountryDropdown = () => {
  return (
    <>
      <button className="countryDrop">
        <div className="info d-flex flex-column">
          <span className="lable">Chi Nhánh </span>
          <span className="name">Sài Gòn</span>
        </div>
        <span className="ml-auto" style={{ marginRight: "10px" }}>
          <FaAngleDown />
        </span>
      </button>
    </>
  );
};

export default CountryDropdown;
