import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './index.css'
import IMAGE_PLAY from './but_class_play.svg'
import IMAGE_BEGIN from './but_class_begin.svg'
import IMAGE_CONTINUE from './but_class_continue.svg'

export default class BigPlayButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onlyPlayVisible: true
    }
  }

  render() {
    const {onlyPlayVisible} = this.state
    const {
      ctx: {
        state: {video, bigPlayBtnVisible}
      }
    } = this.props

    if (bigPlayBtnVisible && video) {
      // 首次加载只显示播放按钮
      if (onlyPlayVisible) {
        return (
          <div className="videoContainer">
            <div className="videoMask" />
            <div className="videoImgContainer" onClick={this.handleContinue}>
              <img alt="play" src={IMAGE_PLAY} className="videoImg" />
            </div>
          </div>
        )
      }

      return (
        <div className="videoContainer">
          <div className="videoMask" />
          <div className="videoImgContainer" onClick={this.handleBegin}>
            <img src={IMAGE_BEGIN} className="videoImg" alt="begin" />
            <span>重新开始</span>
          </div>
          <div className="videoImgContainer" onClick={this.handleContinue}>
            <img src={IMAGE_CONTINUE} className="videoImg" alt="continiue" />
            <span>继续</span>
          </div>
        </div>
      )
    }

    return null
  }

  handleContinue = () => {
    const {
      ctx: {play, hideControlBar, toggleBigPlayBtn}
    } = this.props

    this.setState({onlyPlayVisible: false})
    play()
    hideControlBar()
    toggleBigPlayBtn()
  }

  handleBegin = () => {
    const {
      ctx: {replay, toggleBigPlayBtn}
    } = this.props

    this.setState({onlyPlayVisible: false})
    replay()
    toggleBigPlayBtn()
  }
}

BigPlayButton.propTypes = {
  ctx: PropTypes.object.isRequired
}
