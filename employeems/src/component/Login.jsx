import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const startTime = performance.now(); // Get the start time
    const timeoutDuration = 3000; // Set the timeout duration in milliseconds
    let timeoutId; // Initialize a variable to store the timeout ID

    // Set a timeout to handle cases where the server takes longer than expected to respond
    timeoutId = setTimeout(() => {
      console.log("Server response timed out");
      setError("Server response timed out");
    }, timeoutDuration);

    try {
      const result = await axios.post(
        "http://localhost:3000/auth/adminlogin",
        values
      );
      clearTimeout(timeoutId); // Clear the timeout if the server responds within the timeout duration
      const endTime = performance.now(); // Get the end time
      const responseTime = endTime - startTime; // Calculate the response time
      console.log(`Response time: ${responseTime} ms`);
      if (result.data.loginStatus) {
        navigate("/dashboard");
      } else {
        setError(result.data.Error);
      }
    } catch (error) {
      clearTimeout(timeoutId); // Clear the timeout if an error occurs
      console.log("An error occurred:", error);
      setError("Please check the server connection");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })} //array function to update the email
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Log in
          </button>
          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="password">
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
