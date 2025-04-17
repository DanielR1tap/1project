'use client';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from 'react-icons/fa';

const TestimonialsCarousel = () => {

  const testimonials = [
    {
      id: 1,
      name: "Luisa",
      text: "I love it! No more air fresheners",
      rating: 5,
      image: "image/bg1.png",
    },
    {
      id: 2,
      name: "Edoardo",
      text: "Raccomended for everyone",
      rating: 5,
      image: "image/bg2.png",
    },
    {
      id: 3,
      name: "Mart",
      text: "Looks very natural, the smell is awesome",
      rating: 5,
      image: "/image/bg3.png",
    },
    {
        id: 4,
      name: "Anna",
      text: "This is the best product",
      rating: 4,
      image: "/image/bg1.png",
    }
  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-green-500" : "text-gray-300 "}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#a7d4b8] py-10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#1A3C34]">Testimonials</h2>
        <p className="text-gray-600 mt-2">Some quotes from our happy customers</p>
      </div>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <div className='flex-1 flex items-center justify-center'><StarRating rating={testimonial.rating}  /></div>

                <p className="mt-4 text-gray-800 font-semibold italic">
                  "{testimonial.text}"
                </p>
                <p className="mt-2 text-gray-600">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;