import React, { useState, useEffect } from "react";

function App() {
  const [developer, setDeveloper] = useState("");
  const [resource, setResource] = useState("");
  const [schedule, setSchedule] = useState("");

  const [allocations, setAllocations] = useState(() => {
    const saved = localStorage.getItem("allocations");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("allocations", JSON.stringify(allocations));
  }, [allocations]);

  const addAllocation = () => {
    if (
      developer.trim() === "" ||
      resource.trim() === "" ||
      schedule.trim() === ""
    )
      return;

    setAllocations([
      ...allocations,
      { developer, resource, schedule }
    ]);

    setDeveloper("");
    setResource("");
    setSchedule("");
  };

  const deleteAllocation = (index) => {
    const updated = allocations.filter((_, i) => i !== index);
    setAllocations(updated);
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
          width: "750px",
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
            fontSize: "30px",
            marginBottom: "25px",
            whiteSpace: "nowrap"
          }}
        >
          Software Tools & Resource Schedule
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px"
          }}
        >
          <input
            type="text"
            placeholder="Developer Name"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          />

          <input
            type="text"
            placeholder="Tool / Resource"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          />

          <input
            type="text"
            placeholder="Schedule"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            style={{
              width: "120px",
              padding: "12px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          />

          <button
            onClick={addAllocation}
            style={{
              padding: "12px 18px",
              background: "#6c4ce8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px"
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#5035b8")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#6c4ce8")
            }
          >
            Allocate
          </button>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0
          }}
        >
          {allocations.map((item, index) => (
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
                <b>{item.developer}</b> — {item.resource} —{" "}
                <b>{item.schedule}</b>
              </span>

              <button
                onClick={() => deleteAllocation(index)}
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
          Manage resources efficiently and stay on schedule!
        </p>
      </div>
    </div>
  );
}

export default App;