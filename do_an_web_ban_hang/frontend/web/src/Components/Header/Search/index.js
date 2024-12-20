import { CiSearch } from "react-icons/ci";
import Button from "@mui/material/Button";

const Search = () => {
  return(
   
    <div
      className="Hearder_search ml-3 mr-3 "
      style={{ fontFamily: "Calibri" }}
    >
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm tại Siêu Thị Xanh . . ."
      />
      <Button>
        <CiSearch />
      </Button>
    </div>
  
  )
};

export default Search;
