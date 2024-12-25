import React, { useState, useEffect } from "react";
import slide1 from "../../assets/images/02.jpg";
import slide2 from "../../assets/images/01.jpg";
import slide3 from "../../assets/images/03.png";
import slide4 from "../../assets/images/04.jpg";
import slide5 from "../../assets/images/05.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: slide1,
      // caption: "First Slide Caption",
      // description: "This is the first slide description.",
    },
    {
      image: slide2,
      // caption: "Second Slide Caption",
      // description: "This is the second slide description.",
    },
    {
      image: slide3,
      // caption: "Third Slide Caption",
      // description: "This is the third slide description.",
    },
    {
      image: slide4,
      // caption: "Third Slide Caption",
      // description: "This is the third slide description.",
    },
    {
      image: slide5,
      // caption: "Third Slide Caption",
      // description: "This is the third slide description.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? "active" : ""}`}
          >
            <img
              src={slide.image}
              className="d-block w-100"
              alt={slide.caption}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{slide.caption}</h5>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={goToPrevSlide}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={goToNextSlide}
      >
        <span className="carousel-control-next-icon " aria-hidden="true"></span>
        <span className="visually-hidden ">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
