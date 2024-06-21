import axios from 'axios';

const API_BASE_URL = 'http://localhost'; // Change this to your actual API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const getTasks = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/tasks/settings/${userId}/get_tasks.php?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

// Define other API functions here (createTask, updateTask, deleteTask)

export const createTask = async (task) => {
  try {
    const response = await axiosInstance.post('/api/tasks/settings/${userId}/create_task.php?userId=${userId}', task);
    return response.data;
  } catch (error) {
    console.error("Error creating task", error);
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axiosInstance.patch(`/api/tasks/${userId}/updateTask.php?userId=${userId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axiosInstance.delete(`/api/tasks/${userId}/deleteTask.php?userId=${userId}`);
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};

export const getPomodoroSettings = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/pomodoro/settings/${userId}/getPomodoroSettings.php?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pomodoro settings", error);
    throw error;
  }
};



async function login(username, password) {
  try {
    const response = await axios.post('./util/login.php', {
      username,
      password
    });

    if (response.data.success) {
      return response.data.token;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}