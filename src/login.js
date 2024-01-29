import React, { useState } from "react";
//import { useAsync } from "react-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "./utils";
import { PORT } from "./config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    try{
    const result = await axios.post(
      `${PORT}/api/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    if (result) {
      console.log("Result", result);
      console.log("-=======", result.data.user);
      setToken(result.data.user);
      navigate("/home");
    }
  }  catch(error){
    if(error.response && error.response.status === 401){
      console.log('Invalid email or password')
      setError('Invalid email or password')
    }
    else{
    console.log(error.message,'response')
    setError(error.message)
    }
  }
  };

  return (
    <div className="login-container">
      <h2 className="loginText">Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
