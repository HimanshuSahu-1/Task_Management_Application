export default function Task({ task, onDelete, onToggle }) {
  return (
    <div className="flex w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={task.status === 'done'}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${
            task.status === 'done' 
              ? 'line-through text-gray-500 dark:text-gray-400' 
              : 'text-gray-900 dark:text-gray-100'
          }`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="ml-4 flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
        title="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Delete</span>
      </button>
    </div>
  );
} 