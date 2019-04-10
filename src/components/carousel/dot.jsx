/**
 * Created by zhulingxiao on 2017/9/19.
 */
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  dot: {
    width: 7,
    height: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 7,
    margin: '0 5px',
    display: 'inline-block'
  },
  active: {
    backgroundColor: 'rgba(255, 255, 255, 1)'
  }
};

const cStyle = (active) => {
  const style = active
    ? {
      ...styles.dot,
      ...styles.active
    }
    : styles.dot;

  return style;
};

const Dot = ({ active }) => <div style={cStyle(active)} />;

Dot.propTypes = {
  active: PropTypes.bool.isRequired
};

export default Dot;
