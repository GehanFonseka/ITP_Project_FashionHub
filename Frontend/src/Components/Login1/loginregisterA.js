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
  { username: "review", password: "rewiew123", role: "delivery" },
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
      // Handle Registration Logic (You can add it here if needed)
      setError("Registration not available right now.");
    } else {
      // Handle Login
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
        } else if (user.role === "shoesandaccessories") {
          navigate("/F_adminDashboard");
        } else if (user.role === "accessories") {
          navigate("/F_adminDashboard");
        } else if (user.role === "delivery") {
          navigate("/manager");
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
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label>Password:</label>
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
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: "#ffffff", // White background outside the sign-in container
    height: "100vh", // Full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "300px",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9", // Optional: light gray background for the form container
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    width: "200px",
    margin: "5px 0",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#e76f51",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggleButton: {
    marginTop: "10px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    color: "#007BFF",
    textDecoration: "underline",
  },
  error: {
    color: "red",
  },
};

export default LoginRegister;