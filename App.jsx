import React, { useState, useEffect } from "react";

function App() {
  const [employee, setEmployee] = useState("");
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("employeeTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("employeeTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (employee.trim() === "" || task.trim() === "") return;

    setTasks([...tasks, { employee, task }]);

    setEmployee("");
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "30px"
      }}
    >
      <div
        style={{
          width: "650px",
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#39358f",
            fontSize: "32px",
            marginBottom: "25px",
            whiteSpace: "nowrap"
          }}
        >
          Manager Task Assignment
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px"
          }}
        >
          <input
            type="text"
            placeholder="Employee Name"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "15px"
            }}
          />

          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "15px"
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "12px 18px",
              background: "#6c4ce8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px"
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#5035b8")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#6c4ce8")
            }
          >
            Assign
          </button>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0
          }}
        >
          {tasks.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f5f3ff",
                padding: "15px 18px",
                marginBottom: "12px",
                borderRadius: "10px",
                transition: "0.3s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#e9e5ff";
                e.currentTarget.style.transform = "translateX(5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#f5f3ff";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span style={{ color: "#333" }}>
                <b style={{ color: "#6c4ce8" }}>
                  {index + 1}.
                </b>{" "}
                <b>{item.employee}</b> — {item.task}
              </span>

              <button
                onClick={() => deleteTask(index)}
                style={{
                  background: "#ff5c5c",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "7px",
                  cursor: "pointer"
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "#d93636")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "#ff5c5c")
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <p
          style={{
            textAlign: "center",
            color: "#6c4ce8",
            marginTop: "25px",
            fontSize: "14px"
          }}
        >
          Assign tasks, manage work, achieve goals!
        </p>

      </div>
    </div>
  );
}

export default App;