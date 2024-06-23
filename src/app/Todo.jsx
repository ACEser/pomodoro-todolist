// TodoList.js
"use client"
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PomodoroTimer from "./Pomodoro"; // 假设Pomodoro组件已经存在
import { TitleContext } from "./TitleContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import api from './api';
import { useRouter } from 'next/router';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const inputRef = useRef(null);


  // 获取当前页面的URL参数
  const { id } = useParams();

  // 在组件挂载时获取服务器上的待办事项列表
  useEffect(() => {
    console.log("Component mounted with id:", id);
    const todosFromLocalStorage = localStorage.getItem(`todos_${id}`);
    if (todosFromLocalStorage) {
      console.log("Todos loaded from localStorage:", todosFromLocalStorage);
      setTodos(JSON.parse(todosFromLocalStorage));
    } else {
      console.log("No todos found in localStorage, using default todos.");
      setTodos([]);
    }
  }, [id]);

  // 每30秒发送一次待办事项到服务器
  useEffect(() => {
    const interval = setInterval(() => {
      sendTodosToServer();
    }, 30000);

    return () => clearInterval(interval);
  }, [todos]);

  // 更新本地存储
  useEffect(() => {
    localStorage.setItem(`todos_${id}`, JSON.stringify(todos));
  }, [todos, id]);

  const handleAddTodo = async (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    console.log("Adding todo with title:", inputRef.current.value);
    if (inputRef.current.value.trim() === "") {
      alert("待办事项不能为空。");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: inputRef.current.value,
      description: description,
      completed: false,
      tags: inputRef.current.value.split(/\s*#\s*/),
    };
    try {
      const createdTodo = await api.createTodo(newTodo);
      setTodos([...todos, createdTodo]);
      inputRef.current.value = '';
      setDescription('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const sendTodosToServer = async () => {
    try {
      await api.updateTodo(id, todos);
      console.log("Todos sent to server successfully");
    } catch (error) {
      console.error("Error sending todos to server:", error);
    }
  };

  //发送更新后的待办事项到服务器
  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updated = await api.updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? updated : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // 更新待办事项的描述
  const handleSaveDescription = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, description: description } : todo,
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    //发送更新后的待办事项到服务器
    handleUpdateTodo(todoId, { description: description });
  };

  // 标记待办事项为完成或撤销完成
  const handleToggleCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
    //发送更新后的待办事项到服务器
    handleUpdateTodo(todoId, { completed: !todos.find(todo => todo.id === todoId).completed });
  };

// 开始专注待办事项
const handleStartFocus = (todo) => {
  const { setSelectedTitle } = useContext(TitleContext);
  setSelectedTodo(todo);
  // 使用 useRouter 获取路由对象，然后使用 push 方法导航
  const router = useRouter();
  router.push('/pomodoro');
};

  // 删除待办事项
  const handleDeleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodoToDelete(id);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const confirmDelete = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete);
    setTodos(updatedTodos);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const renderTodo = (todo) => (
    <li
      key={todo.id}
      className={`bg-white rounded-lg p-4 shadow-lg ${todo.completed ? "text-gray-500 opacity-75" : ""}`}
    >
      <h2 className="text-xl font-bold">{todo.title}</h2>
      {editingTodoId === todo.id ? (
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleSaveDescription(todo.id)}
          >
            保存
          </button>
        </div>
      ) : (
        <div className="text-gray-700">
          {!todo.completed && todo.description && (
            <div>
              {todo.description.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
              {todo.description.split("\n").length > 3 && (
                <p className="text-red-500 text-sm">描述最多只能换三行。</p>
              )}
            </div>
          )}
        </div>
      )}
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setEditingTodoId(todo.id)}
        >
          备注
        </button>
        <button
          className={`px-4 py-2 ${todo.completed ? "bg-gray-500" : "bg-green-500"} text-white rounded hover:bg-green-600`}
          onClick={() => handleToggleCompleted(todo.id)}
        >
          {todo.completed ? "撤销" : "完成"}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleStartFocus(todo)}
        >
          开始专注
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          删除
        </button>
      </div>
    </li>
  );

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">待办事项列表</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          ref={inputRef}
          placeholder="添加待办事项"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          创建待办事项
        </button>
      </form>
      <div className="mt-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">未完成事项</h2>
          <ul className="space-y-4">
            {todos
              .filter((todo) => !todo.completed)
              .map((todo) => renderTodo(todo))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">已完成事项</h2>
          <ul className="space-y-4">
            {todos
              .filter((todo) => todo.completed)
              .map((todo) => renderTodo(todo))}
          </ul>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-4">确定要删除这个待办事项吗？</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                确定
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={cancelDelete}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}