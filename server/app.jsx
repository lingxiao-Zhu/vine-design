import React from 'react';
import {
  Carousel,
  Tabs,
  Toast,
  Button,
  Modal
  // eslint-disable-next-line indent
} from '../src';

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

const footer = [
  {
    title: '确认',
    onPress: () => {}
  },
  {
    title: '取消',
    onPress: () => {}
  },
  {
    title: '禁止',
    onPress: () => {}
  }
];

class App extends React.PureComponent {
  state = {
    modalVisible: false
  };

  openModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { modalVisible } = this.state;

    return (
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '350px'
            }}
          >
            Content of forth tab
          </div>
        </Tabs>
        <p>
          <Button onClick={this.openModal}>普通按钮(弹出modal)</Button>
        </p>
        <p>
          <Button onClick={() => Modal.confirm('111', 'xxxx')}>
            普通按钮(confirm)
          </Button>
        </p>
        <p>
          <Button
            type="primary"
            iconType="offline"
            onClick={() => Toast.offline('网络错误', 2000)}
          >
            带图标按钮(弹出Toast)
          </Button>
        </p>
        <p>
          <Button
            type="primary"
            iconType="success"
            onClick={() => Toast.loading('加载中')}
          >
            带图标按钮(弹出Loading)
          </Button>
        </p>
        <p>
          <Button
            type="primary"
            loading
            onClick={() => Toast.offline('网络错误', 2000)}
          >
            加载中的按钮
          </Button>
        </p>
        <p>
          <Button type="warn" disabled iconType="fail">
            被禁止的按钮
          </Button>
        </p>
        <Modal
          title="提示"
          visible={modalVisible}
          onClose={this.closeModal}
          footer={footer}
        >
          1111
        </Modal>
      </div>
    );
  }
}

export default App;
