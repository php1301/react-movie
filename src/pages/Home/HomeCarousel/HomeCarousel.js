import React, { Fragment, useEffect } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider from "react-slick";
import './HomeCarousel.css';
import styleSlick from './HomeCarousel.module.css'
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "../../../Redux/action/CarouselAction";

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "button__bar",
    autoplay: true,
    autoplaySpeed: 2000
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarouselAction)
  },[]);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
            <img src={item.hinhAnh} style={{width:'100%',height:'100%'}}></img>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div>
      <Slider {...settings} className={styleSlick.sliderBanner}>
        {renderImg()}
      </Slider>
    </div>
    <div className="carouselBlur">

    </div>
    </Fragment>
  );
}
