import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import StatusBar from "./components/StatusBar";
import TaskManager from "./components/TaskManager";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const API_URL = "http://localhost:5000/api/tasks"; 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async (text) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed: false }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (id, updatedTask) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === "Completed") return matchesSearch && task.completed;
    if (filterStatus === "Pending") return matchesSearch && !task.completed;
    return matchesSearch;
  });

  return (
    <div>
      <Header />
      <div className="centered-container">
        <Filters
          filterText={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <StatusBar tasks={tasks} />
        <TaskManager
          tasks={filteredTasks}
          allTasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
