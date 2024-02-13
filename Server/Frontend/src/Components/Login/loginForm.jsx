/* eslint-disable eqeqeq */
import "./loginForm.css";
import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();

  const Auth = async (e) => {
    console.log("Username Input = ", username);
    console.log("Password Input = ", password);
    const API_URL = env.SERVER_BACKEND;
    e.preventDefault();
    const axiosSetup = {
      method: "POST",
      url: `${API_URL}/loginUser`,
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
      data: {
        username,
        password,
      },
    };
    try {
      const axiosResponse = await axios.request(axiosSetup);
      const dataResponse = axiosResponse.data;
      const messageResponse = dataResponse.message;
      const statusCode = dataResponse.statusCode;

      if (statusCode != 201) {
        setMsg(messageResponse);
        setPassword("");
      } else {
        // navigate("/home");
        console.log("Data Response Login =>", dataResponse);
      }
    } catch (error) {
      console.log("Error Catch :", error);
    }
  };
  return (
    <div className="page">
      <div className="cover">
        <h1>Naxgrinting IoT</h1>
        <h3>Remote Kipas</h3>
        <div className="text-danger">{msg}</div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="login-btn" onClick={Auth}>
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
