import React from 'react';
import { Carousel } from 'antd';

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  return (
    <Carousel autoplay>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        </div>
      ))}
    </Carousel>
  );
};

export default Slideshow;
