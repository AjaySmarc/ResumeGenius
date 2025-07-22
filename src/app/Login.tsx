import React, { useState } from "react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    loginUsername: "",
    loginPassword: "",
    registerUsername: "",
    registerPassword: "",
    registerConfirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const inputStyle = {
    padding: 12,
    fontSize: 16,
    border: "1.5px solid #ccc",
    borderRadius: 6,
    marginBottom: 15,
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: 6,
    fontSize: 14,
    color: "#333",
    display: "block",
  };

  const containerStyle = {
    maxWidth: 360,
    margin: "40px auto",
    padding: 30,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: 10,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const tabStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 25,
    cursor: "pointer",
  };

  const activeTabStyle = {
    borderBottom: "3px solid #007BFF",
    fontWeight: "700",
    color: "#007BFF",
    paddingBottom: 5,
  };

  return (
    <div style={containerStyle}>
      {/* Tabs */}
      <div style={tabStyle}>
        <div
          onClick={() => setActiveTab("login")}
          style={activeTab === "login" ? activeTabStyle : {}}
        >
          Login
        </div>
        <div
          onClick={() => setActiveTab("register")}
          style={activeTab === "register" ? activeTabStyle : {}}
        >
          Register
        </div>
      </div>

      {/* Login Form */}
      {activeTab === "login" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Login as ${formData.loginUsername}`);
          }}
        >
          <label htmlFor="loginUsername" style={labelStyle}>
            Username
          </label>
          <input
            id="loginUsername"
            name="loginUsername"
            type="text"
            placeholder="Enter your username"
            value={formData.loginUsername}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="loginPassword" style={labelStyle}>
            Password
          </label>
          <input
            id="loginPassword"
            name="loginPassword"
            type="password"
            placeholder="Enter your password"
            value={formData.loginPassword}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />

          {/* OAuth Google Button */}
          <button
            type="button"
            style={{ ...buttonStyle, width: "100%", marginBottom: 15 }}
            onClick={() => alert("Login with Google")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          >
            Continue with Google
          </button>

          {/* Login Button */}
          <button
            type="submit"
            style={{ ...buttonStyle, width: "100%" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          >
            Login
          </button>
        </form>
      )}

      {/* Register Form */}
      {activeTab === "register" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData.registerPassword !== formData.registerConfirmPassword) {
              alert("Passwords do not match!");
              return;
            }
            alert(`Registered as ${formData.registerUsername}`);
          }}
        >
          <label htmlFor="registerUsername" style={labelStyle}>
            Username
          </label>
          <input
            id="registerUsername"
            name="registerUsername"
            type="text"
            placeholder="Choose a username"
            value={formData.registerUsername}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="registerPassword" style={labelStyle}>
            Password
          </label>
          <input
            id="registerPassword"
            name="registerPassword"
            type="password"
            placeholder="Enter a password"
            value={formData.registerPassword}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />

          <label htmlFor="registerConfirmPassword" style={labelStyle}>
            Confirm Password
          </label>
          <input
            id="registerConfirmPassword"
            name="registerConfirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.registerConfirmPassword}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />

          <button
            type="submit"
            style={{ ...buttonStyle, width: "100%" }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
}
