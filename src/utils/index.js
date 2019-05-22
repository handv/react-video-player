function secondsToHMS(ss) {
  let seconds = Math.floor(ss || 0)
  let minutes = 0
  let hours = 0

  if (seconds >= 60) {
    if ((minutes = Math.floor(seconds / 60)) >= 60) {
      hours = Math.floor(minutes / 60)
      minutes %= 60
    }
    seconds %= 60
  }

  return {
    hours,
    minutes,
    seconds
  }
}

export function formatSeconds(ss) {
  const toTwoDigit = n => (n <= 9 ? '0' : '') + n.toString()
  let {hours, minutes, seconds} = secondsToHMS(ss)

  hours = hours ? `${toTwoDigit(hours)}:` : ''
  minutes = `${toTwoDigit(minutes)}:`
  seconds = `${toTwoDigit(seconds)}`

  return `${hours}${minutes}${seconds}`
}

export function toPercents(number, shouldBeRounded, postfix = '%') {
  number *= 100
  if (shouldBeRounded) number = Math.round(number)

  return `${number}${postfix}`
}
