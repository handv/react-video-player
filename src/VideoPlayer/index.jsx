import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './index.css'
import ControlBar from './ControlBar'
import BackBtn from './ic_class_back.svg'
import BigPlayButton from './BigPlayButton'

const HIDE_PAUSED_GROUP_FOR_CLICK = 3000
export default class VideoPlayer extends Component {
  _controlBar
  _hideControlBarTimeoutId

  constructor(props) {
    super(props)
    this.state = {
      video: null,
      bigPlayBtnVisible: true,
      controlBarVisible: false,
    }
  }

  render() {
    const {data} = this.props
    const {controlBarVisible} = this.state

    return (
      <div className="videoPlayerContainer">
        {controlBarVisible ? (
          <img
            className="backBtn"
            src={BackBtn}
            alt="back"
            onClick={this.handleClose}
          />
        ) : null}
        <video
          className="video"
          src={data && data.src}
          poster={(data && data.poster) || null}
          playsInline
          preload="load"
          airplay="allow"
          x5-playsinline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          webkit-playsinline="true"
          ref={this.handleVideoRef}
          onClick={this.handleVideoClick}
          onProgress={this.handleVideoProgress}
        />
        <BigPlayButton ctx={this} />
        <ControlBar ctx={this} ref={e => e && (this._controlBar = e)} />
      </div>
    )
  }

  componentWillUnmount() {
    const {_hideControlBarTimeoutId} = this
    clearTimeout(_hideControlBarTimeoutId)
  }

  handleVideoRef = video => {
    this.setState({video})
  }

  handleVideoClick = () => {
    const {controlBarVisible, video, bigPlayBtnVisible} = this.state
    if (!video) return
    // 播放状态可以显示隐藏控制栏
    if (!bigPlayBtnVisible) {
      if (controlBarVisible) {
        this.hideControlBar()
      } else {
        this.showControlBar()
      }
    }
  }

  handleVideoProgress = () => {
    this.forceUpdate()
  }

  toggleBigPlayBtn = () => {
    const {bigPlayBtnVisible} = this.state
    this.setState({bigPlayBtnVisible: !bigPlayBtnVisible})
  }

  showControlBar = (autoHide = true) => {
    const {_hideControlBarTimeoutId} = this
    clearTimeout(_hideControlBarTimeoutId)
    this.setState({
      controlBarVisible: true
    })
    if (autoHide)
      this._hideControlBarTimeoutId = setTimeout(
        this.hideControlBar,
        HIDE_PAUSED_GROUP_FOR_CLICK
      )
  }

  hideControlBar = () => {
    const {_hideControlBarTimeoutId} = this
    clearTimeout(_hideControlBarTimeoutId)
    this.setState({
      controlBarVisible: false
    })
  }

  play = () => {
    const {video} = this.state
    if (!video) return
    video.play()
    // 控制条按钮为暂停样式
    this._controlBar.togglePlayBtn('pause')
  }

  pause = () => {
    const {video} = this.state
    if (!video) return
    video.pause()
    this._controlBar.togglePlayBtn('play')
  }

  replay = () => {
    const {video} = this.state
    if (!video) return
    video.currentTime = 0
    this.play()
  }

  // 点击左上角退出按钮
  handleClose = () => {
    this.hideControlBar()
    this.toggleBigPlayBtn()
    this.pause()
  }
}

VideoPlayer.propTypes = {
  data: PropTypes.object.isRequired,
}
