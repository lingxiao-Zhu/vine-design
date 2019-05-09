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

export default forbidScroll;
