import React from "react";
import Carousel from "../../Components/Carousel/index";
import "../../App.css"
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div>
              <Carousel />
            </div>
          </div>
          <div>
            <h1>Trang chu</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
