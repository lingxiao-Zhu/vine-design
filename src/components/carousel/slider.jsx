import React from 'react';
import PropTypes from 'prop-types';

const Sliders = ({ src, link, title }) => {
  const aStyles = {
    display: 'block',
    float: 'left',
    height: 200,
    width: `${document.documentElement.clientWidth}px`
  };

  const picStyles = {
    width: 'inherit',
    height: 'inherit',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${src})`
  };

  return (
    <a style={aStyles} href={link}>
      <div style={picStyles} />
      {title && <div style={{ color: 'red', fontSize: 30 }}>{title}</div>}
    </a>
  );
};

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
