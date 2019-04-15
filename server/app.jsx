import React from 'react';
import { Carousel, Tabs } from '../src';

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

const tabs = [
  { title: 'First Tab' },
  { title: 'Second Tab' },
  { title: 'Third Tab' },
  { title: 'Fourth Tab' }
];

const App = () => (
  <div>
    <Carousel opts={opts} />
    <Tabs tabs={tabs}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px'
        }}
      >
        Content of first tab
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '250px'
        }}
      >
        Content of second tab
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '350px'
        }}
      >
        Content of third tab
      </div>
    </Tabs>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>

    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>

    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>

    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>

    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>

    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
  </div>
);

export default App;
