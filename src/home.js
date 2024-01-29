import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBrandName, getToken } from "./utils";
import { PORT } from "./config";

const Home = () => {
  const navigate = useNavigate();
  const [tenantDetails,setTenantDetails] =useState([])
  
  const handleLogin = ()=>{
    console.log('Login is Done')
    navigate("/tenant");
    
  }
  const viewTenants = async ()=>{
    console.log('Clicked on View Tenant')
    const token=getToken()
    const result = await axios.get(
      `${PORT}/api/tenants`,
      {
        headers: {
          Authorization: token
        },
       }
    );
    console.log(result.data.data)
    setTenantDetails(result.data.data)
  }
  return (
    <div className="home-container">
      <h2>Home Page</h2>
      <h2>Click on Below links to open particular app</h2>
      <div>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => handleLogin()}
      >
        Create New Tenant
      </span>
      <br />
      <br />
      <span
        style={{ cursor: "pointer" }}
        onClick={() => viewTenants()}
      >
        View Tenant Details
      </span>
      </div>
      <div>
     {!!tenantDetails.length && 
      <>
      <h2>Tenant List</h2><ul>
          {tenantDetails.map((tenant, index) => (
            <li key={index}>
              <strong>Email:</strong> {tenant.userName}
            </li>
          ))}
        </ul>
        </>
        }
      </div>
    </div>
  );
};

export default Home;

