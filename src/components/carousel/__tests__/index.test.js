/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Carousel from '../index.jsx';

Enzyme.configure({ adapter: new Adapter() });

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

describe('无限轮播下的测试轮播组件', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Carousel opts={opts} autoSlide={false} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('渲染的slider数量比opts的长度多2，dots不变', () => {
    expect(wrapper.find('.slider').length).toBe(opts.length + 2);
    expect(wrapper.find('.dot').length).toBe(opts.length);
  });

  it('translateX默认index为1', () => {
    expect(wrapper.instance().state.index).toBe(1);
  });

  it('调用slideFun方法 传入next，index变为2', () => {
    wrapper.instance().slideFun('next');
    expect(wrapper.instance().state.index).toBe(2);
  });
});
