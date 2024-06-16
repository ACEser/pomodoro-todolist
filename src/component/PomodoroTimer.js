import React, { useState, useEffect } from 'react';
import { useTodos } from '../state/TodoContext';

function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 默认25分钟转化为秒
  const [isActive, setIsActive] = useState(false); // 计时器是否活跃/运行

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      alert("时间已经结束！"); // 简单示例，实际中可用更友好的通知方式替代
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  function toggleTimer() {
    setIsActive(!isActive);
  }

  function resetTimer() {
    setIsActive(false);
    setSecondsLeft(25 * 60); // 重置为25分钟
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  }

  return (
    <div className="pomodoro-timer">
      <div className="timer-display">
        {formatTime(secondsLeft)}
      </div>
      <div className="timer-controls">
        <button className="start-pause" onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;