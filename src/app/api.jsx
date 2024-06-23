import axios from 'axios';

const API_BASE_URL = 'http://localhost:800/src'; // Change this to your actual API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 读取存储的 Token
  const token = localStorage.getItem('jwtToken');
  if (token) {
    // 附加 Token 到 Authorization 头部
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
axiosInstance.interceptors.response.use(response => {
  // 处理响应
  return response;
}, error => {
  // 处理错误，例如 Token 过期
  if (error.response && error.response.status === 401) {
    // 清除 Token 并重定向到登录页面
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});


const api = {
  createTodo: async (todo) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create_todo.php`, todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },
  updateTodo: async (id, updatedTodo) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update_todo.php`, { ...updatedTodo, taskID: id });
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },
  deleteTodo: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete_todo.php`, { data: { taskID: id } });
      return response.data;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
  createPomodoro: async (pomodoroData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create_pomodoro.php`, pomodoroData);
      return response.data;
    } catch (error) {
      console.error('Error creating pomodoro:', error);
      throw error;
    }
  },
};

export default api;

/* export const getTasks = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/tasks/settings/${userId}/get_tasks.php?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

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
 */
export const getPomodoroSettings = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/pomodoro/settings/${userId}/getPomodoroSettings.php?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pomodoro settings", error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/util/login.php`, {
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
};
