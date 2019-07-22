import React, {Component} from 'react'
import VideoPlayer from './VideoPlayer'

class Video extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: {src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'}
      })
    })
  }
  render() {
    const { data } = this.state
    return data ? <VideoPlayer data={data} /> : null
  }
}

export default Video
