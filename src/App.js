import React, {Component} from 'react'
import VideoPlayer from './VideoPlayer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    const docEl = document.documentElement
    const {clientHeight} = docEl
    if (clientHeight >= 750) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = 100 * (clientHeight / 750) + 'px'
    }
    this.setState({
      data: {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      }
    })
  }
  
  render() {
    const {data} = this.state
    return data ? <VideoPlayer data={data} /> : null
  }
}

export default App
