

import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(["Finish the Task", "Go to work", "Get some rest"]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1); 
  const [editedTaskText, setEditedTaskText] = useState("");
  const [completedTasks, setCompletedTasks] = useState(new Set()); 

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_item, i) => i !== index);
    setTasks(updatedTasks);
    if (completedTasks.has(index)) {
      const newCompletedTasks = new Set(completedTasks);
      newCompletedTasks.delete(index);
      setCompletedTasks(newCompletedTasks);
    }
  }

  function editTask(index) {
    setEditIndex(index);
    setEditedTaskText(tasks[index]); 
  }

  function saveEditedTask(index) {
    if (editedTaskText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedTaskText;
      setTasks(updatedTasks);
      setEditIndex(-1); 
    }
  }

  function cancelEdit() {
    setEditIndex(-1);
    setEditedTaskText("");
  }

  function completed(index) {
    if (completedTasks.has(index)) {
      const newCompletedTasks = new Set(completedTasks);
      newCompletedTasks.delete(index);
      setCompletedTasks(newCompletedTasks);
    } else {
      setCompletedTasks(new Set([...completedTasks, index]));
    }
  }

  return (
    <>
      <div className='To-do-list'>
        <h4> To-Do-List</h4>
        <div>
          <input type='text'
            placeholder='Enter a task'
            value={newTask}
            onChange={handleInputChange}
          ></input>
          <button
            className='add-button'
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <ol>
          {tasks.map((task, index) => (
            <li key={index} className={completedTasks.has(index) ? 'completed' : ''}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <button onClick={() => saveEditedTask(index) }>✅</button> 
                  <button onClick={cancelEdit}>❌</button>
                </>
              ) : (
                <>
                  <span className='text'>{task}</span>
                  <button className='delete-button' onClick={() => deleteTask(index)}>Delete 🗑️</button>
                  <button className='edit-button' onClick={() => editTask(index)}>Edit ✏️</button>
                  <button className='complete-button' onClick={() => completed(index)}>
                    {completedTasks.has(index) ? "Incomplete 👎🏻" : "Complete👍🏻"}
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;

