import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.less';
import lineJson from '../components/stops.json';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: '线路详情',
      // navigationBarTextStyle: "white",
      // navigationBarBackgroundColor: "#FF9F00"
    };
    this.state = {
      lineInfo: lineJson['767'].a,
      metroColor: {
        1: "#CC0000",
        2: "#009900",
        3: "#F9E103",
        4: "#660066",
        5: "#CC00CC",
        6: "#FF3265",
        7: "#FF7F00",
        8: "#0066CC",
        9: "#95d3db",
        10: "#C9A7D5",
        11: "#800000",
        12: "#0C785E",
        13: "#E796C1",
        14: "#9ba0ad",
        15: "#B3B3B3",
        16: "#77C8C7",
        17: "#c07774",
      }
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidShow() {

  }

  componentDidHide() { }


  randerLine() {
    const { lineInfo, metroColor } = this.state;
    const { stops } = lineInfo;
    const linePic = stops.map((e, i) => {
      const metros = e.metro.map((j, k) => <View key={k}>{j}</View>);
      return <View key={i} className="stop-one">
              <View className="road-arrow" />
              <View className="left-road" />
              <View className="stop-obj">
                <View className="road-stop" />
                <View className="stop-num">{i + 1}</View>
                <View className="stop-name">{e.name}</View>
                {metros}
              </View>
              <View className="right-road" />
             </View>;
    });
    return (
      <View className="all-stops">
        {linePic}
      </View>
    );
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
          <ScrollView
            scrollX
            scrollWithAnimation
            >
            {linePic}
          </ScrollView>
        </View>
      </View>
    );
  }
}
