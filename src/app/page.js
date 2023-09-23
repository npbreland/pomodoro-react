'use client';
import { useState, useRef } from 'react';

export default function Home() {

  const stages = [
      {
          'name': 'Work 1/4',
          'duration': 25 * 60
      },
      {
          'name': 'Short Break 1/3',
          'duration': 5 * 60
      },
      {
          'name': 'Work 2/4',
          'duration': 25 * 60
      },
      {
          'name': 'Short Break 2/3',
          'duration': 5 * 60
      },
      {
          'name': 'Work 3/4',
          'duration': 25 * 60
      },
      {
          'name': 'Short Break 3/3',
          'duration': 5 * 60
      },
      {
          'name': 'Work 4/4',
          'duration': 25 * 60
      },
      {
          'name': 'Long Break',
          'duration': 15 * 60
      },
  ]

  const [ currentStage, setCurrentStage ] = useState(0)
  const [ timeLeft, setTimeLeft ] = useState(stages[0].duration)
  const [ isPaused, setIsPaused ] = useState(true)
  const intervalRef = useRef(null);

  const pause = () => {
    setIsPaused(true)
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const play = () => {
    if (intervalRef.current) {
      return
    }
    setIsPaused(false)
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft - 1);
      if (timeLeft === 0) {
          advanceStage()
      }
    }, 1000)
  }

  const advanceStage = () => {
      const nextStage = (currentStage + 1) % stages.length 
      setCurrentStage(nextStage);
      setTimeLeft(stages[nextStage].duration);
  }

  const restartStage = () => {
    pause()
    setTimeLeft(stages[currentStage].duration);
  }

  const restartSession = () => {
    pause()
    setCurrentStage(0);
    setTimeLeft(stages[0].duration);
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeLeftStr = `${minutes}:${seconds.toString().padStart(2, '0')}`

  return (
    <main>
      <h1>Pomodoro Timer</h1>
      <div id="time-left">{timeLeftStr}</div>
      <div>{stages[currentStage].name}</div>
      { isPaused ?
        <button onClick={() => play()} className="play-pause-toggle">Play</button>
        : <button onClick={() => pause()} className="play-pause-toggle">Pause</button>
      }
      <div className="buttons-row-2">
          <button onClick={() => advanceStage()}>Next<br/>stage</button>
          <button onClick={() => restartStage()}>Restart<br/>stage</button>
          <button onClick={() => restartSession()}>Restart session</button>
      </div>
    </main>
  )
}
