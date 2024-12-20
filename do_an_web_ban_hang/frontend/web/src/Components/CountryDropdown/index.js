import { FaAngleDown } from "react-icons/fa";
import Button from "@mui/material/Button";

const CountryDropdown = () => {
  return (
    <>
      <Button className="countryDrop">
        <div className="info d-flex flex-column">
          <span className="lable">Chi Nhánh </span>
          <span className="name">Sài Gòn</span>
        </div>
        <span className="ml-aut btn" >
          <FaAngleDown />
        </span>
      </Button>
    </>
  );
};

export default CountryDropdown;
