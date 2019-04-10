/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import SingleSlider from './slider';
import Dot from './dot';
import './index.scss';

const AnimationTime = 0.5; // 动画时间

const ScreenWidth = document.documentElement.clientWidth;

const Swiper = 40; // 滑动滚动触发距离

const styles = {
  container: {
    position: 'relative',
    overflow: 'hidden'
  },
  dotsWrap: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    textAlign: 'center'
  }
};

let SlideInter;

export default class Carousel extends React.PureComponent {
  static defaultProps = {
    continuous: true,
    autoSlide: true,
    slideSpeed: 2000
  };

  constructor(props) {
    super(props);
    this.state = {
      fakeOpts: [...props.opts],
      startX: '', // touchstart的 x
      moveX: '', // 单次移动距离
      time: 0, // 设置动画时间，在手指触摸屏幕的时候，设置为0
      distance: 0, // css transition 移动距离
      index: 0 // 当前轮播index
    };
  }

  componentWillMount() {
    const { continuous, opts } = this.props;
    if (continuous) {
      const { fakeOpts } = this.state;
      if (opts.length > 1) {
        fakeOpts.unshift(opts[opts.length - 1]);
        fakeOpts.push(opts[0]);
      }
      this.setState({
        fakeOpts,
        index: 1,
        distance: -ScreenWidth
      });
    }
  }

  componentDidMount() {
    this.autoSlideFun();
  }

  componentWillUnmount() {
    this.stopSlideFun();
  }

  touchStart = (e) => {
    this.setState({
      time: 0,
      startX: e.touches[0].pageX
    });
  };

  touchMove = (e) => {
    // 阻止 页面上下滚动
    // e.preventDefault();

    // 移动的时候，暂停自动轮播
    this.stopSlideFun();

    const { startX, index } = this.state;

    const moveX = e.touches[0].pageX - startX;

    // 这里设置distance，为了屏幕跟着手指动
    const distance = -(index * ScreenWidth - moveX);

    this.setState({
      moveX,
      distance
    });
  };

  touchEnd = () => {
    this.autoSlideFun();

    const { moveX } = this.state;

    // 低于触发距离
    if (Math.abs(parseFloat(moveX)) <= Swiper) {
      this.slideFun('');
    } else if (moveX > 0) {
      this.slideFun('prev');
    } else {
      this.slideFun('next');
    }
  };

  /**
   * index控制
   * @param  go   指定index数值
   */
  slideFun = (go) => {
    let { index: _index } = this.state;
    const { fakeOpts } = this.state;
    const { continuous } = this.props;
    const { length } = fakeOpts;

    // number表示指定跳转index
    if (typeof go === 'number') {
      _index = go;
    } else if (go === 'next') {
      _index += 1;
    } else if (go === 'prev') {
      _index -= 1;
    }

    // 无限轮播
    if (continuous) {
      this.setState(
        {
          index: _index,
          distance: -(_index * ScreenWidth),
          time: AnimationTime
        },
        () => {
          if (_index === 0 || _index === length - 1) {
            const DotIndex = _index === 0 ? length - 2 : 1;

            this.setState({
              index: DotIndex
            });
            setTimeout(() => {
              this.setState({
                distance: -DotIndex * ScreenWidth,
                time: 0
              });
            }, 500);
          }
        }
      );

      // 非无限轮播
    } else {
      if (_index >= length - 1) {
        this.stopSlideFun();
        _index = length - 1;
      }

      if (_index < 0) {
        _index = 0;
      }

      this.setState({
        index: _index,
        distance: -(_index * ScreenWidth),
        time: AnimationTime
      });
    }
  };

  autoSlideFun = () => {
    const { autoSlide, slideSpeed } = this.props;

    if (autoSlide) {
      this.stopSlideFun();

      SlideInter = setInterval(() => {
        this.slideFun('next', AnimationTime);
      }, slideSpeed);
    }
  };

  stopSlideFun = () => {
    clearInterval(SlideInter);
  };

  render() {
    const { opts, continuous } = this.props;

    const {
 distance, time, index, fakeOpts 
} = this.state;

    const slideStyle = {
      position: 'relative',
      overflow: 'hidden',
      width: `${ScreenWidth * (fakeOpts.length + 2)}px`,
      WebkitTransform: `translateX(${distance}px)`,
      transform: `translateX(${distance}px)`,
      WebkitTransition: `all ${time}s`,
      transition: `all ${time}s`
    };

    const sliders = fakeOpts.map((item, i) => (
      <SingleSlider
        link={item.link}
        src={item.src}
        key={i}
        title={item.title}
      />
    ));

    const dots = opts.map((item, i) => (
      <Dot key={i} active={continuous ? index === i + 1 : index === i} />
    ));

    return (
      <div style={styles.container}>
        <div
          style={slideStyle}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
        >
          {sliders}
        </div>

        <div style={styles.dotsWrap}>{dots}</div>
      </div>
    );
  }
}

Carousel.propTypes = {
  opts: PropTypes.array.isRequired,
  continuous: PropTypes.bool,
  slideSpeed: PropTypes.number,
  autoSlide: PropTypes.bool
};
