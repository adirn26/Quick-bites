import React from "react";
import Slider from "react-slick";

import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";

import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className="review__text">
          "currently, Quick Bites are market bullie in India for food ordering platforms. 
          Quick Bites is just enjoying this position till the time a better options arrives
          I get my food at home without any searching of restaurants since I have to travel a lot 
          I normally use Quick ones a day and quite satisfied with the service""
        </p>
        <div className=" slider__content d-flex align-items-center gap-3 ">
          <img src={ava01} alt="avatar" className=" rounded" />
          <h6>John Depp</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "I like everything about Quick Bites. The thing that is best about Zomato is it delivers my food so fast and every delivery person is so humble. It offers so many discount coupons like I can order pizzas with a 60% discount on daily bases.
Review collected by and hosted on G2.com."
        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava02} alt="avatar" className=" rounded" />
          <h6>Mitchell Marsh</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "Quick Bites is a food delivery app but now after the pandemic at our job location I have used it heavily, It great user interface and there are so many restaurants listed in it. Quick Bites gives us an immense choice for your hunger cravings. Now it really saves my time and I can keep my work as well as order food. Zomato gives a great user experience and gives us live tracking of your food and also I can see my delivery agent history, it builds trust and the more effective thing is
          
        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava03} alt="avatar" className=" rounded" />
          <h6>Steven Crock</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
