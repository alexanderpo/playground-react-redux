import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import PromoEventPhoto from '../styles/images/no-event-pictures.svg';

const propTypes = {
  images: PropTypes.array,
};

class ImageCarousel extends Component {
  renderImages = (images) => {
    if (images === undefined || images[0] === null || images.length === 0) {
      return (
        <img src={PromoEventPhoto} alt="" />
      );
    }
    return (
      images.map(image => (
        <img
          key={image}
          src={`/api/v1/images/${image}`}
          alt=""
        />
      ))
    );
  };

  render() {
    const { images } = this.props;
    return (
      <Slider
        dots={true}
        speed={500}
        infinite={false}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {this.renderImages(images)}
      </Slider>
    );
  }
}

ImageCarousel.propTypes = propTypes;
export default ImageCarousel;
