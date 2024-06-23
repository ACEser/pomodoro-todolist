"use client";

import { useState } from "react";
import React from "react";

export default function Habit() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Exercise",
      description: "Do 30 minutes of exercise daily",
      completed: false,
    },
    {
      id: 2,
      name: "Read",
      description: "Read for 1 hour every day",
      completed: true,
    },
    {
      id: 3,
      name: "Meditate",
      description: "Meditate for 10 minutes in the morning",
      completed: false,
    },
  ]);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDescription, setNewHabitDescription] = useState("");
  const addHabit = () => {
    if (newHabitName.trim() !== "") {
      const newHabit = {
        id: habits.length + 1,
        name: newHabitName,
        description: newHabitDescription,
        completed: false,
      };
      setHabits([...habits, newHabit]);
      setNewHabitName("");
      setNewHabitDescription("");
    }
  };
  const toggleHabitCompletion = (habitId) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === habitId ? { ...habit, completed: !habit.completed } : habit,
    );
    setHabits(updatedHabits);
  };
  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);
  };
  const getHabitCompletionHistory = () => {
    const today = new Date();
    const oneYearAgo = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate(),
    );
    const completionHistory = [];
    let currentDate = oneYearAgo;
    while (currentDate <= today) {
      const completedHabits = habits.filter(
        (habit) =>
          habit.completed &&
          new Date(habit.updatedAt).getDate() === currentDate.getDate(),
      ).length;
      completionHistory.push(completedHabits);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return completionHistory;
  };
  const getCompletionRate = () => {
    const totalCompletions = habits.filter((habit) => habit.completed).length;
    const totalHabits = habits.length;
    return totalHabits > 0 ? (totalCompletions / totalHabits) * 100 : 0;
  };
  const getLongestStreak = () => {
    const completionHistory = getHabitCompletionHistory();
    let currentStreak = 0;
    let longestStreak = 0;
    for (const completions of completionHistory) {
      if (completions > 0) {
        currentStreak += 1;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 0;
      }
    }
    return Math.max(longestStreak, currentStreak);
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
      </header>
      <main className="flex-1 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Add a New Habit</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Habit Name"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Habit Description"
              value={newHabitDescription}
              onChange={(e) => setNewHabitDescription(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={addHabit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Your Habits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="p-4 border border-gray-300 rounded space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{habit.name}</h3>
                    <p className="text-gray-500">{habit.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabitCompletion(habit.id)}
                  />
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="text-red-500"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Habit History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-300 rounded space-y-4">
              <h3 className="text-lg font-bold">Completion Calendar</h3>
              <div className="grid grid-cols-7 gap-1">
                {getHabitCompletionHistory().map((completions, index) => (
                  <div
                    key={index}
                    className={`w-full h-8 rounded-sm ${
                      completions === 0
                        ? "bg-gray-200"
                        : `bg-blue-500 opacity-[${completions / 5}]`
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="p-4 border border-gray-300 rounded space-y-4">
              <h3 className="text-lg font-bold">Completion Rate</h3>
              <div className="text-4xl font-bold">
                {getCompletionRate().toFixed(0)}%
              </div>
            </div>
            <div className="p-4 border border-gray-300 rounded space-y-4">
              <h3 className="text-lg font-bold">Longest Streak</h3>
              <div className="text-4xl font-bold">{getLongestStreak()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
