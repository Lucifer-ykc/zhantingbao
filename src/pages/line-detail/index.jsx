import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.less';
import lineJson from '../components/stops.json';
import moment from 'moment';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.config = {
      navigationBarTitleText: '线路详情',
      // navigationBarTextStyle: "white",
      // navigationBarBackgroundColor: "#FF9F00"
    };
    this.state = {
      lineId: 767,
      lineType: 'a',
      lineInfo: lineJson['767'].a,
      selectedStop: 0,
      arrLeft: 33,
      windowWidth: 375,
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
      },
      nowStopPeople: 10,
      nowBus: 0,
      nowBusLeft: 0,
      stopInfo: {
        time: 0,
        stops: 0,
        road: 0
      }
    };
    this.intervalBus;
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentDidShow() {
    const self = this;
    Taro.getSystemInfo({
      success: (res) => {
        self.setState({
          windowWidth: res.windowWidth,
        });
      }
    });
    this.getStopPeople();
    // this.busLocation();
    this.intervalBus = setInterval(() => {
      this.getStopPeople();
      // this.busLocation();
    }, 30000);
  }

  componentDidHide() {
    clearInterval(this.intervalBus);
  }

  changeType() {
    const { lineId, lineType } = this.state;
    if (lineType == 'a') {
      this.setState({
        lineType: 'b',
        lineInfo: lineJson[lineId].b,
      });
    } else {
      this.setState({
        lineType: 'a',
        lineInfo: lineJson[lineId].a,
      });
    }
  }

  selectStop=(num) => {
    const { picLeft, windowWidth, nowBus, stopPeoples } = this.state;
    const stepWidth = windowWidth > 414 ? 66 * windowWidth / 375 : windowWidth > 375 ? 70 : windowWidth > 320 ? 66 : 55;
    const newLeft = picLeft == (num - 2) * stepWidth ? ((num - 2) * stepWidth - 1) : ((num - 2) * stepWidth);
    const stopInfo = {
      time: num * 3 - moment(new Date()).format('mm'),
      stops: num - Math.floor(nowBus / 2),
      road: (num * 2 - nowBus) * (200 + Math.round(Math.random() * 50))
    };
    const nowStopPeople = stopPeoples[num];
    this.setState({
      selectedStop: num,
      picLeft: newLeft,
      arrLeft: (num + 0.5) * stepWidth,
      stopInfo,
      nowStopPeople
    });
  }

  busLocation() {
    const { windowWidth, selectedStop, stopPeoples } = this.state;
    const stepWidth = windowWidth > 414 ? 66 * windowWidth / 375 : windowWidth > 375 ? 70 : windowWidth > 320 ? 66 : 55;
    const min = moment(new Date()).format('mm');
    const place = Math.floor(min / 1.5);
    const stopInfo = {
      time: selectedStop * 3 - moment(new Date()).format('mm'),
      stops: selectedStop - Math.floor(place / 2),
      road: (selectedStop * 2 - place) * (200 + Math.round(Math.random() * 50))
    };
    const nowStopPeople = stopPeoples[selectedStop];
    this.setState({
      nowBus: place,
      nowBusLeft: place * stepWidth / 2 + stepWidth * 0.38,
      stopInfo,
      nowStopPeople
    });
  }

  getStopPeople() {
    const { lineInfo } = this.state;
    const totalStop = lineInfo.stops.length;
    const stopPeoples = [];
    lineInfo.stops.forEach((e, i) => {
      stopPeoples.push(Math.round(Math.abs((45 + Math.random() * 10 - ((totalStop / 2 - i) ** 2 / 2) * (0.7 + Math.random() * 0.6)))));
    });
    // return Math.round(Math.abs((45 + Math.random() * 10 - ((totalStop / 2 - i) ** 2 / 2) * (0.7 + Math.random() * 0.6))));
    this.setState({
      stopPeoples
    }, () => {
      this.busLocation();
    });
  }

  // onPicScroll(e) {
  // }

  randerLine() {
    const { selectStop } = this;
    const { lineInfo, selectedStop, arrLeft, metroColor, nowBusLeft } = this.state;
    const { stops } = lineInfo;
    const lineStops = stops.map((e, i) => {
      const metros = e.metro.map((j, k) => {
        const bkgColor = metroColor[j];
        return <View className="metro-block" style={{ backgroundColor: bkgColor }} key={k}>{j}</View>;
      });
      return <View key={i} className="stop-one" onClick={() => selectStop(i)}>
              <View className="road-arrow" />
              <View className="left-road" />
              <View className="stop-obj">
                {
                selectedStop == i
                  ? <View className="road-circle" />
                  : <View className="road-stop" />
                }
                <View className="stop-num">{i + 1}</View>
                <View className={["stop-name", selectedStop == i ? 'red-text' : '']}>{e.name}</View>
                {metros}
              </View>
              <View className="right-road" />
             </View>;
    });
    return (
      <View className="all-stops">
        {lineStops}
        <View className="arrow" style={{ left: arrLeft + 'px' }} />
        <View className="bus-pic" style={{ left: nowBusLeft + 'px' }} />
      </View>
    );
  }

  render() {
    const { changeType } = this;
    const { picLeft, lineInfo, lineId, nowStopPeople, stopInfo } = this.state;
    const linePic = this.randerLine();
    return (
      <View className="page-bkg">
        <View className="line-info">
          <Text className="title">{lineId}</Text>
          <Text className="line-detail">{lineInfo.name}</Text>
          <View className="time-price">
            <Text>首末班：{lineInfo.time}</Text>
            <Text>|</Text>
            <Text>票价：{lineInfo.price / 100} 元</Text>
          </View>
          <Text className="change-type" onClick={changeType}>⇌ 返程</Text>
        </View>
        <View className="stop-info">
          {/* <Text>站 </Text>
          <Text>公里 </Text>
          <Text>分钟 </Text> */}
          <View className="info-aura">
            {
              stopInfo.time < -1
                ? <View className="info-desc">起点预计发车 {moment(new Date()).add(1, 'hours').format('HH:00')}</View>
                : stopInfo.time < 2
                  ? stopInfo.time == 1
                    ? <View className="bus-time">即将到站</View>
                    : <View className="bus-time">已到站</View>
                  : <View className="bus-time">
                        <Text>约</Text>
                        <Text className="time-num">{stopInfo.time}</Text>
                        <Text>分钟</Text>
                    </View>
            }
            { stopInfo.time > 0 && <Text className="info-desc">{stopInfo.stops}站 / {stopInfo.road < 1000 ? stopInfo.road + '米' : (stopInfo.road / 1000).toFixed(1) + '公里'}</Text>}
          </View>
          <View className="info-line" />
          <View className="info-aura">
            <Text className="info-desc">站台人数</Text>
            <Text className="stop-people" style={{ color: nowStopPeople > 30 ? '#CC0000' : nowStopPeople > 10 ? '#F9E103' : '#009900' }}>{nowStopPeople}</Text>
          </View>
        </View>
        <View className="pic-aura">
          <ScrollView
            scrollX
            scrollWithAnimation
            // onScroll={onPicScroll}
            scrollLeft={picLeft}
            >
            {linePic}
          </ScrollView>
        </View>
      </View>
    );
  }
}
