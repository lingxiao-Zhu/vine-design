/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import raf from 'raf';
import { forbidScroll as FS } from './index.jsx';

/**
 * 进出场动画
 * @param {string} type 动画类型
 * @param {Element} instance 动画作用的dom节点
 * @param {Function} before 动画开始前触发
 * @param {Function} after 动画结束后触发
 * @param {Function} forbidDOM 禁止页面滚动的dom节点
 * @param {Function} releaseDOM 解除禁止滑动状态的dom
 */
function Animation({
  // eslint-disable-next-line no-trailing-spaces
  type,
  instance,
  before,
  after,
  forbidDOM,
  releaseDOM
}) {
  let propertyValue;
  let propertyName;
  let propertyUnit;
  let loopCondition; // 动画循环条件
  let transformFunc;

  switch (type) {
    case 'fadeIn':
      propertyName = 'opacity';
      propertyValue = 0;
      transformFunc = () => (propertyValue += 0.1);
      loopCondition = value => value < 1;
      break;
    case 'fadeOut':
      propertyName = 'opacity';
      propertyValue = 1;
      transformFunc = () => (propertyValue -= 0.1);
      loopCondition = value => value > 0;
      break;
    case 'slideUp':
      propertyName = 'transform';
      propertyValue = 15;
      propertyUnit = value => `translate3d(0, ${value}px, 1px)`;
      transformFunc = () => (propertyValue -= 1);
      loopCondition = value => value > 0;
      break;
    case 'slideDown':
      propertyName = 'transform';
      propertyValue = 0;
      propertyUnit = value => `translate3d(0, ${value}px, 1px)`;
      transformFunc = () => (propertyValue += 1);
      loopCondition = value => value < 15;
      break;
  }

  typeof before === 'function' && before();

  !!forbidDOM && FS(forbidDOM, true);

  !!releaseDOM && FS(releaseDOM, false);

  raf(function tick() {
    transformFunc();
    instance.style[propertyName] = propertyUnit
      ? propertyUnit(propertyValue)
      : propertyValue;

    if (loopCondition(propertyValue)) {
      raf(tick);
    } else {
      typeof after === 'function' && after();
    }
  });
}

export default Animation;
