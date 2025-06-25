const StatusBar = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="status-bar">
      <div className="task-status">
        <span>Total: {total}</span> |{" "}
        <span>Completed: {completed}</span> |{" "}
        <span>Remaining: {pending}</span>
      </div>
    </div>
  );
};

export default StatusBar;