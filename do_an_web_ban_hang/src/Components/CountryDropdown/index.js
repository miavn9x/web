import { FaAngleDown } from "react-icons/fa";

const CountryDropdown = () => {
  return (
    <>
      <button className="countryDrop">
        <div className="info d-flex flex-column">
          <span className="lable">Chi Nhánh </span>
          <span className="name">Sài Gòn</span>
        </div>
        <span className="ml-aut btn" >
          <FaAngleDown />
        </span>
      </button>
    </>
  );
};

export default CountryDropdown;
