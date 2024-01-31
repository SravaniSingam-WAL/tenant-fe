import React, { useState } from "react";
//import { useAsync } from "react-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "./utils";
import { API_URL } from "./config";
import './login.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      `${API_URL}/api/login`,
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
      if(result.data.user.roleId === 1){
        navigate("/home");
      }
      else{
        navigate("/view");
      }  }
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
    <section className="login">
    <div className="content">
    <div className="heading">
    <p>Tenant Management Login</p>
    </div>
      <form onSubmit={handleLogin}>
      <div className={`form-group, position-relative`}>
        <label >
          Username:
          <input
            type="text"
            value={username}
            className={'form-control'}
            placeholder="Enter Email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        </div>
        <div className={`form-group, position-relative`}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            className={'form-control'}
            placeholder="************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        </div>
        <button type="submit"
        className={`btn-theme, button`}
        >Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
    </section>
  );
};

export default Login;
