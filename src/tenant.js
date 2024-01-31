import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { getRoleId, getToken ,transformOptionsArrayToObject } from "./utils";
import { API_URL } from "./config";
import './login.scss'

const Tenant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = !!location.state && location.state;
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
    <section>
    <div className="tenant-container">
      <div className="tenantHeading">{isEditMode ? "Edit" : "Create"} Tenant</div>
      <form className="tenant-form" onSubmit={handleClick}>
      <div className="form-group">
        <label>
          Email Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
          <input
            type="text"
            value={email}
            placeholder="Enter Email Id"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        </div>
        {!isEditMode && ( 
          <div className="form-group">
          <label>
              Password &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;:
              <input
                type="password"
                placeholder="****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
          </div>
        )}
        <div className="form-group">
        <label>
        Brand Name &nbsp;&nbsp;:
        <input
          type="text"
          value={brandName}
          placeholder="Enter Brand Name"
          onChange={(e) => setBrandName(e.target.value)}
        />
      </label>
      </div>
      <div className="checkboxes-group">
      <div className="checkbox">
      <label>
        OP:
        <input
          type="checkbox"
          checked={options.OP}
          onChange={() => handleCheckboxChange("OP")}
        />
      </label>
      </div>
     <div className="checkbox">
      <label>
        FAA:
        <input
          type="checkbox"
          checked={options.FAA}
          onChange={() => handleCheckboxChange("FAA")}
        />
      </label>
      </div>
      <div className="checkbox">
      <label>
        RDMS:
        <input
          type="checkbox"
          checked={options.RDMS}
          onChange={() => handleCheckboxChange("RDMS")}
        />
      </label>
      </div>
      <div className="checkbox">
      <label>
        CLAS:
        <input
          type="checkbox"
          checked={options.CLAS}
          onChange={() => handleCheckboxChange("CLAS")}
        />
      </label>
      </div>
      </div>
      <div className="buttonStyle">
        <button type="submit">{isEditMode ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
    </section>
  );
};

export default Tenant;
