/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import Animation from './animation';

const Mask = {
  instance: null,
  show() {
    const dom = document.createElement('div');
    dom.classList.add('vined-mask');
    this.instance = dom;
    document.body.appendChild(dom);
    Animation({
      type: 'fadeIn',
      instance: dom
    });
  },
  destory() {
    Animation({
      type: 'fadeOut',
      instance: Mask.instance,
      after() {
        document.body.removeChild(Mask.instance);
      }
    });
  }
};

function forbidScrollEvent(e) {
  e.preventDefault();
}

function forbidScroll(target, isAdd) {
  if (isAdd) {
    target.addEventListener('touchmove', forbidScrollEvent, {
      passive: false
    });
  } else {
    target.removeEventListener('touchmove', forbidScrollEvent);
  }
}

export { Mask, forbidScroll, Animation };
