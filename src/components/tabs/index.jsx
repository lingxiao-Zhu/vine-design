/* eslint-disable react/no-unused-state */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Tabbar from './tabbar';
import './index.scss';

const tabBarHeight = 45;

// 计算tabbar和underline的宽度，最小为33.33%
function calcWitdh(length) {
  if (length > 3) {
    return 33.33;
  }
  return Number(100 / length).toFixed(2);
}

class Tabs extends React.PureComponent {
  static defaultProps = {
    page: 0, // 当前tab
    sticky: true, // 是否吸顶
    onTabClick: () => {}
  };

  constructor(props) {
    super(props);
    this.tabsDom = null;
    this.state = {
      page: Number(props.page),
      width: calcWitdh(props.tabs.length),
      fixed: false,
      top: 0 // tarbar距离页面顶部的距离
    };
  }

  componentDidMount() {
    const { sticky } = this.props;

    if (sticky) {
      // 获取整个tabs组件
      const [tabs] = document.getElementsByClassName('vined-tabs');
      this.tabsDom = tabs;

      // 添加scroll事件
      window.addEventListener('scroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    // 移除onscroll事件
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { fixed } = this.state;

    const { top, height } = this.tabsDom.getBoundingClientRect();

    if (top < 0 && !fixed) {
      this.setState({
        fixed: true
      });
    }

    if (top > 0 && fixed) {
      this.setState({
        fixed: false
      });
    }

    // 当tabs组件即将展示完，然后tabbar跟随着整个组件离开页面
    if (top < 0 && Math.abs(top) + tabBarHeight > height) {
      // tabs组件在页面中剩余的可视高度
      const scrollTop = Math.abs(top) + tabBarHeight - height;
      /**
       * 1.如果可视高度小于处于fixed中的tarbar高度，tarbar跟随着可视高度调整
       * 2.如果组件完全消失在界面中后，将fixed设置为false，重置组件。
       */
      this.setState({
        fixed: Math.abs(scrollTop) < tabBarHeight,
        top: Math.abs(scrollTop) > tabBarHeight ? 0 : -scrollTop
      });
    } else {
      this.setState({
        top: 0
      });
    }
  };

  changeTab = (e) => {
    const { onTabClick } = this.props;
    const page = Number(e.target.getAttribute('data-page'));
    onTabClick(page);
    this.setState({
      page
    });
  };

  createTranslate = x => ({
    WebkitTransform: `translate3d(${x}%, 0, 0)`,
    transform: `translate3d(${x}%, 0, 0)`
  });

  render() {
    const { tabs, children } = this.props;
    const { page, fixed } = this.state;

    return (
      <div className="vined-tabs">
        <Tabbar state={this.state} tabs={tabs} changeTab={this.changeTab} />
        <div style={{ paddingBottom: fixed ? tabBarHeight : 0 }} />
        <div className="content-wrap" style={this.createTranslate(-100 * page)}>
          {React.Children.map(children, child => (
            <div className="pane-wrap">{child}</div>
          ))}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  page: PropTypes.number,
  children: PropTypes.array.isRequired,
  sticky: PropTypes.bool,
  onTabClick: PropTypes.func
};

export default Tabs;
