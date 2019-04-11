/* eslint-disable react/no-array-index-key */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';

const Dots = ({
  // eslint-disable-next-line indent
  opts,
  continuous,
  dotPosition,
  index
}) => {
  const dots = opts.map((item, i) => {
    // eslint-disable-next-line no-nested-ternary
    const backgroundColor = continuous
      ? index === i + 1
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(255, 255, 255, 0.3)'
      : index === i
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(255, 255, 255, 0.3)';

    return (
      <div
        key={i}
        className="dot"
        style={{
          backgroundColor
        }}
      />
    );
  });

  return (
    <div
      className="dots"
      style={{
        textAlign: dotPosition,
        paddingRight: dotPosition === 'center' ? 0 : 5
      }}
    >
      {dots}
    </div>
  );
};

Dots.propTypes = {
  opts: PropTypes.array.isRequired,
  continuous: PropTypes.bool.isRequired,
  dotPosition: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default Dots;
