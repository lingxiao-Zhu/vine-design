import React from 'react';
import PropTypes from 'prop-types';

const Sliders = ({ src, link, title }) => (
  <a className="slider" style={{ backgroundImage: `url(${src})` }} href={link}>
    {title && <div className="title">{title}</div>}
  </a>
);

Sliders.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string
};

Sliders.defaultProps = {
  link: '#',
  title: ''
};

export default Sliders;
