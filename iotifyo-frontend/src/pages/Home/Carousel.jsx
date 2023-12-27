import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import './Carousel.css'

export const Carousel = ({ carouselImages  = []}) => { // Make sure to destructure carouselImages
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto  ' }}>
            <Slider {...settings}>
                {carouselImages.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img src={image} alt={`Slide ${index}`} className="carousel-image"/>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
