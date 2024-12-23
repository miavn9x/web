import React from "react";
import Carousel from "../../Components/Carousel/index";
import "../../App.css"
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 ">
            <div> {""}</div>
          </div>
          <div className="col-sm-9 home__Carousel ">
            <Carousel />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
