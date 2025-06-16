'use client';

import TaskList from './components/TaskList';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      {/* Center column for heading + description + list */}
      <div className="flex flex-col items-center space-y-6 text-center max-w-xl w-full">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
          Task Management
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          Organize your tasks efficiently and boost your productivity
        </p>

        {/* TaskList component */}
        <div className="w-full">
          <TaskList />
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 2000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
    </main>
  );
}
