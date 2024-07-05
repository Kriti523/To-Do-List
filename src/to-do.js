import React, { useState } from "react";

export default function Todo() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the input value for a new task
  const [inputValue, setInputValue] = useState("");
  // State for editing index
  const [editingIndex, setEditingIndex] = useState(null);
  // State for the edited task's text
  const [editInputValue, setEditInputValue] = useState("");

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  // Function to start editing a task
  const startEditingTask = (index) => {
    setEditingIndex(index);
    setEditInputValue(tasks[index].text);
  };

  // Function to save the edited task
  const saveEditTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editInputValue } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
  };


  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  // Function to delete a task
  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  // Calculate the number of completed tasks
  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div>
        <h1 className="mt-5 text-4xl font-extrabold text-transparent bg-clip-text text-gray-400">
          To-Do matic
        </h1>
      </div>
      <div className="mt-6 flex justify-stretch items-center rounded-xl h-[20vh] w-[80vh] bg-gray-400 bg-gradient-to-r from-gray-200 to-gray-600">
        <span className="pl-6 text-xl font-medium font-sans text-gray-600">
          {tasks.length === 0
            ? "You don't have any todos"
            : completedTasksCount === 0
            ? "Your tasks are Pending"
            : `Good Job! ${completedTasksCount} task${completedTasksCount > 1 ? 's' : ''} done`}
        </span>
        <div className="bg-gray-100 h-24 w-24 rounded-full flex justify-center items-center ml-auto mr-9">
          {completedTasksCount}/{tasks.length}
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center rounded-xl h-[50vh] w-[80vh] bg-gradient-to-r from-gray-200 to-gray-600">
        <div className="mt-3 flex gap-5 justify-center items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add task"
            className="h-[4.6vh] pl-1 bg-gray-100 border-gray-500 border-2 rounded font-mono font-extralight text-gray-500"
          />
          <button
            onClick={handleAddTask}
            className="rounded h-[4.6vh] w-auto pl-2 pr-2 bg-orange-400"
          >
            Add Task
          </button>
        </div>
        <h1 className="mt-2 font-mono text-xl text-gray-800">Your List of tasks</h1>
        <div className="overflow-y-scroll scroll-m-0 no-scrollbar">
          <ul className="mt-2 flex flex-col space-y-3">
            {tasks.map((task, index) => (
              <li
                className={`flex justify-center align-middle gap-2 items-center rounded pl-2 pr-2 bg-white h-[6vh] w-[60vh]`}
                key={index}
              >
                <input
                  type="checkbox"
                  className="h-[3.5vh] w-[3.5vh]  cursor-pointer"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editInputValue}
                      onChange={(e) => setEditInputValue(e.target.value)}
                      className="h-[4.6vh] pl-1 bg-gray-100 border-gray-500 border-2 rounded font-mono font-extralight text-gray-500"
                    />
                    <button
                      onClick={() => saveEditTask(index)}
                      className="rounded mr-auto ml-auto h-[4.6vh] w-auto pl-2 pr-2 bg-orange-400"
                    >
                      Save
                    </button>
                    
                  </>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <button
                      className="rounded ml-auto h-[4.6vh] w-auto pl-2 pr-2 bg-orange-400"
                      onClick={() => startEditingTask(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded ml-2 h-[4.6vh] w-auto pl-2 pr-2 bg-orange-400"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}



