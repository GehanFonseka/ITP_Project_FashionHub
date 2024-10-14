import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation between pages

const predefinedUsers = [
  { username: "finance", password: "finance123", role: "finance" },
  { username: "sup", password: "sup123", role: "supporter" },
  { username: "saloon", password: "saloon123", role: "saloon" },
  { username: "clothing", password: "clothing123", role: "clothing" },
  { username: "reviews", password: "reviews123", role: "reviews" },
  { username: "accessories", password: "accessories123", role: "accessories" },
  { username: "delivery", password: "delivery123", role: "delivery" },
  { username: "review", password: "review123", role: "delivery" },
];

const LoginRegister = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle login and registration logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      setError("Registration not available right now.");
    } else {
      const user = predefinedUsers.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {

        if (user.role === "finance") {
          navigate("/overview");
        } else if (user.role === "supporter") {
          navigate("/contact");
        } else if (user.role === "saloon") {
          navigate("/Dashboard");
        } else if (user.role === "clothing") {
          navigate("/C_AdminDB01");
        } else if (user.role === "reviews") {
          navigate("/DashboardContainer");
        } else if (user.role === "accessories") {
          navigate("/F_adminDashboard");
        } else if (user.role === "delivery") {
          navigate("/OrderManage");
        } else {
          navigate("/customer");

        }
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.heading}>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={styles.toggleButton}
        >
         
        </button>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: "#f0f2f5", // Light gray background for better contrast
    height: "100vh", // Full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "400px", // Increased width
    height: "400px", // Increased height
    textAlign: "center",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff", // Clean white background for form
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
  },
  heading: {
    fontSize: "26px", // Increased font size
    marginBottom: "20px",
    fontFamily: "'Roboto', sans-serif", // Modern font
    color: "#333", // Darker heading color
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: "15px",
    width: "100%", // Full width for containers
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    display: "block",
    fontWeight: "bold",
    color: "#555", // Darker color for labels
  },
  input: {
    padding: "12px", // Increased padding for inputs
    width: "100%", // Full width for inputs
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border-color 0.3s", // Smooth transition effect
  },
  button: {
    padding: "12px 20px", // Increased padding
    backgroundColor: "#e76f51",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%", // Full width for button
    marginTop: "10px",
    transition: "background-color 0.3s ease",
    fontSize: "16px", // Increased font size
  },
  buttonHover: {
    backgroundColor: "#d45a36", // Darker shade on hover
  },
  toggleButton: {
    marginTop: "15px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    color: "#007BFF",
    textDecoration: "underline",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px", // Increased error message font size
  },
};

export default LoginRegister;
