// PomodoroSettings.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PomodoroSettings = ({ onSave }) => {
  const [settings, setSettings] = useState({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    cycles: 4,
  });

  const [errors, setErrors] = useState({
    workTime: "",
    shortBreak: "",
    longBreak: "",
    cycles: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("");
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const validateSetting = (value, type) => {
    if (value <= 0) {
      return ` ${type} 不能是负数或0。`;
    } else if (value > 120) {
      return ` ${type} 不能超过120分钟。`;
    } else if (isNaN(value)) {
      return ` ${type} 必须是一个数字。`;
    }
    return "";
  };

  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    const error = validateSetting(value, name);
    setErrors({
      ...errors,
      [name]: error,
    });

    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("请修正表单中的错误后再提交。");
      return;
    }

    try {
      await axios.post("/pomodorosettings.php", settings);
      onSave(settings); // 调用父组件的保存函数
    } catch (error) {
      console.error("Error submitting settings:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">番茄钟设置</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="workTime"
            className="block text-gray-700 font-bold mb-2"
          >
            工作时间（分钟）
          </label>
          <input
            type="number"
            id="workTime"
            name="workTime"
            value={settings.workTime}
            onChange={handleSettingChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.workTime && (
            <p className="text-red-500 text-sm">{errors.workTime}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="shortBreak"
            className="block text-gray-700 font-bold mb-2"
          >
            短休息时间（分钟）
          </label>
          <input
            type="number"
            id="shortBreak"
            name="shortBreak"
            value={settings.shortBreak}
            onChange={handleSettingChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.shortBreak && (
            <p className="text-red-500 text-sm">{errors.shortBreak}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="longBreak"
            className="block text-gray-700 font-bold mb-2"
          >
            长休息时间（分钟）
          </label>
          <input
            type="number"
            id="longBreak"
            name="longBreak"
            value={settings.longBreak}
            onChange={handleSettingChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.longBreak && (
            <p className="text-red-500 text-sm">{errors.longBreak}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="cycles"
            className="block text-gray-700 font-bold mb-2"
          >
            循环次数
          </label>
          <input
            type="number"
            id="cycles"
            name="cycles"
            value={settings.cycles}
            onChange={handleSettingChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.cycles && (
            <p className="text-red-500 text-sm">{errors.cycles}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存设置
        </button>
      </form>
    </div>
  );
};

export default PomodoroSettings;
