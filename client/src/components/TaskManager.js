import { useState } from "react";

const TaskManager = ({ tasks, allTasks, addTask, updateTask, deleteTask }) => {
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleAddOrEdit = () => {
    if (!newTask.trim()) return;

    if (editId) {
      updateTask(editId, { text: newTask });
      setEditId(null);
    } else {
      addTask(newTask);
    }

    setNewTask("");
  };

  const handleComplete = (task) => {
    updateTask(task._id, { ...task, completed: !task.completed });
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setNewTask(task.text);
  };

  const toggleSelect = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    selectedTasks.forEach((id) => deleteTask(id));
    setSelectedTasks([]);
  };

  return (
    <div className="task-container">
      <input
        type="text"
        placeholder="Enter a Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddOrEdit}>{editId ? "Update Task" : "Add Task"}</button>

      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <input
            type="checkbox"
            checked={selectedTasks.includes(task._id)}
            onChange={() => toggleSelect(task._id)}
          />
          <span
            className={task.completed ? "completed-task" : ""}
            style={{ flex: 1, marginLeft: "10px" }}
          >
            {task.text}
          </span>
          <div className="task-buttons">
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <button onClick={() => handleComplete(task)}>Complete</button>
          </div>
        </div>
      ))}

      {selectedTasks.length > 0 && (
        <button style={{ marginTop: "10px", backgroundColor: "#5728ea" }} onClick={deleteSelected}>
          Delete Selected
        </button>
      )}
    </div>
  );
};

export default TaskManager;
