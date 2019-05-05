/* eslint-disable react/forbid-prop-types */
import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import IconTypes from './iconTypes.jsx';
import './index.scss';

export default class Icon extends React.PureComponent {
  static defaultProps = {
    className: '',
    height: 20,
    width: 20
  };

  render() {
    const {
      type,
      className,
      height,
      width,
      ...otherProps
      // eslint-disable-next-line no-trailing-spaces
    } = this.props;

    return (
      <svg
        viewBox="0 0 1024 1024"
        width={width}
        height={height}
        className={ClassNames('vined-icon', {
          [className]: true
        })}
        {...otherProps}
      >
        {IconTypes[type]}
      </svg>
    );
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};
