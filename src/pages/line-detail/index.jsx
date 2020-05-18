import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.less';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: '线路详情',
      // navigationBarTextStyle: "white",
      // navigationBarBackgroundColor: "#FF9F00"
    };
    this.state = {

    };
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {

  }

  componentDidHide() { }


  randerLine() {

  }

  render() {
    const linePic = this.randerLine();
    return (
      <View className="page-bkg">
        <View className="line-info">
          <Text className="title">767</Text>
          <Text className="line-detail">祁华路枢纽站 → 株洲路广中路</Text>
          <View className="time-price">
            <Text>首末班：05:30 - 22:30</Text>
            <Text>|</Text>
            <Text>票价：2 元</Text>
          </View>
        </View>
        <View className="stop-info">
          <View className="arrow" />
        </View>
        <View className="pic-aura">
          <ScrollView>
            <View>1</View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
