'use client';

import { useState, useEffect } from 'react';
import Task from './Task';
import { toast } from 'react-hot-toast';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      toast.error('Task title cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask.trim() }),
      });

      if (!response.ok) throw new Error('Failed to add task');

      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      setNewTask('');
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  // Toggle task status
  const handleToggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: task.status === 'done' ? 'pending' : 'done'
        }),
      });

      if (!response.ok) throw new Error('Failed to update task');

      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      toast.success('Task updated!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');

      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center mx-auto px-8 py-4 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 rounded-lg shadow">
            No tasks yet. Add one above!
          </div>
        ) : (
          tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
            />
          ))
        )}
      </div>
    </div>
  );
} 