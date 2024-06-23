// PomodoroTimer.js
"use client"
import React, { useState, useEffect, useRef } from "react";

import PomodoroSettings from "./PomodoroSettings";
import Modal from "./Modal";
import { TitleContext } from "./TitleContext";
import { useContext } from "react";

const PomodoroTimer = () => {
  const { selectedTitle } = useContext(TitleContext);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSeconds, setShowSeconds] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("默认番茄钟");
  const intervalId = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setIsRunning(false);
          clearInterval(intervalId.current);
        }
      }, 1000);
    } else {
      //结束专注后发送记录
      sendPomodoroData();
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current);
  }, [isRunning, hours, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
    setShowSeconds(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    //重置同样发送记录
    if (minutes + hours > 0) {
      sendPomodoroData();
    }
    setIsRunning(false);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
    setShowSeconds(false);
  };

  const formatTime = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${showSeconds ? `:${seconds.toString().padStart(2, "0")}` : ""}`;
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSaveSettings = (newSettings) => {
    setMinutes(newSettings.workTime);
    closeModal();
  };

  //发送到服务器
  const sendPomodoroData = async () => {
    const startTime = new Date();
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + hours);
    endTime.setMinutes(endTime.getMinutes() + minutes);
    endTime.setSeconds(endTime.getSeconds() + seconds);

    const pomodoroData = {
      UserID: selectedTodo ? selectedTodo.UserID : null,
      TaskID: selectedTodo ? selectedTodo.TaskID : null,
      HabitID: selectedTodo ? selectedTodo.HabitID : null,
      StartTime: startTime.toISOString(),
      EndTime: endTime.toISOString(),
      IsCompleted: !isRunning,
      Type: selectedTodo ? (selectedTodo.TaskID ? 'Task' : 'Habit') : null
    };

    try {
      await api.createPomodoro(pomodoroData);
    } catch (error) {
      console.error('Error sending pomodoro data:', error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-20">
        <div className="flex justify-center mt-8">
          <span className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          专注中
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">
          {selectedTitle ? selectedTitle.title : "默认番茄钟"}
        </h1>
        <div className="flex items-center justify-center bg-gray-200 rounded-lg p-4 mt-8">
          <span className="text-30xl font-bold">
            {formatTime(hours, minutes, seconds)}
          </span>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={pauseTimer}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={resetTimer}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={openModal}
          >
            设置
          </button>
        </div>

      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PomodoroSettings onSave={handleSaveSettings} />
      </Modal>
    </div>
  );
};
export default PomodoroTimer;
