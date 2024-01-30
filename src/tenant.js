import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { getRoleId, getToken ,transformOptionsArrayToObject } from "./utils";
import { API_URL } from "./config";
const Tenant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const isEditMode = Boolean(id);
console.log(isEditMode)
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    OP: false,
    FAA: false,
    RDMS: false,
    CLAS: false,
  });
  useEffect( () => {
    const fetchData = async () => {
      if (isEditMode) {
        const token = getToken();
        const result = await axios.get(`${API_URL}/api/tenant/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log('result data',result.data)
        console.log('result data =====',result.data.data)
        if (result) {
          const { userName, brandName, permissions } = result.data.data;
          console.log(email,'email')
          console.log(brandName,'brandName')
          console.log(permissions,'Permissions')
          const transformedOptions = transformOptionsArrayToObject(permissions);
          console.log('object',transformedOptions)
          setEmail(userName);
          setBrandName(brandName);
          setOptions(transformedOptions);
        }
      }
    };

    fetchData();
  }, [id, isEditMode]);

  const handleClick = async (e) => {
    e.preventDefault();

    const token = getToken();
    const endpoint = isEditMode
      ? `${API_URL}/api/tenant/${id}`
      : `${API_URL}/api/tenant`;

    const data = isEditMode
      ? { email, brandName, options }
      : { email, brandName, password, options };

    const result = isEditMode
      ? await axios.put(endpoint, data, { headers: { Authorization: token } })
      : await axios.post(endpoint, data, { headers: { Authorization: token } });

    if (result) {
      console.log("Result", result);
    }
    if(getRoleId() === 1){
      navigate("/home");
    }
    else{
      navigate("/view");
    }
   
  };

  const handleCheckboxChange = (option) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
    <div className="tenant-container">
      <h2>{isEditMode ? "Edit" : "Create"} Tenant</h2>
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
        {!isEditMode && ( 
          <>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
          </>
        )}
        <label>
        Brand Name:
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </label>
      <br></br>
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
          checked={options.RDMS}
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
        <button type="submit">{isEditMode ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default Tenant;
