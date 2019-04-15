/* eslint-disable global-require */
/* eslint-disable no-console */
// this file is not used if use babel-plugin-import
const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production'
  && ENV !== 'test'
  && typeof console !== 'undefined'
  && console.warn
  && typeof window !== 'undefined'
) {
  console.warn(
    'You are using a whole package of vine-design, '
      + 'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.'
  );
}

/* eslint-disable import/extensions */
export { default as Carousel } from './components/carousel/index.jsx';
export { default as Tabs } from './components/tabs/index.jsx';
