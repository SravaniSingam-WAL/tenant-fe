import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBrandName, getToken, transformOptionsArrayToObject } from "./utils";
import { API_URL } from "./config";
import { getTenantId } from "./utils";

const View = () => {
  const navigate = useNavigate();
  const [tenantDetails, setTenantDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [options, setOptions] = useState([]);

  const handleLogin = () => {
    console.log("Login is Done");
    navigate("/tenant");
  };
  const viewTenants = async () => {
    console.log("Clicked on View Tenant");
    const token = getToken();
    const tenantId = getTenantId();
    const result = await axios.get(`${API_URL}/api/tenant/${tenantId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(result.data.data);
    setTenantDetails(result.data.data);
  };
  const tenantId = getTenantId();

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      const result = await axios.get(`${API_URL}/api/tenant/${tenantId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("result data", result.data);
      console.log("result data =====", result.data.data);
      if (result) {
        const { userName, brandName, permissions } = result.data.data;
        console.log(email, "email");
        console.log(brandName, "brandName");
        console.log(permissions, "Permissions");
        setEmail(userName);
        setBrandName(brandName);
        setOptions(permissions);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h2>BrandName :{brandName}</h2>
      <div>
        <br />
        <br />
      </div>
      <div>
        <strong>Email:</strong> {email}
        <p>
          {" "}
          <strong>BrandName:</strong> {brandName}
        </p>
        <p>
          <h4>Applications he has permissions</h4>
          <div >
            {options.map(
              (app, index) =>
                app.isAccess && (
                  <div key={index} >
                        <ul >
                          {app.application.name}
                        </ul>
                   </div>
                )
            )}
          </div>
        </p>
        <button
          onClick={() => {
            navigate(`/tenant`, { state: { id: tenantId } });
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default View;
