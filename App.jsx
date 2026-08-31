import React, { useState, useEffect } from "react";

function App() {
  const [activity, setActivity] = useState("");

  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const addActivity = () => {
    if (activity.trim() === "") return;
    setActivities([...activities, activity]);
    setActivity("");
  };

  const deleteActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
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
          width: "600px",
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
            whiteSpace: "nowrap",
            fontWeight: "bold"
          }}
        >
          Daily Activities of Students
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
            placeholder="Enter Daily Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              border: "2px solid #ddd",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none"
            }}
          />

          <button
            onClick={addActivity}
            style={{
              padding: "12px 22px",
              background: "#6c4ce8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer"
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#5035b8")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#6c4ce8")
            }
          >
            Add
          </button>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0
          }}
        >
          {activities.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f5f3ff",
                padding: "14px 18px",
                marginBottom: "12px",
                borderRadius: "10px",
                fontSize: "16px",
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
              <span>
                <b style={{ color: "#6c4ce8" }}>
                  {index + 1}.
                </b>{" "}
                {item}
              </span>

              <button
                onClick={() => deleteActivity(index)}
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
          Stay organized, stay productive, achieve your goals!
        </p>

      </div>
    </div>
  );
}

export default App;