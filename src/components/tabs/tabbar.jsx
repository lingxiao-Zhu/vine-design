/* eslint-disable no-trailing-spaces */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable indent */
import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

export default class Tabbar extends React.PureComponent {
  createTranslate = x => ({
    WebkitTransform: `translate3d(${x}%, 0, 0)`,
    transform: `translate3d(${x}%, 0, 0)`
  });

  /**
   * 如果tabs数量大于3，点击tab时需要移动tab，让tab显示到页面中
   */
  createFlexBoxStyle = () => {
    const { tabs, state } = this.props;
    const { page, width } = state;
    if (tabs.length < 4) {
      return {};
    }
    return page > 1 ? this.createTranslate(-width * (page - 1)) : {};
  };

  render() {
    const { state, changeTab, tabs } = this.props;
    const {
      width,
      fixed,
      top,
      page
      // eslint-disable-next-line no-trailing-spaces
    } = state;

    const widthWithUnit = `${width}%`;
    return (
      <div
        className={ClassNames('tab-bar-wrap', {
          'tab-bar-wrap-fixed': fixed
        })}
        style={{ top }}
      >
        <div className="tab-bar-flex-box" style={this.createFlexBoxStyle()}>
          {tabs.map((item, i) => (
            <button
              key={item.title}
              onClick={changeTab}
              data-page={i}
              type="button"
              style={{ width: widthWithUnit }}
              className={ClassNames('tab-bar', {
                'tab-bar-active': page === i
              })}
            >
              {item.title}
            </button>
          ))}
          <div
            style={{
              left: `${width * page}%`,
              marginLeft: `${tabs.length >= 3 ? 12.8 : 21}vw`
            }}
            className="underline"
          />
        </div>
      </div>
    );
  }
}

Tabbar.propTypes = {
  state: PropTypes.object.isRequired,
  changeTab: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired
};
