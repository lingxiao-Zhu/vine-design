import React from 'react';
import { Carousel } from '../build/dist';
import '../build/dist/style/index.css';

const opts = [
  {
    src: 'http://img.sccnn.com/bimg/337/43306.jpg',
    title: '111'
  },
  {
    src:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554899344983&di=66a633ba20ec0ddffcaa5628fe91ebe0&imgtype=0&src=http%3A%2F%2Fpic32.nipic.com%2F20130823%2F13339320_183302468194_2.jpg'
  },
  {
    src:
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1105932733,535600046&fm=27&gp=0.jpg',
    title: '111'
  }
];

const App = () => <Carousel opts={opts} />;

export default App;
