import React, {Component} from 'react'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containerStyle: this.getContainerStyle()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  // 自适应横屏模式
  handleWindowResize = () => {
    const {innerWidth, innerHeight} = window
    console.log('resize', innerWidth, innerHeight)
    this.setState({
      containerStyle: this.getContainerStyle()
    })

    const tempW = innerWidth
    const tempH = innerHeight

    const doubleCheck = () => {
      if (innerWidth !== tempW || innerHeight !== tempH)
        this.handleWindowResize()
    }
    setTimeout(doubleCheck, 100)
    setTimeout(doubleCheck, 500)
  }

  getContainerStyle() {
    const {innerWidth, innerHeight} = window
    return innerWidth > innerHeight
      ? {
          _isRotated: false,
          position: 'fixed',
          top: 0,
          left: 0,
          width: innerWidth,
          height: innerHeight,
          overflow: 'hidden'
        }
      : {
          _isRotated: true,
          position: 'fixed',
          top: 0,
          left: innerWidth,
          width: innerHeight,
          height: innerWidth,
          transform: 'rotate(90deg)',
          transformOrigin: '0 0',
          overflow: 'hidden'
        }
  }

  render() {
    const {containerStyle} = this.state
    const {width, height} = containerStyle
    const {location} = window
    const videoUrl = `${location.origin}${location.pathname}${location.search}#/video`

    return (
      <div style={containerStyle}>
        <section style={{width, height}}>
          <iframe
            src={videoUrl}
            title="video"
            frameBorder="0"
            style={{width, height}}
          />
        </section>
      </div>
    )
  }
}

export default Home
