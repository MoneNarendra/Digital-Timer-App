import {Component} from 'react'
import './index.css'

const play = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pause = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const reset = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png '

class DigitalTimer extends Component {
  state = {
    timerMin: 25,
    timerSec1: 0,
    timerSec2: 0,
    timerStarted: false,
    setTime: 25,
    resetClicked: true,
  }

  decressTime = () => {
    const {resetClicked} = this.state
    if (resetClicked) {
      this.setState(prevState => ({
        timerMin: prevState.timerMin - 1,
        setTime: prevState.setTime - 1,
      }))
    }
  }

  increaseTime = () => {
    const {resetClicked} = this.state
    if (resetClicked) {
      this.setState(prevState => ({
        timerMin: prevState.timerMin + 1,
        setTime: prevState.setTime + 1,
      }))
    }
  }

  resetBtn = () => {
    this.setState(prevState => ({
      timerMin: 25,
      timerSec1: 0,
      timerSec2: 0,
      timerStarted: false,
      resetClicked: !prevState.resetClicked,
      setTime: 25,
    }))
    clearInterval(this.timerID)
  }

  startTimer = () => {
    const {timerStarted} = this.state
    if (timerStarted === false) {
      this.timerID = setInterval(this.timerStarts, 1000)
    } else {
      clearInterval(this.timerID)
    }
    this.setState(prevState => ({
      timerStarted: !prevState.timerStarted,
      resetClicked: !prevState.resetClicked,
    }))
  }

  timerStarts = () => {
    const {timerMin, timerSec1, timerSec2} = this.state
    if (timerSec1 === 0 && timerSec2 === 0 && timerMin !== 0) {
      this.setState(prevState => ({
        timerMin: prevState.timerMin - 1,
        timerSec1: 5,
        timerSec2: 9,
      }))
    } else if (timerSec1 === 0 && timerSec2 === 0 && timerMin === 0) {
      this.resetBtn()
    } else if (timerSec2 === 0) {
      this.setState(prevState => ({
        timerSec1: prevState.timerSec1 - 1,
        timerSec2: 9,
      }))
    } else {
      this.setState(prevState => ({
        timerSec2: prevState.timerSec2 - 1,
      }))
    }
  }

  render() {
    const {timerMin, timerSec1, timerSec2, timerStarted, setTime} = this.state
    let minZero
    if (timerMin <= 9) {
      minZero = '0'
    }
    const playPauseImg = timerStarted ? pause : play
    const playPauseImgAlt = timerStarted ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="inner-container">
          <div className="timer-img-container">
            <div className="timer-container">
              <h1 className="timer">
                {minZero}
                {timerMin}:{timerSec1}
                {timerSec2}
              </h1>
              <p className="timer-dis">{timerStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="controles-container">
            <div className="play-reset-container">
              <button
                className="controle-button"
                type="button"
                onClick={this.startTimer}
              >
                <img
                  src={playPauseImg}
                  alt={playPauseImgAlt}
                  className="pause-play-img"
                />
                {timerStarted ? 'Pause' : 'Start'}
              </button>
              <button
                className="controle-button"
                type="button"
                onClick={this.resetBtn}
              >
                <img src={reset} alt="reset icon" className="pause-play-img" />
                Reset
              </button>
            </div>

            <p className="set-timer-heading">Set Timer limit</p>
            <div className="set-timer">
              <button
                type="button"
                className="inc-dec-btn"
                onClick={this.decressTime}
              >
                -
              </button>
              <p className="seted-time">{setTime}</p>
              <button
                type="button"
                className="inc-dec-btn"
                onClick={this.increaseTime}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
