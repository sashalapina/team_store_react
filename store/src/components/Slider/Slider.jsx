import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Slider.css'

const SliderTest = ({images}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const defaultImages = [
    "/default_img.png",
    "/default_img.png"
  ];

  const allImages = images && images.length > 0 ? [...images, ...defaultImages] : defaultImages;

  return (
    <Slider {...settings}>
      {allImages.map((image, index) => (
          <div key={index}>
            <img className="image-slider" src={image} alt="image" />
          </div>
      ))}
    </Slider>
  );
};
export default SliderTest;
