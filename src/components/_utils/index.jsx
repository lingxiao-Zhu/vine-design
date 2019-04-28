export const Mask = {
  instance: null,
  show() {
    const dom = document.createElement('div');
    this.instance = dom;
    dom.classList.add('vined-mask', 'fadeIn');
    document.body.appendChild(dom);
    setTimeout(() => {
      dom.style.opacity = 1;
      dom.classList.remove('fadeIn');
    }, 300);
  },
  destory() {
    this.instance.classList.add('fadeOut');
    setTimeout(() => {
      document.body.removeChild(this.instance);
    }, 300);
  }
};

function forbidScrollEvent(e) {
  e.preventDefault();
}

export function forbidScroll(t, isAdd) {
  // eslint-disable-next-line no-multi-spaces
  const target =    typeof t === 'string' ? document.getElementsByClassName(t)[0] : t;

  if (isAdd) {
    target.addEventListener('touchmove', forbidScrollEvent, {
      passive: false
    });
  } else {
    target.removeEventListener('touchmove', forbidScrollEvent);
  }
}
