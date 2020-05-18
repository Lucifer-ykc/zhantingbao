import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.config = {
        navigationBarTitleText: '首页',
        // navigationBarTextStyle: "white",
        // navigationBarBackgroundColor: "#FF9F00"
    }
    this.state = {
       
    } 
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
