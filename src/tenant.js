import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "./utils";
import { PORT } from "./config";

const Tenant = () => {
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    OP: false,
    FAA: false,
    RDMS: false,
    CLAS: false,
  });
  
  const handleClick = async (e) => {
    console.log("created new Tenant");
    e.preventDefault();
    console.log("brandName:", brandName);
    console.log("Password:", password);
    console.log("Email:", email);
    const token = getToken()
    const result = await axios.post(
      `${PORT}/api/tenant`,
      {
        email,
        brandName,
        password,
        options,
      },
      {
      headers: {
        Authorization: token,
      },
      }
    );
    if (result) {
      console.log("Result", result);
    }
    navigate("/home");
  };
  const handleCheckboxChange = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };
  return (
    <div className="tenant-container">
      <h2>Tenant Page</h2>
      <h4>Create new Tenant</h4>
      <form className="tenant-form" onSubmit={handleClick}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Brand Name:
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </label>
        <br></br>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          OP:
          <input
            type="checkbox"
            checked={options.OP}
            onChange={() => handleCheckboxChange("OP")}
          />
        </label>
        <br />
        <label>
          FAA:
          <input
            type="checkbox"
            checked={options.FAA}
            onChange={() => handleCheckboxChange("FAA")}
          />
        </label>
        <br />
        <label>
          RDMS:
          <input
            type="checkbox"
            checked={options.RDMSc}
            onChange={() => handleCheckboxChange("RDMS")}
          />
        </label>
        <br />
        <label>
          CLAS:
          <input
            type="checkbox"
            checked={options.CLAS}
            onChange={() => handleCheckboxChange("CLAS")}
          />
        </label>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Tenant;
