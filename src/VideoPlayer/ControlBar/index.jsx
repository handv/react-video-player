import React, {Component} from 'react'
import PropTypes from 'prop-types'
import lClamp from 'lodash/clamp'

import './index.css'
import IMAGE_PLAY from './play.svg'
import IMAGE_PAUSE from './pause.svg'
import IMAGE_DRAG_BTN from './dragBtn.svg'
import {toPercents, formatSeconds} from '../../utils'

const SPEED = {
  slow: {
    text: '慢速',
    speed: 0.8
  },
  normal: {
    text: '常速',
    speed: 1
  }
}

const IMG = {
  play: IMAGE_PLAY,
  pause: IMAGE_PAUSE
}
export default class ControlBar extends Component {
  _elProgressBar
  _isPressed = false

  constructor(props) {
    super(props)
    this.state = {
      speedType: 'normal',
      imgStatus: 'pause', // 是播放按钮还是暂停按钮
      draggingPercents: null,
      dragBtnWidth: 0
    }
  }

  renderBufferedBar = () => {
    const {
      ctx: {
        state: {video}
      }
    } = this.props
    const bufferedBars = []
    for (let i = 0; i < video.buffered.length; i++) {
      bufferedBars.push(
        <div
          key={i}
          draggable={false}
          className="bufferedBar"
          style={{
            marginLeft: toPercents(video.buffered.start(i) / video.duration),
            width: toPercents(
              (video.buffered.end(i) - video.buffered.start(i)) / video.duration
            )
          }}
        />
      )
    }
    return bufferedBars
  }

render() {
    const {_isPressed} = this
    const {speedType, dragBtnWidth, draggingPercents, imgStatus} = this.state
    const {
      ctx: {
        state: {video, controlBarVisible}
      }
    } = this.props

    if (!_isPressed && (!video || !controlBarVisible)) return null

    const currentTimePercents = toPercents(video.currentTime / video.duration)
    const dragBtnPercents = _isPressed
      ? toPercents(draggingPercents)
      : currentTimePercents

    return (
      <div className="ctrContainer">
        <img
          alt="pause"
          draggable={false}
          src={IMG[imgStatus]}
          className="pauseBtn"
          onClick={this.handlePlay}
        />
        <div className="currentTime">{formatSeconds(video.currentTime)}</div>

        <div
          draggable={false}
          className="progressBarWrapper"
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
        >
          <div
            draggable={false}
            className="progressBar"
            ref={e => (this._elProgressBar = e)}
          >
            {this.renderBufferedBar()}
            <div
              draggable={false}
              className="timeBar"
              style={{width: dragBtnPercents}}
            />
            <img
              alt="drag"
              draggable={false}
              className="dragBtn"
              src={IMAGE_DRAG_BTN}
              style={
                dragBtnWidth
                  ? {left: `calc(${dragBtnPercents} - ${dragBtnWidth / 2}px)`}
                  : ''
              }
            />
            {_isPressed ? (
              <div
                draggable={false}
                className="draggingSeconds"
                style={{left: `calc(${dragBtnPercents} - 28px)`}}
              >
                {formatSeconds(draggingPercents * video.duration)}
              </div>
            ) : null}
          </div>
        </div>

        <div className="duration">{formatSeconds(video.duration)}</div>
        <div className="speedBtn" onClick={this.handleSpeed}>
          {SPEED[speedType].text}
        </div>
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    const fontSize = parseFloat(document.documentElement.style.fontSize)
    this.setState({dragBtnWidth: 0.32 * fontSize})
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleMouseUp)
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  getTimePercentsByPageX(pageX) {
    const {left, width} = this._elProgressBar.getBoundingClientRect()
    return lClamp((pageX - left) / width, 0, 1)
  }

  setVideoCurrentTimeByPercents(percents) {
    const {
      ctx: {
        state: {video}
      }
    } = this.props

    video.currentTime = video.duration * percents
  }

  showControlBar(autoHide) {
    const {
      ctx: {showControlBar}
    } = this.props

    showControlBar(autoHide)
  }

  handleTouchStart = e => this.handleMouseDown(e.touches[0])
  handleTouchMove = e => this.handleMouseMove(e.touches[0])
  handleTouchEnd = e => {
    if (e.cancelable) e.preventDefault()
    if (!e.touches.length) this.handleMouseUp(e.changedTouches[0])
  }

  handleMouseDown = ({pageX}) => {
    const {_isPressed} = this
    if (_isPressed) return
    this._isPressed = true
    this.showControlBar()
    this.setState({
      draggingPercents: this.getTimePercentsByPageX(pageX)
    })
  }

  handleMouseMove = ({pageX}) => {
    const {_isPressed} = this
    if (!_isPressed) return
    this.showControlBar(false)
    this.setState({
      draggingPercents: this.getTimePercentsByPageX(pageX)
    })
  }

  handleMouseUp = ({pageX}) => {
    const {_isPressed} = this
    if (!_isPressed) return
    this._isPressed = false
    this.showControlBar()
    this.setVideoCurrentTimeByPercents(this.getTimePercentsByPageX(pageX))
    this.setState({
      draggingPercents: null
    })
  }

  handlePlay = () => {
    const {
      ctx: {
        play,
        pause,
        state: {video}
      }
    } = this.props
    if(video.paused){
      play()
    }else {
      pause()
    }
  }

  togglePlayBtn = (status) => {
    this.setState({imgStatus: status})
  }

  handleSpeed = () => {
    const {
      ctx: {
        state: {video}
      }
    } = this.props

    const {speedType} = this.state

    switch (speedType) {
      case 'slow':
        video.playbackRate = SPEED.normal.speed
        this.setState({speedType: 'normal'})
        break
      case 'normal':
        video.playbackRate = SPEED.slow.speed
        this.setState({speedType: 'slow'})
        break
      default:
        break
    }
  }

  isDragging() {
    const {_isPressed} = this
    return _isPressed
  }
}

ControlBar.propTypes = {
  ctx: PropTypes.object.isRequired
}
